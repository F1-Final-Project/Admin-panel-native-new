import {gql} from 'apollo-boost';

export const MENU_LIST_QUERY = gql`
    query MenuDetailsList($id: ID!){
        category(id: $id){
            _id,
            title,
            icon,
            description
        }
        dishAll{
            _id,
            title,
            description,
            category{
                _id
            },
            ingredients {
              title,
              _id,
              restInStock,
              description,
              price  
            },
            additionalIngredients{
                title
                _id,
                restInStock,
                description,
                price  
            },
            img,
            price,
            weight,
        }
    }
`;
