import { gql } from "apollo-boost"

export const orderGraphql = {
  getListByPage: gql`
      query ($data: AllOrderListInput) {
          all_order_list(allOrderListInput: $data) {
              id
              name
              number
              create_time
              user_id
              state
              subtotal
              finish_time
              user {
                  id
                  name
                  phone
                  email
              }
              product {
                  name
                  number
                  brand
                  id
                  is_hot
                  stock
                  price_in
                  price_out
                  price_market
                  weight
              }
              address {
                  city
                  province
                  zip
              }
          }
          all_order_list_total(allOrderListInput: $data)
      }
  `
}
