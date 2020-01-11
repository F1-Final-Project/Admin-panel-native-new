import gql from "graphql-tag";

export const GET_INGREDIENT_BY_ID = gql`
                    query getIngredientById($id: ID!){
                      ingredient(id: $id){
                        id,
                        title,
                        restInStock,
                        description,
                        price
                        }
                    }
                `;
