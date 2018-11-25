// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateCategory = `subscription OnCreateCategory {
  onCreateCategory {
    id
    name
    products {
      items {
        id
        title
        description
      }
      nextToken
    }
  }
}
`;
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
    id
    name
    products {
      items {
        id
        title
        description
      }
      nextToken
    }
  }
}
`;
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
    id
    name
    products {
      items {
        id
        title
        description
      }
      nextToken
    }
  }
}
`;
export const onCreateProduct = `subscription OnCreateProduct {
  onCreateProduct {
    id
    title
    description
    category {
      id
      name
    }
  }
}
`;
export const onUpdateProduct = `subscription OnUpdateProduct {
  onUpdateProduct {
    id
    title
    description
    category {
      id
      name
    }
  }
}
`;
export const onDeleteProduct = `subscription OnDeleteProduct {
  onDeleteProduct {
    id
    title
    description
    category {
      id
      name
    }
  }
}
`;
