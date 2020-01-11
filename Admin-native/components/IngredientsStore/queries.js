import {gql} from "apollo-boost";

export const GET_ALL_DISH = gql`{
  ingredientAll{
    id,
    title,
    restInStock,
    description,
    price
  }
}
  `;

export const UPDATE_INGREDIENT = gql`
mutation updateIngredient(
  $id: ID!
  $title: String!,
  $restInStock: Int!,
  $description: String!,
  $price: Float!,
) {
updateIngredient(
  id: $id,
  title: $title,
  restInStock: $restInStock,
  description: $description,
  price: $price,
 ) {
    id,
    title,
    restInStock,
    description,
    price
  }
}`;

export const DELETE_INGREDIENT = gql`
mutation deleteIngredient($id: ID){
deleteIngredient(id: $id) {
id
}
}`;
