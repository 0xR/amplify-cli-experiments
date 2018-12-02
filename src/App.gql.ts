import gql from 'graphql-tag';

export const listProductsQuery = gql`
  query ListProducts {
    listProducts {
      items {
        id
        title
        stock
      }
    }
  }
`;

export const stockSubscription = gql`
  subscription OnStock {
    onUpdateProduct {
      id
      stock
    }
  }
`;

export const updateStock = gql`
  mutation UpdateStock($id: ID!, $stock: Int!) {
    updateProduct(input: { id: $id, stock: $stock }) {
      id
      stock
    }
  }
`;

export const searchProductPrefix = gql`
  query SearchProductPrefix($prefix: String!) {
    searchProducts(
      filter: { title: { matchPhrasePrefix: $prefix }, not: { stock: { lte: 0 } } }
      sort: { field: price, direction: asc }
    ) {
      items {
        id
        title
        stock
      }
    }
  }
`;
