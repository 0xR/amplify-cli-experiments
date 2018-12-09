import gql from "graphql-tag";

export const createProduct = gql`mutation CreateProduct($input: CreateProductInput!) {
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
