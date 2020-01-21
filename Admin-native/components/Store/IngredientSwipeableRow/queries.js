import gql from "graphql-tag";

export const GET_INGREDIENT_BY_ID = gql`
                    query getIngredientById($_id: ID!){
                      ingredient(id: $_id){
                        _id,
                        title,
                        restInStock,
                        description,
                        price
                        }
                    }
                `;
