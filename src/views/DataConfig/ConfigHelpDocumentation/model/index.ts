import {fpMerge, fpSet} from "@/common/utils"
import _ from "lodash"
import {modelFactory} from "@/common/ModelAction/modelUtil"

export interface ConfigHelpDocumentationModel {
  list: object[]
  typeList: any[]
  actType: DictType
  problemListData: { [key: string]: Problem[] }
}

export const configHelpDocumentationModel = modelFactory({
  actType: {code: "", name: "", sort: 0},
  typeList: [],
  list: [],
  problemListData: {},
  ssObj: {},
} as ConfigHelpDocumentationModel, {
  setActType: (value, setData) => {
    return setData(data => fpMerge(data, {
      actType: value,
    }))
  },
  setConfig: (value, setData) => {
    return setData(data => fpMerge(data, value))
  },
  addProblem: (value, setData) => setData(data => fpSet(data, ['problemListData', data.actType.code], preData  => [
    ...preData ?? [],
    value
  ])),
  editProblem: (value, setData) => setData(data => fpSet(data, ['problemListData', data.actType.code, value?.index], _.pick(value, ['answer', 'sort', 'problem']))),
})
