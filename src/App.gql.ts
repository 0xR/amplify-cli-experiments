import gql from 'graphql-tag';

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

const productListFragment = gql`
fragment ProductListData on Product {
  id
  title
  stock
  image {
    region
    bucket
    key
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
      ...ProductListData
    }
  }
}

${productListFragment}
`;

export const updateProduct = gql`
mutation UpdateProduct ($updateProductInput: UpdateProductInput!){
  updateProduct(input: $updateProductInput) {
      ...ProductListData
  }
}

${productListFragment}
`;
