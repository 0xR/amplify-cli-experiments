import React, { Component } from "react";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import Amplify from "aws-amplify";

import aws_exports from "./aws-exports";
import { ApolloProvider, Query } from "react-apollo";
import { appsyncClient } from "./appsyncClient";
import { ListProductsQuery, ListProductsQueryVariables } from "./API";
import { listProducts } from "./graphql/queries";
import gql from "graphql-tag";
import { notEmpty } from "./ts-utils";

Amplify.configure(aws_exports);

class ProductListQuery extends Query<
  ListProductsQuery,
  ListProductsQueryVariables
> {}



class App extends Component {
  render() {
    return (
      <ApolloProvider client={appsyncClient}>
        <ProductListQuery query={gql(listProducts)}>
          {({ data, loading, error }) => {
            if (loading) {
              return "Loading...";
            }
            if (data && data.listProducts && data.listProducts.items) {
              return (
                <ul>
                  {data.listProducts.items.filter(notEmpty).map(({ title, id }) => (
                    <li key={id}>{title}</li>
                  ))}
                </ul>
              );
            }
          }}
        </ProductListQuery>
      </ApolloProvider>
    );
  }
}

export default withAuthenticator(App);
