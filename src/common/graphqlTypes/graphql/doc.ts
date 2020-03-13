import {gql} from "apollo-boost"

export const getUserListDoc = gql`
    query refactored643($data: UserListInput!) {
        userList(userListInput: $data) {
            ...userInfo
            ...UserFields
        }
    }
    fragment UserFields on User {
        id
        name
        createTime
        updateTime
        isDelete
        password
        type
    }
    fragment userInfo on User{
        userInfo{
            id
            name
            createTime
            updateTime
            isDelete
            userId
            phone
            email
        }
    }
`
