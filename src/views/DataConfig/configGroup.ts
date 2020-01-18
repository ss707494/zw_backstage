import {gql} from "apollo-boost";

export const getDataConfigGraphql = gql`
    query($data: DataConfigInput) {
        data_config(dataConfigInput: $data) {
            id
            type
            value
        }
    }
`
