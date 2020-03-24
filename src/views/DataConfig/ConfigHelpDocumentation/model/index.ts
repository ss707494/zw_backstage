import {fpMerge} from "@/common/utils"
import {modelFactory} from "@/common/ModelAction/modelUtil"

export interface ConfigHelpDocumentationModel {
  list: object[]
  typeList: any[]
  actType: DictType
  problemListData: { [key: string]: Problem[] }
}

export const configHelpDocumentationModel = modelFactory('configHelpDocumentationModel', {
  actType: {code: "", name: "", sort: 0},
  typeList: [],
  list: [],
  problemListData: {},
} as ConfigHelpDocumentationModel, {
  setActType: (value, {setData}) => {
    return setData(data => fpMerge(data, {
      actType: value,
    }))
  },
})
