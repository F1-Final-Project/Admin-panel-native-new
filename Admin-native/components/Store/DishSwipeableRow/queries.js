import gql from "graphql-tag";

export const GET_DISH_BY_ID = gql`
                    query getDishById($id: ID!){
                      dish(id: $id){
                        title
                      description
                      img
                      category {
                        id
                        title
                      }
                      ingredients {
                        id
                        title
                      }
                      price
                      weight
                      }
                    }
                `;
