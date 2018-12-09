/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UpdateProductInput = {
  id: string,
  title?: string | null,
  price?: number | null,
  description?: string | null,
  stock?: number | null,
  attributes?: Array< AttributeInput > | null,
  image?: S3ObjectInput | null,
};

export type AttributeInput = {
  key: string,
  value: string,
};

export type S3ObjectInput = {
  bucket: string,
  key: string,
  region: string,
};

export type CreateProductInput = {
  id?: string | null,
  title: string,
  price: number,
  description: string,
  stock: number,
  attributes: Array< AttributeInput >,
  image?: S3ObjectInput | null,
};

export type OnStockSubscription = {
  onUpdateProduct:  {
    __typename: "Product",
    id: string,
    stock: number,
  } | null,
};

export type UpdateStockMutationVariables = {
  id: string,
  stock: number,
};

export type UpdateStockMutation = {
  updateProduct:  {
    __typename: "Product",
    id: string,
    stock: number,
  } | null,
};

export type SearchProductPrefixQueryVariables = {
  prefix: string,
};

export type SearchProductPrefixQuery = {
  searchProducts:  {
    __typename: "SearchableProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      title: string,
      stock: number,
      image:  {
        __typename: "S3Object",
        region: string,
        bucket: string,
        key: string,
      } | null,
    } | null > | null,
  } | null,
};

export type UpdateProductMutationVariables = {
  updateProductInput: UpdateProductInput,
};

export type UpdateProductMutation = {
  updateProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    stock: number,
    image:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    } | null,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
};

export type CreateProductMutation = {
  createProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    price: number,
    description: string,
    stock: number,
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
    image:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
    } | null,
  } | null,
};

export type ProductListDataFragment = {
  __typename: "Product",
  id: string,
  title: string,
  stock: number,
  image:  {
    __typename: string,
    region: string,
    bucket: string,
    key: string,
  } | null,
};
