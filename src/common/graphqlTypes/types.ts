export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
  JSON: any;
};

export type AuthBody = {
   __typename?: 'AuthBody';
  token?: Maybe<Scalars['String']>;
  refreshtoken?: Maybe<Scalars['String']>;
};

export type Category = {
   __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isEnable?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['String']>;
  fullParentId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  parentCategory?: Maybe<Category>;
  childCategories?: Maybe<Array<Maybe<Category>>>;
  categoryParent?: Maybe<Category>;
};

export type CategoryItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isEnable?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['String']>;
  fullParentId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  parentCategory?: Maybe<CategoryItemInput>;
  childCategories?: Maybe<Array<Maybe<CategoryItemInput>>>;
  categoryParent?: Maybe<CategoryItemInput>;
};

export type CategoryListInput = {
  category?: Maybe<CategoryItemInput>;
  pageInput?: Maybe<PageInput>;
  orderByInput?: Maybe<OrderByInput>;
};

export type CategoryPage = {
   __typename?: 'CategoryPage';
  total?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Maybe<Category>>>;
};

export type DataConfig = {
   __typename?: 'DataConfig';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  remark?: Maybe<Scalars['String']>;
};

export type DataConfigItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['JSON']>;
  remark?: Maybe<Scalars['String']>;
};

export type Dict = {
   __typename?: 'Dict';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isDisable?: Maybe<Scalars['Float']>;
  dictTypeCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dictTypeFirst?: Maybe<DictTypeFirst>;
};

export type DictInput = {
  dictTypeCode?: Maybe<Scalars['String']>;
  isDisable?: Maybe<Scalars['Float']>;
};

export type DictItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  isDisable?: Maybe<Scalars['Float']>;
  dictTypeCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dictTypeFirst?: Maybe<DictTypeFirstItemInput>;
};

export type DictTypeFirst = {
   __typename?: 'DictTypeFirst';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  parentCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dict?: Maybe<Dict>;
};

export type DictTypeFirstItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  parentCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  dict?: Maybe<DictItemInput>;
};


export type Mutation = {
   __typename?: 'Mutation';
  saveUserList?: Maybe<Array<Maybe<User>>>;
  registerUser?: Maybe<UserInRegister>;
  saveOrderList?: Maybe<Array<Maybe<OrderInfo>>>;
  saveDataConfig?: Maybe<DataConfig>;
  saveDictTypeFirst?: Maybe<Array<Maybe<DictTypeFirst>>>;
  saveCategory?: Maybe<Category>;
};


export type MutationSaveUserListArgs = {
  userItemInput?: Maybe<Array<Maybe<UserItemInput>>>;
};


export type MutationRegisterUserArgs = {
  data?: Maybe<UserItemInput>;
};


export type MutationSaveOrderListArgs = {
  orderInfoItemInput?: Maybe<Array<Maybe<OrderInfoItemInput>>>;
};


export type MutationSaveDataConfigArgs = {
  dataConfigInput?: Maybe<DataConfigItemInput>;
};


export type MutationSaveDictTypeFirstArgs = {
  dictTypeFirstItemInput?: Maybe<Array<Maybe<DictTypeFirstItemInput>>>;
};


export type MutationSaveCategoryArgs = {
  categoryItemInput?: Maybe<CategoryItemInput>;
};

export type OrderByAndPageInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  orderByObject?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
};

export type OrderByInput = {
  orderByObject?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
};

export type OrderInfo = {
   __typename?: 'OrderInfo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['Float']>;
  actuallyPaid?: Maybe<Scalars['Float']>;
  addressId?: Maybe<Scalars['String']>;
  paymentMethodCardId?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  couponDiscount?: Maybe<Scalars['Float']>;
  vipDiscount?: Maybe<Scalars['Float']>;
  transportationCosts?: Maybe<Scalars['Float']>;
  saleTax?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  discountProductTotal?: Maybe<Scalars['Float']>;
  finishTime?: Maybe<Scalars['Timestamp']>;
  rOrderUser?: Maybe<ROrderUser>;
  user?: Maybe<User>;
  rOrderProduct?: Maybe<Array<ROrderProduct>>;
  userAddress?: Maybe<UserAddress>;
  pickUpTime?: Maybe<Scalars['Timestamp']>;
  pickUpType?: Maybe<Scalars['String']>;
  generateCoin?: Maybe<Scalars['Float']>;
  deductCoin?: Maybe<Scalars['Float']>;
  userPayCard?: Maybe<UserPayCard>;
  selfAddressId?: Maybe<Scalars['String']>;
  currentUserLevel?: Maybe<Scalars['String']>;
};

export type OrderInfoItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['Float']>;
  actuallyPaid?: Maybe<Scalars['Float']>;
  addressId?: Maybe<Scalars['String']>;
  paymentMethodCardId?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Float']>;
  couponDiscount?: Maybe<Scalars['Float']>;
  vipDiscount?: Maybe<Scalars['Float']>;
  transportationCosts?: Maybe<Scalars['Float']>;
  saleTax?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  discountProductTotal?: Maybe<Scalars['Float']>;
  finishTime?: Maybe<Scalars['Timestamp']>;
  rOrderUser?: Maybe<ROrderUserItemInput>;
  user?: Maybe<UserItemInput>;
  rOrderProduct?: Maybe<Array<ROrderProductItemInput>>;
  userAddress?: Maybe<UserAddressItemInput>;
  pickUpTime?: Maybe<Scalars['Timestamp']>;
  pickUpType?: Maybe<Scalars['String']>;
  generateCoin?: Maybe<Scalars['Float']>;
  deductCoin?: Maybe<Scalars['Float']>;
  userPayCard?: Maybe<UserPayCardItemInput>;
  selfAddressId?: Maybe<Scalars['String']>;
  currentUserLevel?: Maybe<Scalars['String']>;
};

export type OrderInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  startTime?: Maybe<Scalars['Timestamp']>;
  endTime?: Maybe<Scalars['Timestamp']>;
  number?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['Float']>;
  userName?: Maybe<Scalars['String']>;
  registerName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  pickUpTime?: Maybe<Scalars['Timestamp']>;
  pickUpType?: Maybe<Scalars['String']>;
};

export type OrderPage = {
   __typename?: 'OrderPage';
  total?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Maybe<OrderInfo>>>;
};

export type PageInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
};

export type PageResult = {
   __typename?: 'PageResult';
  total?: Maybe<Scalars['Float']>;
};

export type Product = {
   __typename?: 'Product';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  categoryId?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  isHot?: Maybe<Scalars['Float']>;
  isNew?: Maybe<Scalars['Float']>;
  shelvesTypes?: Maybe<Scalars['String']>;
  isEnable?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  packingUnit?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  priceIn?: Maybe<Scalars['Float']>;
  priceOut?: Maybe<Scalars['Float']>;
  priceMarket?: Maybe<Scalars['Float']>;
  brand?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  isGroup?: Maybe<Scalars['Float']>;
  groupPrecision?: Maybe<Scalars['Float']>;
  groupAmount?: Maybe<Scalars['Float']>;
  groupRemark?: Maybe<Scalars['String']>;
  groupAmountUnit?: Maybe<Scalars['String']>;
  rOrderProduct?: Maybe<Array<ROrderProduct>>;
};

export type ProductItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  categoryId?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  isHot?: Maybe<Scalars['Float']>;
  isNew?: Maybe<Scalars['Float']>;
  shelvesTypes?: Maybe<Scalars['String']>;
  isEnable?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  packingUnit?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  priceIn?: Maybe<Scalars['Float']>;
  priceOut?: Maybe<Scalars['Float']>;
  priceMarket?: Maybe<Scalars['Float']>;
  brand?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  isGroup?: Maybe<Scalars['Float']>;
  groupPrecision?: Maybe<Scalars['Float']>;
  groupAmount?: Maybe<Scalars['Float']>;
  groupRemark?: Maybe<Scalars['String']>;
  groupAmountUnit?: Maybe<Scalars['String']>;
  rOrderProduct?: Maybe<Array<ROrderProductItemInput>>;
};

export type PromoCode = {
   __typename?: 'PromoCode';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  discountType?: Maybe<Scalars['String']>;
  discountAmount?: Maybe<Scalars['Float']>;
  discountCondition?: Maybe<Scalars['String']>;
  discountConditionAmount?: Maybe<Scalars['Float']>;
  productCategory?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  effectiveDateStart?: Maybe<Scalars['Timestamp']>;
  effectiveDateEnd?: Maybe<Scalars['Timestamp']>;
  promoCodeType?: Maybe<Scalars['String']>;
  reuseTimes?: Maybe<Scalars['Float']>;
  code?: Maybe<Scalars['String']>;
  isDisable?: Maybe<Scalars['Float']>;
};

export type PromoCodeItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  remark?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  discountType?: Maybe<Scalars['String']>;
  discountAmount?: Maybe<Scalars['Float']>;
  discountCondition?: Maybe<Scalars['String']>;
  discountConditionAmount?: Maybe<Scalars['Float']>;
  productCategory?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  effectiveDateStart?: Maybe<Scalars['Timestamp']>;
  effectiveDateEnd?: Maybe<Scalars['Timestamp']>;
  promoCodeType?: Maybe<Scalars['String']>;
  reuseTimes?: Maybe<Scalars['Float']>;
  code?: Maybe<Scalars['String']>;
  isDisable?: Maybe<Scalars['Float']>;
};

export type Query = {
   __typename?: 'Query';
  testLongApi?: Maybe<Scalars['String']>;
  userList?: Maybe<UserPage>;
  oneUser?: Maybe<User>;
  orderList?: Maybe<OrderPage>;
  orderListTotal?: Maybe<Scalars['Float']>;
  getDataConfig?: Maybe<DataConfig>;
  homeCarouselImgs?: Maybe<DataConfig>;
  getDictTypeList?: Maybe<Array<Maybe<DictTypeFirst>>>;
  getDictList?: Maybe<Array<Maybe<Dict>>>;
  categoryList?: Maybe<CategoryPage>;
  oneCategory?: Maybe<Category>;
  promoCodeList?: Maybe<Array<Maybe<PromoCode>>>;
  login?: Maybe<AuthBody>;
  refreshToken?: Maybe<AuthBody>;
  passwordCode?: Maybe<Scalars['String']>;
};


export type QueryUserListArgs = {
  userListInput?: Maybe<UserListInput>;
};


export type QueryOrderListArgs = {
  fromUser?: Maybe<Scalars['Boolean']>;
  orderInput?: Maybe<OrderInput>;
};


export type QueryOrderListTotalArgs = {
  orderInput?: Maybe<OrderInput>;
};


export type QueryGetDataConfigArgs = {
  dataConfigInput?: Maybe<DataConfigItemInput>;
};


export type QueryHomeCarouselImgsArgs = {
  dataConfigInput?: Maybe<DataConfigItemInput>;
};


export type QueryGetDictListArgs = {
  dictInput?: Maybe<DictInput>;
};


export type QueryCategoryListArgs = {
  data?: Maybe<CategoryListInput>;
};


export type QueryOneCategoryArgs = {
  data?: Maybe<CategoryItemInput>;
};


export type QueryPromoCodeListArgs = {
  promoCodeItemInput?: Maybe<PromoCodeItemInput>;
};


export type QueryLoginArgs = {
  user?: Maybe<UserItemInput>;
};


export type QueryRefreshTokenArgs = {
  refreshtoken: Scalars['String'];
};


export type QueryPasswordCodeArgs = {
  password?: Maybe<Scalars['String']>;
};

export type ROrderProduct = {
   __typename?: 'ROrderProduct';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Float']>;
  dealPrice?: Maybe<Scalars['Float']>;
  product?: Maybe<Product>;
  orderInfo?: Maybe<OrderInfo>;
};

export type ROrderProductItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Float']>;
  dealPrice?: Maybe<Scalars['Float']>;
  product?: Maybe<ProductItemInput>;
  orderInfo?: Maybe<OrderInfoItemInput>;
};

export type ROrderUser = {
   __typename?: 'ROrderUser';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<OrderInfo>;
  user?: Maybe<User>;
};

export type ROrderUserItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<OrderInfoItemInput>;
  user?: Maybe<UserItemInput>;
};


export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  password?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Float']>;
  userInfo?: Maybe<UserInfo>;
  rOrderUser?: Maybe<Array<ROrderUser>>;
  orderInfo?: Maybe<Array<OrderInfo>>;
  orderCoinNextMonth?: Maybe<Scalars['Float']>;
  orderCoinCurrentMonth?: Maybe<Scalars['Float']>;
  orderAmountCurrentYear?: Maybe<Scalars['Float']>;
};

export type UserAddress = {
   __typename?: 'UserAddress';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  zip?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  contactInformation?: Maybe<Scalars['String']>;
  contactUserName?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfo>>>;
  combineAddress?: Maybe<Scalars['String']>;
};

export type UserAddressItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  zip?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  contactInformation?: Maybe<Scalars['String']>;
  contactUserName?: Maybe<Scalars['String']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfoItemInput>>>;
  combineAddress?: Maybe<Scalars['String']>;
};

export type UserInfo = {
   __typename?: 'UserInfo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  userLevel?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserInfoItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  userLevel?: Maybe<Scalars['String']>;
  user?: Maybe<UserItemInput>;
};

export type UserInRegister = {
   __typename?: 'UserInRegister';
  token?: Maybe<Scalars['String']>;
  refreshtoken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  password?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Float']>;
  userInfo?: Maybe<UserInfoItemInput>;
  rOrderUser?: Maybe<Array<ROrderUserItemInput>>;
  orderInfo?: Maybe<Array<OrderInfoItemInput>>;
  orderCoinNextMonth?: Maybe<Scalars['Float']>;
  orderCoinCurrentMonth?: Maybe<Scalars['Float']>;
  orderAmountCurrentYear?: Maybe<Scalars['Float']>;
};

export type UserListInput = {
  rows_per_page?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  registerName?: Maybe<Scalars['String']>;
};

export type UserPage = {
   __typename?: 'UserPage';
  total?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Maybe<User>>>;
};

export type UserPayCard = {
   __typename?: 'UserPayCard';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  addressDetail?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfo>>>;
  expirationTime?: Maybe<Scalars['Timestamp']>;
};

export type UserPayCardItemInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  addressDetail?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Float']>;
  orderInfo?: Maybe<Array<Maybe<OrderInfoItemInput>>>;
  expirationTime?: Maybe<Scalars['Timestamp']>;
};

