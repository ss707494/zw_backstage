import {gql} from "apollo-boost"

export const getUserListDoc = gql`
    query refactored643($data: UserListInput!) {
        userList(userListInput: $data) {
            list {
                ...userInfo
                ...UserFields
            }
            total
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

export const getOrderListDoc = gql`
    fragment OrderInfoFields on OrderInfo {
        id
        name
        createTime
        updateTime
        isDelete
        number
        state
        actuallyPaid
        addressId
        paymentMethodCardId
        subtotal
        couponDiscount
        vipDiscount
        transportationCosts
        saleTax
        orderId
        discountProductTotal
        finishTime
    }
    fragment ProductFields on Product {
        id
        name
        createTime
        updateTime
        isDelete
        categoryId
        remark
        isHot
        isNew
        isEnable
        sort
        stock
        unit
        weight
        priceIn
        priceOut
        priceMarket
        brand
        number
        isGroup
        groupPrecision
        groupAmount
        groupRemark
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

    query ($data: OrderInput) {
        orderList (orderInput: $data) {
            list {
                user {
                    ...UserFields
                }
                rOrderProduct {
                    id
                    name
                    createTime
                    updateTime
                    isDelete
                    orderId
                    productId
                    count
                    product {
                        ...ProductFields
                    }
                }
                ...OrderInfoFields
                userAddress {
                    id
                    name
                    createTime
                    updateTime
                    isDelete
                    zip
                    province
                    city
                    district
                    address
                    isDefault
                    userId
                    contactInformation
                    contactUserName
                }
            }
            total
        }
    }
`

export const getDataConfigDoc = gql`
  query ($data: DataConfigInput) {
      getDataConfig (dataConfigInput: $data) {
          id
          name
          createTime
          updateTime
          isDelete
          type
          value
          remark
      }
  }
`

export const getDictListDoc = gql`
    query ($data: DictInput){
        getDictList(dictInput: $data){
            id
            name
            createTime
            updateTime
            isDelete
            isDisable
            dictTypeCode
            code
            sort
            remark
        }
    }
`
