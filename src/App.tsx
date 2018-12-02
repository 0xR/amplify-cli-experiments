import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth, Cache } from 'aws-amplify';

import aws_exports from './aws-exports';
import { ApolloProvider, Query } from 'react-apollo';
import { appsyncClient } from './appsyncClient';
import {
  ListProductsQuery,
  OnStockSubscription,
  UpdateStockMutation,
  UpdateStockMutationVariables
} from './API';
import Async from 'react-promise';
import { notEmpty } from './ts-utils';
import { listProductsQuery, stockSubscription, updateStock } from './App.gql';
import { Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Mutation from 'react-apollo/Mutation';

const history = createBrowserHistory();

(Async as any).defaultPending = () => 'Loading...';

Amplify.configure(aws_exports);

class ListProducts extends Query<ListProductsQuery, {}> {}
class UpdateStock extends Mutation<
  UpdateStockMutation,
  UpdateStockMutationVariables
> {}

type NotEmptyArray<T> = T extends Array<infer T2>
  ? Array<NonNullable<T2>>
  : never;

interface ProductListProps {
  products: NotEmptyArray<
    NonNullable<ListProductsQuery['listProducts']>['items']
  >;

  subscriptionEffect: () => () => void;
}

const LoginPage2 = () => <Redirect to="/products" />;

const LoginPage1 = withAuthenticator(LoginPage2);

const LoginPage = () => (
  <Async promise={Auth.signOut()} then={() => <LoginPage1 />} />
);

function useIsEditor() {
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    Auth.currentSession().then(session => {
      const groups =
        session.getAccessToken().decodePayload()['cognito:groups'] || [];
      const newIsEditor = groups.includes('editor');
      if (newIsEditor !== isEditor) {
        setIsEditor(newIsEditor);
      }
    });
  });

  return isEditor;
}

const ProductList = ({ products, subscriptionEffect }: ProductListProps) => {
  useEffect(subscriptionEffect);
  const isEditor = useIsEditor();
  return (
    <UpdateStock mutation={updateStock}>
      {updateStock => {
        return (
          <ul>
            {products.map(({ title, id, stock }) => (
              <li key={id}>
                {title} ({stock} left){' '}
                {isEditor && (
                  <>
                  <button
                    onClick={() =>
                      updateStock({ variables: { id, stock: stock + 1 } })
                    }
                  >
                    +
                  </button>
                  <button
                  onClick={() =>
                  updateStock({ variables: { id, stock: stock - 1 } })
                }
                  >
                  -
                  </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        );
      }}
    </UpdateStock>
  );
};

class ProductListPage extends Component {
  render() {
    return (
      <Async
        promise={Auth.currentUserPoolUser().catch(() =>
          Auth.signIn('guest', 'Welcom1!')
        )}
        then={({ username, ...userInfo }) => {
          console.log({
            userInfo
          });
          return (
            <>
              <p>
                Signed in as {username} <Link to="/login">change user</Link>
              </p>
              <ApolloProvider client={appsyncClient}>
                <ListProducts query={listProductsQuery}>
                  {({ data, loading, error, subscribeToMore }) => {
                    if (error) {
                      return `Error: ${error}`;
                    }
                    if (loading) {
                      return 'Loading data...';
                    }
                    if (data && data.listProducts && data.listProducts.items) {
                      return (
                        <ProductList
                          subscriptionEffect={() =>
                            subscribeToMore({
                              document: stockSubscription,
                              updateQuery: (prev, { subscriptionData }) => {
                                const subscriptionREsult = (subscriptionData.data as any) as OnStockSubscription | null;
                                if (
                                  !prev.listProducts ||
                                  !subscriptionREsult ||
                                  !subscriptionREsult.onUpdateProduct
                                ) {
                                  return prev;
                                }
                                const newStockId =
                                  subscriptionREsult.onUpdateProduct.id;
                                const {
                                  listProducts,
                                  listProducts: { items }
                                } = prev;
                                if (!items) {
                                  return prev;
                                }
                                return {
                                  ...prev,
                                  listProducts: {
                                    ...listProducts,
                                    items: items.map(product => {
                                      if (!product) {
                                        return product;
                                      }
                                      return {
                                        ...product,
                                        ...(product.id === newStockId &&
                                          subscriptionREsult.onUpdateProduct)
                                      };
                                    })
                                  }
                                };
                              }
                            })
                          }
                          products={data.listProducts.items.filter(notEmpty)}
                        />
                      );
                    }
                  }}
                </ListProducts>
              </ApolloProvider>
            </>
          );
        }}
      />
    );
  }
}

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/products">
        <ProductListPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route>
        <Redirect to="/products" />
      </Route>
    </Switch>
  </Router>
);

export default App;
