/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type ListProductsQuery = {
  listProducts:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      title: string,
      stock: number,
    } | null > | null,
  } | null,
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
