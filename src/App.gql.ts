import gql from "graphql-tag";

export const listProductsQuery = gql`
    query ListProducts {
        listProducts {
            items {
                id
                title
                stock
            }
        }
    }
`;

export const stockSubscription = gql`
    subscription OnStock {
        onUpdateProduct {
            id
            stock
        }
    }
`;

