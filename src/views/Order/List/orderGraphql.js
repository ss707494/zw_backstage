import { gql } from "apollo-boost";

export const orderGraphql = {
  getListByPage: gql`
      query ($data: AllOrderListInput) {
          all_order_list(allOrderListInput: $data) {
              id
              name
              number
              create_time
              product {
                  name
                  number
              }
          }
          all_order_list_total(allOrderListInput: $data)
      }
  `
}
