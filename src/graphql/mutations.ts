// tslint:disable
// this is an auto generated file. This will be overwritten

export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
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
export const createCategory = `mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
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
export const updateCategory = `mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
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
export const deleteCategory = `mutation DeleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input) {
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
export const createCategoryRelation = `mutation CreateCategoryRelation($input: CreateCategoryRelationInput!) {
  createCategoryRelation(input: $input) {
    id
    parent {
      id
      name
    }
    child {
      id
      name
    }
  }
}
`;
export const updateCategoryRelation = `mutation UpdateCategoryRelation($input: UpdateCategoryRelationInput!) {
  updateCategoryRelation(input: $input) {
    id
    parent {
      id
      name
    }
    child {
      id
      name
    }
  }
}
`;
export const deleteCategoryRelation = `mutation DeleteCategoryRelation($input: DeleteCategoryRelationInput!) {
  deleteCategoryRelation(input: $input) {
    id
    parent {
      id
      name
    }
    child {
      id
      name
    }
  }
}
`;
