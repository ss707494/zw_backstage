declare interface DictionaryInput {
  id: string,
  name: string,
  create_time: string,
  update_time: string,
  is_delete: number,
  is_disable: number,
  code: string,
  dict_type_code: string,
  sort: number,
  remark: string,

}

declare type DataConfigInput = {
  id: string,
  name: string,
  create_time: string,
  update_time: string,
  is_delete: number,

  type: string,
  value: any,
  remark: string,

}

declare interface PromoCode {

  id: string,
  name: string,
  create_time: string,
  update_time: string,
  is_delete: number,
  remark: string,

  title: string,
  discount_type: string,
  discount_amount: number,
  discount_condition: string,
  discount_condition_amount: number,
  product_category: string,
  img_url: string,
  effective_date_start: string,
  effective_date_end: string,
  promo_code_type: string,
  reuse_times: number,
  code: string,
  isDisable: number,

  category_data?: {
    id: string,
    name: string,
    remark: string,
    sort: number,
    parent_data: any,
  }

}
