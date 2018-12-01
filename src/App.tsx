import React, { Component } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth } from "aws-amplify";

import aws_exports from "./aws-exports";
import { ApolloProvider, Query } from "react-apollo";
import { appsyncClient } from "./appsyncClient";
import { ListProductsQuery, ListProductsQueryVariables } from "./API";
import { listProducts } from "./graphql/queries";
import gql from "graphql-tag";
import Async from "react-promise";
import { notEmpty } from "./ts-utils";

(Async as any).defaultPending = () => "Loading...";

Amplify.configure(aws_exports);

class ProductListQuery extends Query<
  ListProductsQuery,
  ListProductsQueryVariables
> {}

class App extends Component {
  render() {
    return (
      <Async
        promise={Auth.currentUserPoolUser().catch(() =>
          Auth.signIn("guest", "Welcom1!")
        )}
        then={({ username }) => {
          return (
            <>
              <p>Signed in as {username}</p>
            <ApolloProvider client={appsyncClient}>
              <ProductListQuery query={gql(listProducts)}>
                {({ data, loading, error }) => {
                  if (error) {
                    return `Error: ${error}`;
                  }
                  if (loading) {
                    return "Loading data...";
                  }
                  if (data && data.listProducts && data.listProducts.items) {
                    return (
                      <ul>
                        {data.listProducts.items
                          .filter(notEmpty)
                          .map(({ title, id }) => (
                            <li key={id}>{title}</li>
                          ))}
                      </ul>
                    );
                  }
                }}
              </ProductListQuery>
            </ApolloProvider>
            </>
          );
        }}
      />
    );
  }
}

export default App;
