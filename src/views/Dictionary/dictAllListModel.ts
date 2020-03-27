import {modelFactory} from "@/common/ModelAction/modelUtil"
import {Dict} from "@/common/graphqlTypes/types"
import {getDictListDoc} from "@/common/graphqlTypes/graphql/doc"
import {fpMergePre} from "@/common/utils"

const keys = [
  'addOneDictTypeFirst', 'shelvesType',
  'weightUnit', 'groupPrecision',
  'unpackingUnit', 'packingUnit',
  'userLevel', 'deliveryType',
  'discountType',
]
export const dictAllListModel = modelFactory('dictModel', {
  shelvesTypeList: [] as Dict[],
  weightUnitList: [] as Dict[],
  groupPrecisionList: [] as Dict[],
  unpackingUnitList: [] as Dict[],
  packingUnitList: [] as Dict[],
  userLevelList: [] as Dict[],
  deliveryTypeList: [] as Dict[],
  addOneDictTypeFirstList: [] as Dict[],
  discountTypeList: [] as Dict[],
}, {
  getDictList: async (value, option) => {
    if (!option.data.shelvesTypeList.length) {
      const res = await option.query(getDictListDoc, {
        isDisable: 0,
      })
      option.setData(fpMergePre(keys.reduce((previousValue, currentValue) => ({
        ...previousValue,
        [`${currentValue}List`]: res?.getDictList?.filter((d: Dict) => d.dictTypeCode?.toLowerCase() === currentValue.toLowerCase())
      }), {})))
    }
  },

})
