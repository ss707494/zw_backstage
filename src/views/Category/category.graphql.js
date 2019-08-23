import { gql } from "apollo-boost";

export const save_category = gql`
    mutation ($data: CategoryInput){
        save_category(Category: $data) {
            flag
            msg
            category {
                id
                name
            }
        }
    }
`
