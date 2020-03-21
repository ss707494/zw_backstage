import {modelFactory} from "@/common/ModelAction/modelUtil"
import {Dict} from "@/common/graphqlTypes/types"
import {getDictListDoc} from "@/common/graphqlTypes/graphql/doc"
import {fpMergePre} from "@/common/utils"

export const dictAllListModel = modelFactory('dictModel', {
  shelvesTypeList: [] as Dict[],
  weightUnitList: [] as Dict[],
  groupPrecisionList: [] as Dict[],
  unpackingUnitList: [] as Dict[],
  packingUnitList: [] as Dict[],
  userLevelList: [] as Dict[],
}, {
  getDictList: async (value, option) => {
    const res = await option.query(getDictListDoc, {
      isDisable: 0,
    })
    option.setData(fpMergePre({
      shelvesTypeList: res?.getDictList?.filter((d: Dict) => d.dictTypeCode === 'ShelvesType'),
      weightUnitList: res?.getDictList?.filter((d: Dict) => d.dictTypeCode === 'WeightUnit'),
      groupPrecisionList: res?.getDictList?.filter((d: Dict) => d.dictTypeCode === 'GroupPrecision'),
      unpackingUnitList: res?.getDictList?.filter((d: Dict) => d.dictTypeCode === 'UnpackingUnit'),
      packingUnitList: res?.getDictList?.filter((d: Dict) => d.dictTypeCode === 'PackingUnit'),
      userLevelList: res?.getDictList?.filter((d: Dict) => d.dictTypeCode === 'UserLevel'),
    }))
  },

})
