import { gql } from "apollo-boost";

export const addProductGraphql = {
  save_product_supplement: gql`
      mutation($data: ProductSupplementInput) {
          save_product_supplement (productSupplementInput: $data) {
              msg
              flag
          }
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

export const productSupplementListGraphql = gql`
    query ($data: ProductSupplementListInput) {
        product_supplement_list_total(productSupplementListInput: $data)
        product_supplement_list(productSupplementListInput: $data) {
            id
            name
            amount
            number
            user_id
            state
            create_time
            addItemList {
                name
                count
                amount
                supplier
                product {
                    number
                    is_group
                    name
                    stock
                    price_in
                    price_out
                    price_market
                    weight
                }
            }
        }
    }
`

