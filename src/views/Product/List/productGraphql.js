import { gql } from "apollo-boost";

export const productGraphql = {
  getList: gql`
    query ($data: ProductInput) {
        product_list(ListInput: $data) {
            id name number is_hot is_new stock price_in
            price_market price_out weight unit
            category_id
            imgs { id url number }
        }
    }
  `,
}
export const getCategoryOrigin = gql`
    query ($id: String) {
        category_origin(id: $id) {
            id c2_id c2_name c3_id c3_name
        }
    }
`

