import {gql} from 'apollo-boost';export const MENU_LIST_QUERY = gql`    query MenuDetailsList($id: ID!){        category(id: $id){            id,            title,            icon,            description        }        dishAll{            id,            title,            description,            category{                id            },            ingredients {              title,              id,              restInStock,              description,              price              },            additionalIngredients{                title                id,                restInStock,                description,                price              },            img,            price,            weight,        }    }`;