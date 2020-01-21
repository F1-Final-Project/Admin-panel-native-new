import {gql} from "apollo-boost";

export const GET_ALL_DISH = gql`{
  dishAll{
    _id,
    title,
    description,
    category {
      _id,
      title
    }
  },
  ingredientAll{
    _id,
    title,
  },
  categoryAll{
  _id,
  title,
  }
}
  `;

export const UPDATE_DISHES = gql`
mutation updateDish(
  $_id: ID!
  $title: String!,
  $description: String!,
  $img: String!,
  $category: ID!,
  $ingredients: [ID]!,
  $additionalIngredients: [ID]!,
  $price: Float!,
  $weight: Float!
) {

updateDish(
  id: $_id
  title: $title,
  description: $description,
  img: $img,
  category: $category,
  ingredients: $ingredients,
  additionalIngredients: $additionalIngredients,
  price: $price,
  weight: $weight) {

  _id,
  title,
  img,
  price,
  weight,
  description,
  category {
  _id,
  title },
  },
}`;

export const DELETE_DISH = gql`
mutation deleteDish($_id: ID){
deleteDish(id: $_id) {
_id
}
}`;
