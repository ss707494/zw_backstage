export enum PromoCodeTypeEnum {
  DarenCard = 'DarenCard',
  PromoCode = 'PromoCode',
}

export enum DiscountTypeEnum {
  Percentage = 'Percentage',
  Amount = 'Amount',
}

export enum SS {
  SS,
  SS2,
}

export enum DiscountConditionEnum {
  No = 'No',
  Amount = 'Amount',
}

export enum ProductSupplement {
  _,
  Pending,
  Finish,
}

export const ProductSupplementString: any = {
  1: '配货中',
  2: '已完成',
}

export enum OrderState {
  Ordered = 1,
  Paid = 2,
  Picking = 3,
  PickedUp = 4,
  Finish = 5,
  Cancel = 6,
}

// 1:代付款 2:已付款 3:已发货 4:已收货 5:已取消 6:已完成 7:已退回
const _s: {
  [key in number]: string
} = {
  1: '待付款',
  2: '已付款',
  3: '已发货',
  4: '已收货',
  5: '已取消',
  6: '已完成',
  7: '已退回',
}
export const orderStateToString = (s: number | null = 0) => {
  return _s?.[(s ?? 0)] ?? ''
}

// 配置管理
export enum DictTypeEnum {
  GroupPrecision = 'GroupPrecision',
  UserLevel = 'UserLevel',
  Freight = 'Freight',
  HelpDocumentationType = 'HelpDocumentationType',
  HelpDocumentation = 'HelpDocumentation',
  PromotionThemeSelect = 'PromotionThemeSelect',
  PromotionFlashSale = 'PromotionFlashSale',
  HomeCarousel = 'HomeCarousel',
  OrderState = 'OrderState',
  SelfAddress = 'SelfAddress',
  AppModule = 'AppModule',
}

// 轮播图关联项
export enum RelatedObjTypeEnum {
  PromoCode = 'PromoCode',
  PromotionFlashSale = 'PromotionFlashSale',
  PromotionThemeSelect = 'PromotionThemeSelect',
}

export enum AppFootBar {
  home = 'home',
  group = 'group',
  card = 'card',
  cart = 'cart',
  me = 'me'
}

export enum AppModuleTypeEnum {
  categorySelection = 'categorySelection',
  limitTime = 'limitTime',
  salesRank = 'salesRank',
  themeSelection = 'themeSelection',
  mayLike = 'mayLike',
  lineRanking = 'lineRanking',
  topRanking = 'topRanking',
}

export const CategoryRootName = 'root'

export const orderStateKeys: string[] = Object.values(OrderState) as string[]

export const ProvinceData = [
  ['AL', 'Alabama'],
  ['AK', 'Alaska'],
  ['AZ', 'Arizona'],
  ['AR', 'Arkansas'],
  ['CA', 'California'],
  ['CO', 'Colorado'],
  ['CT', 'Connecticut'],
  ['DE', 'Delaware'],
  ['DC', 'District Of Columbia'],
  ['FL', 'Florida'],
  ['GA', 'Georgia'],
  ['HI', 'Hawaii'],
  ['ID', 'Idaho'],
  ['IL', 'Illinois'],
  ['IN', 'Indiana'],
  ['IA', 'Iowa'],
  ['KS', 'Kansas'],
  ['KY', 'Kentucky'],
  ['LA', 'Louisiana'],
  ['ME', 'Maine'],
  ['MD', 'Maryland'],
  ['MA', 'Massachusetts'],
  ['MI', 'Michigan'],
  ['MN', 'Minnesota'],
  ['MS', 'Mississippi'],
  ['MO', 'Missouri'],
  ['MT', 'Montana'],
  ['NE', 'Nebraska'],
  ['NV', 'Nevada'],
  ['NH', 'New Hampshire'],
  ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'],
  ['NY', 'New York'],
  ['NC', 'North Carolina'],
  ['ND', 'North Dakota'],
  ['OH', 'Ohio'],
  ['OK', 'Oklahoma'],
  ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'],
  ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'],
  ['SD', 'South Dakota'],
  ['TN', 'Tennessee'],
  ['TX', 'Texas'],
  ['UT', 'Utah'],
  ['VT', 'Vermont'],
  ['VA', 'Virginia'],
  ['WA', 'Washington'],
  ['WV', 'West Virginia'],
  ['WI', 'Wisconsin'],
  ['WY', 'Wyoming'],
]

export const getPickUpTypeName = (type: string | 'Self' | 'Delivery') => {
  return ({
    Self: '自取',
    Delivery: '配送',
  })[type as 'Self' | 'Delivery'] ?? ''
}
export const PickUpTypeEnum = {
  Self: 'Self',
  Delivery: 'Delivery',
}
// 热销排行
export const SaleRankTypeEnum = {
  OneDay: 'OneDay',
  OneWeek: 'OneWeek',
  OneMonth: 'OneMonth',
}
// 信用卡地址输入方式
export const CreditAddressInputTypeEnum = {
  Select: 'Select',
  Input: 'Input',
}

