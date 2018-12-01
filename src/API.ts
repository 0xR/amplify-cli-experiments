/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateProductInput = {
  id?: string | null,
  title: string,
  price: number,
  description: string,
  attributes: Array< AttributeInput >,
};

export type AttributeInput = {
  key: string,
  value: string,
};

export type UpdateProductInput = {
  id: string,
  title?: string | null,
  price?: number | null,
  description?: string | null,
  attributes?: Array< AttributeInput > | null,
};

export type DeleteProductInput = {
  id?: string | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDFilterInput | null,
  title?: ModelStringFilterInput | null,
  price?: ModelIntFilterInput | null,
  description?: ModelStringFilterInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type SearchableProductFilterInput = {
  id?: SearchableIDFilterInput | null,
  title?: SearchableStringFilterInput | null,
  price?: SearchableIntFilterInput | null,
  description?: SearchableStringFilterInput | null,
  and?: Array< SearchableProductFilterInput | null > | null,
  or?: Array< SearchableProductFilterInput | null > | null,
  not?: SearchableProductFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableProductSortInput = {
  field?: SearchableProductSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableProductSortableFields {
  id = "id",
  title = "title",
  price = "price",
  description = "description",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


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
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
};

export type UpdateProductMutation = {
  updateProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    price: number,
    description: string,
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
};

export type DeleteProductMutation = {
  deleteProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    price: number,
    description: string,
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    price: number,
    description: string,
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      title: string,
      price: number,
      description: string,
      attributes:  Array< {
        __typename: "Attribute",
        key: string,
        value: string,
      } >,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type SearchProductsQueryVariables = {
  filter?: SearchableProductFilterInput | null,
  sort?: SearchableProductSortInput | null,
  limit?: number | null,
  nextToken?: number | null,
};

export type SearchProductsQuery = {
  searchProducts:  {
    __typename: "SearchableProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      title: string,
      price: number,
      description: string,
      attributes:  Array< {
        __typename: "Attribute",
        key: string,
        value: string,
      } >,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    price: number,
    description: string,
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
  } | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    price: number,
    description: string,
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
  } | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct:  {
    __typename: "Product",
    id: string,
    title: string,
    price: number,
    description: string,
    attributes:  Array< {
      __typename: "Attribute",
      key: string,
      value: string,
    } >,
  } | null,
};
