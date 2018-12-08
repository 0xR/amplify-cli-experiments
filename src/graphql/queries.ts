// tslint:disable
// this is an auto generated file. This will be overwritten

export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
    price
    description
    stock
    attributes {
      key
      value
    }
    image {
      bucket
      key
      region
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
      stock
      attributes {
        key
        value
      }
      image {
        bucket
        key
        region
      }
    }
    nextToken
  }
}
`;
export const getCategory = `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    id
    name
    childCategories {
      items {
        id
      }
      nextToken
    }
    parentCategories {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listCategorys = `query ListCategorys(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      childCategories {
        items {
          id
        }
        nextToken
      }
      parentCategories {
        items {
          id
        }
        nextToken
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
      stock
      attributes {
        key
        value
      }
      image {
        bucket
        key
        region
      }
    }
    nextToken
  }
}
`;
