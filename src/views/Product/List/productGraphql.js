import { gql } from "apollo-boost";

export const productGraphql = {
  getList: gql`
    query ($data: ProductInput) {
        product_list(ListInput: $data) {
            id name number is_hot is_new stock price_in is_enable
            price_market price_out weight unit brand category_id
            c1_id c1_number c2_id c2_name c3_id c3_name
            c2_number c3_number is_group group_amount group_precision
            group_remark shelvesTypes packingUnit groupAmountUnit
            imgs { id url number }
        }
        product_total(ListInput: $data)
    }
  `,
}

export const getCategoryOrigin = gql`
    query ($id: String) {
        category_origin(id: $id) {
            id number c2_id c2_name c3_id c3_name
            c2_number c3_number
        }
    }
`

export const save_product = gql`
    mutation ($data: ProductInput) {
        save_product(ProductInput: $data) {
            msg
            flag
            product {
                id
            }
        }
    }
`


