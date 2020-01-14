import {gql} from 'apollo-boost';

export const GET_ALL_ORDER = gql`{
  orderAll {
  id,
  onKitchen,
  completed,
  table,
  created_at,
  updated_at,
  }
}
  `;

export const ORDER_BY_ID = gql`
    query Order($id: ID!){
        order(id: $id){
            id,
            orderPrice,
            onKitchen,
            completed,
            table,
            created_at,
            updated_at,
            staff{
            id,
            lastName
            },
            orderItems{
            title,
            description,
            price,
            weight,
            ingredients{
            title,
            id,
            price,
            restInStock
            },
            additionalIngredients{
            title,
            id,
            price,
            restInStock
            },
            }
            newOrderItems{
            title,
            description,
            price,
            weight,
            ingredients{
            title,
            id,
            price,
            restInStock
            },
            additionalIngredients{
            title,
            id,
            price,
            restInStock
            },
            }
        }
    }
`;

export const ADD_ORDER = gql`
    mutation AddOrder($staff: String!, $table: Int!){
    addOrder(staff: $staff, table: $table){
            id,
            onKitchen,
            completed,
            table,
         }   
    }
`;

export const DELETE_ORDER = gql`
 mutation DeleteOrder($id: ID!){
    deleteOrder(id: $id){
            id
         }   
    }
  `;

export const UPDATE_ORDER = gql`
    mutation UpdateOrder($id: ID!, $staff: String!, $table: Int!, $orderItems: [OrderItemInput]!, $newOrderItems: [OrderItemInput]!, $orderPrice: Float!, $onKitchen: Boolean!, $completed: Boolean!, $created_at: String! ){
    updateOrder(id: $id, staff: $staff, table: $table, orderItems: $orderItems, newOrderItems: $newOrderItems, orderPrice: $orderPrice, onKitchen: $onKitchen, completed: $completed, created_at: $created_at){
            id,
            onKitchen,
            completed,
            table,
         }   
    }
`;
