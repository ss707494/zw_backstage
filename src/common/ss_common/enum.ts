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

export enum AppModuleTypeEnum {
  categorySelection = 'categorySelection',
  limitTime = 'limitTime',
  salesRank = 'salesRank',
  themeSelection = 'themeSelection',
  mayLike = 'mayLike',
  lineRanking = 'lineRanking',
  topRanking = 'topRanking',
}

export const orderStateKeys: string[] = Object.values(OrderState).filter(value => typeof (value) === 'string') as string[]
