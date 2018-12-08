// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateProduct = `subscription OnCreateProduct {
  onCreateProduct {
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
export const onUpdateProduct = `subscription OnUpdateProduct {
  onUpdateProduct {
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
export const onDeleteProduct = `subscription OnDeleteProduct {
  onDeleteProduct {
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
export const onCreateCategory = `subscription OnCreateCategory {
  onCreateCategory {
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
export const onUpdateCategory = `subscription OnUpdateCategory {
  onUpdateCategory {
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
export const onDeleteCategory = `subscription OnDeleteCategory {
  onDeleteCategory {
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
export const onCreateCategoryRelation = `subscription OnCreateCategoryRelation {
  onCreateCategoryRelation {
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
export const onUpdateCategoryRelation = `subscription OnUpdateCategoryRelation {
  onUpdateCategoryRelation {
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
export const onDeleteCategoryRelation = `subscription OnDeleteCategoryRelation {
  onDeleteCategoryRelation {
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
