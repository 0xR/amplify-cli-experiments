import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { withAuthenticator, PhotoPicker, S3Image } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';

import aws_exports from './aws-exports';
import { ApolloProvider, Query } from 'react-apollo';
import { appsyncClient } from './appsyncClient';
import {
  OnStockSubscription,
  S3ObjectInput,
  SearchProductPrefixQuery,
  SearchProductPrefixQueryVariables,
  UpdateProductMutation,
  UpdateProductMutationVariables,
  UpdateStockMutation,
  UpdateStockMutationVariables
} from './API';
import Async from 'react-promise';
import { notEmpty } from './ts-utils';
import {
  searchProductPrefix,
  stockSubscription,
  updateProduct,
} from './App.gql';
import {
  Router,
  Switch,
  Route,
  Redirect,
  Link,
  RouteComponentProps
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Mutation from 'react-apollo/Mutation';
import {MockData} from "./MockData";

const history = createBrowserHistory();

(Async as any).defaultPending = () => 'Loading...';

Amplify.configure(aws_exports);

const {
  aws_user_files_s3_bucket: s3Bucket,
  aws_user_files_s3_bucket_region: s3Region
} = aws_exports;

class SearchProductPrefix extends Query<
  SearchProductPrefixQuery,
  SearchProductPrefixQueryVariables
> {}

class UpdateStock extends Mutation<
  UpdateStockMutation,
  UpdateStockMutationVariables
> {}

class UpdateProduct extends Mutation<
  UpdateProductMutation,
  UpdateProductMutationVariables
> {}

type NotEmptyArray<T> = T extends Array<infer T2>
  ? Array<NonNullable<T2>>
  : never;

interface ProductListProps {
  products: NotEmptyArray<
    NonNullable<SearchProductPrefixQuery['searchProducts']>['items']
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
    <UpdateProduct mutation={updateProduct}>
      {updateProduct => {
        return (
          <ul>
            {products.map(({ title, id, stock, image }) => (
              <li key={id}>
                {title} ({stock} left){' '}
                {isEditor && (
                  <>
                    <button
                      onClick={() =>
                        updateProduct({ variables: { updateProductInput: { id, stock: stock + 1  }} })
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        updateProduct({ variables: { updateProductInput: { id, stock: stock - 1  }} })
                      }
                    >
                      -
                    </button>
                    <br/>
                    {image && <><button
                      onClick={() =>
                        updateProduct({ variables: { updateProductInput: { id, image: null  }} })
                      }
                    >
                      remove image
                    </button>{' '}</>}
                    <Link to={`/upload-image/${id}`}>edit image</Link>
                  </>
                )}
                {image && (
                  <S3Image imgKey={image.key.replace(/^public\//, '')} />
                )}
              </li>
            ))}
          </ul>
        );
      }}
    </UpdateProduct>
  );
};

const ProductListPage1 = ({ username }: { username: string }) => {
  const [prefix, setPrefix] = useState('name');
  return (
    <>
      <p>
        Signed in as {username} <Link to="/login">change user</Link>
      </p>
      <form
        onSubmit={e => {
          e.preventDefault();
          const newPrefix =
            e.currentTarget.prefixInput && e.currentTarget.prefixInput.value;
          if (prefix !== newPrefix) {
            setPrefix(newPrefix);
          }
        }}
      >
        <p>
          <input name="prefixInput" />
        </p>
      </form>

      {prefix && (
        <SearchProductPrefix query={searchProductPrefix} variables={{ prefix }}>
          {({ data, loading, error, subscribeToMore }) => {
            if (error) {
              return `Error: ${error}`;
            }
            if (loading) {
              return 'Loading data...';
            }
            if (data && data.searchProducts && data.searchProducts.items) {
              if (!data.searchProducts.items.length) {
                return 'No results';
              }
              return (
                <ProductList
                  subscriptionEffect={() =>
                    subscribeToMore({
                      document: stockSubscription,
                      updateQuery: (prev, { subscriptionData }) => {
                        const subscriptionREsult = (subscriptionData.data as any) as OnStockSubscription | null;
                        if (
                          !prev.searchProducts ||
                          !subscriptionREsult ||
                          !subscriptionREsult.onUpdateProduct
                        ) {
                          return prev;
                        }
                        const newStockId =
                          subscriptionREsult.onUpdateProduct.id;
                        const {
                          searchProducts,
                          searchProducts: { items }
                        } = prev;
                        if (!items) {
                          return prev;
                        }
                        return {
                          ...prev,
                          searchProducts: {
                            ...searchProducts,
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
                  products={data.searchProducts.items.filter(notEmpty)}
                />
              );
            }
          }}
        </SearchProductPrefix>
      )}
    </>
  );
};

class ProductListPage extends Component {
  render() {
    return (
      <Async
        promise={Auth.currentUserPoolUser().catch(() =>
          Auth.signIn('guest', 'Welcom1!')
        )}
        then={({ username }) => {
          return <ProductListPage1 {...{ username }} />;
        }}
      />
    );
  }
}

const UploadImagePage = ({
  match: {
    params: { productId }
  }
}: RouteComponentProps<{ productId: string }>) => {
  const [file, setFile] = useState<null | File>(null);

  return (
    <UpdateProduct mutation={updateProduct}>
      {(updateProduct, { loading, data }) => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (file) {
                const match = /\.(\w+)$/.exec(file.name);
                const extension = match ? match[1] : 'unknown';

                return updateProduct({
                  variables: {
                    updateProductInput: {
                      id: productId,
                      image: {
                        bucket: s3Bucket,
                        region: s3Region,
                        key: `public/productimage-${productId}.${extension}`,
                        mimeType: file.type,
                        localUri: file
                      } as S3ObjectInput
                    }
                  }
                });
              }
            }}
          >
            <PhotoPicker
              preview
              name="imageInput"
              onPick={({ file }: { file: File }) => setFile(file)}
            />
            {loading ? (
              'updating...'
            ) : (
              <button type="submit">update image</button>
            )}
            {data && data.updateProduct && data.updateProduct.id && (
              <Redirect to="/products" />
            )}
          </form>
        );
      }}
    </UpdateProduct>
  );
};

const App = () => (
  <ApolloProvider client={appsyncClient}>
    <Router history={history}>
      <Switch>
        <Route path="/products">
          <ProductListPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/mockdata">
          <MockData/>
        </Route>
        <Route path="/upload-image/:productId" component={UploadImagePage} />
        <Route>
          <Redirect to="/products" />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
