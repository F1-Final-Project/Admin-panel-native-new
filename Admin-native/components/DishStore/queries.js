import {gql} from "apollo-boost";

export const GET_ALL_DISH = gql`{
  dishAll{
    id,
    title,
    description,
    category {
      id,
      title
    }
  },
  ingredientAll{
    id,
    title,
  },
  categoryAll{
  id,
  title,
  }
}
  `;

export const UPDATE_DISHES = gql`
mutation updateDish(
  $id: ID!
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
  id: $id
  title: $title,
  description: $description,
  img: $img,
  category: $category,
  ingredients: $ingredients,
  additionalIngredients: $additionalIngredients,
  price: $price,
  weight: $weight) {

  id,
  title,
  img,
  price,
  weight,
  description,
  category {
  id,
  title },
  },
}`;

export const DELETE_DISH = gql`
mutation deleteDish($id: ID){
deleteDish(id: $id) {
id
}
}`;
