import gql from "graphql-tag";

export const GET_DISH_BY_ID = gql`
                    query getDishById($_id: ID!){
                      dish(id: $_id){
                        _id
                        title
                      description
                      img
                      category {
                        _id
                        title
                      }
                      ingredients {
                        _id
                        title
                      }
                      price
                      weight
                      }
                    }
                `;
