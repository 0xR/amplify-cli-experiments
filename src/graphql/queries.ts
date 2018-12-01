// tslint:disable
// this is an auto generated file. This will be overwritten

export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
    price
    description
    attributes {
      key
      value
    }
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      price
      description
      attributes {
        key
        value
      }
    }
    nextToken
  }
}
`;
export const searchProducts = `query SearchProducts(
  $filter: SearchableProductFilterInput
  $sort: SearchableProductSortInput
  $limit: Int
  $nextToken: Int
) {
  searchProducts(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      price
      description
      attributes {
        key
        value
      }
    }
    nextToken
  }
}
`;
