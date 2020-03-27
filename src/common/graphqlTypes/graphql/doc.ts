import {gql} from "apollo-boost"

export const getUserListDoc = gql`
    query refactored643($data: UserListInput!) {
        userList(userListInput: $data) {
            list {
                orderCoinNextMonth
                orderCoinCurrentMonth
                orderAmountCurrentYear
                ...userInfo
                ...UserFields
                ...orderInfo
            }
            total
        }
    }
    fragment orderInfo on User{
        orderInfo{
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
            pickUpTime
            pickUpType
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
            userLevel
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
        pickUpTime
        pickUpType
        deductCoin
        generateCoin
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
        userInfo {
            createTime
            email
            id
            isDelete
            name
            phone
            updateTime
            userId
            userLevel
        }
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
                    dealPrice
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
                    combineAddress
                }
                userPayCard {
                    id
                    name
                    createTime
                    updateTime
                    isDelete
                    userId
                    number
                    code
                    userName
                    addressDetail
                    zipCode
                    city
                    contact
                    isDefault
                }
            }
            total
        }
        getDataConfig (dataConfigInput: {
            type: "OrderState"
        }) {
            id
            name
            type
            value
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

export const saveDataConfig = gql`
    mutation ($data: DataConfigInput) {
        saveDataConfig (dataConfigInput: $data) {
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

export const saveUserListDoc = gql`
    mutation($data: [UserItemInput]) {
        saveUserList(userItemInput: $data) {
            id
            name
        }
    }
`

export const saveOrderListDoc = gql`
    mutation($data: [OrderInfoItemInput]){
        saveOrderList(orderInfoItemInput: $data){
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
            pickUpTime
            pickUpType
        }
    }
`

export const saveDictTypeFirstDco = gql`
  mutation($data: [DictTypeFirstItemInput]) {
      saveDictTypeFirst(dictTypeFirstItemInput: $data) {
          id
          name
          createTime
          updateTime
          isDelete
          parentCode
          code
          sort
          remark
      }
  }
`