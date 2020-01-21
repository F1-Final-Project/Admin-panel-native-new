import {gql} from "apollo-boost";

export const GET_ALL_DISH = gql`{
  ingredientAll{
    _id,
    title,
    restInStock,
    description,
    price
  }
}
  `;

export const UPDATE_INGREDIENT = gql`
mutation updateIngredient(
  $_id: ID!
  $title: String!,
  $restInStock: Int!,
  $description: String!,
  $price: Float!,
) {
updateIngredient(
  id: $_id,
  title: $title,
  restInStock: $restInStock,
  description: $description,
  price: $price,
 ) {
    _id,
    title,
    restInStock,
    description,
    price
  }
}`;

export const DELETE_INGREDIENT = gql`
mutation deleteIngredient($_id: ID){
deleteIngredient(id: $_id) {
_id
}
}`;
