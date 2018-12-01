// tslint:disable
// this is an auto generated file. This will be overwritten

export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
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
