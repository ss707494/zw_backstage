import {modelFactory} from "@/common/ModelAction/modelUtil"
import {Dict} from "@/common/graphqlTypes/types"
import {getDictListDoc} from "@/common/graphqlTypes/graphql/doc"
import {fpMergePre} from "@/common/utils"

export const dictModel = modelFactory('dictModel', {
  dictList: [] as Dict[],
}, {
  getDictList: async (value: string, option) => {
    const res = await option.query(getDictListDoc, {
      dictTypeCode: value,
    })
    option.setData(fpMergePre({
      dictList: res?.getDictList,
    }))
  },
})
