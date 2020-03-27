import {gql} from "apollo-boost";

export const promo_code_list = gql`
    query ($data: PromoCodeInput) {
        promo_code_list (PromoCodeInput: $data) {
            id
            name
            title
            code
            reuse_times
            create_time
            promo_code_type
            discount_type
            discount_amount
            discount_condition
            discount_condition_amount
            effective_date_start
            effective_date_end
            remark
            img_url
            product_category
            isDisable
            category_data {
                id
                name
                parent_data {
                    id
                    name
                    parent_data {
                        id
                        name
                    }
                }
            }
        }
    }
`

export const save_promo_code = gql`
    mutation($data: PromoCodeInput) {
        save_promo_code(promoCodeInput: $data) {
            flag
            msg
        }
    }
`
