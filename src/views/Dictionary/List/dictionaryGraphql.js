import { gql } from "apollo-boost";

export const getDictTypeListGraphql = gql`
    query ($data: DictionaryInput) {
        dict_type_list(dictionaryInput: $data) {
            id
            name
            code
            parent_code
            sort
        }
    }
`

export const getDictItemListGraphql = gql`
    query ($data: DictionaryInput) {
        dict_item_list(dictionaryInput: $data) {
            id
            name
            code
            parent_code
            dict_type_code
            sort
            is_disable
            is_delete
        }
    }
`

export const saveDictItemGraphql = gql`
    mutation($data: DictionaryInput) {
        save_dict_item (dictionaryInput: $data) {
            msg
            flag
            dictionary {
                id
            }
        }
    }
`

