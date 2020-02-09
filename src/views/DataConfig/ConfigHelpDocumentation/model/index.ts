import {fpMerge, fpSet} from "@/common/utils"

export interface ConfigHelpDocumentationModel {
  list: object[],
  typeList: any[],
  actType: DictType,
  problemListData: { [key: string]: Problem[] }
}

export const configHelpDocumentationModel: ContextModel<ConfigHelpDocumentationModel, {
  setActType: ActionFun,
  setConfig: ActionFun,
  addProblem: ActionFun<ConfigHelpDocumentationModel, Problem>,
}> = {
  state: {
    actType: {code: "", name: "", sort: 0},
    typeList: [],
    list: [],
    problemListData: {},
  },
  actions: {
    setActType: (value, data) => {
      return fpMerge(data, {
        actType: value,
      })
    },
    setConfig: (value, data) => {
      return fpMerge(data, value)
    },
    addProblem: (value, data) => fpSet(data, ['problemListData', data.actType.code], preData  => [
        ...preData ?? [],
        value
    ]),
  },
  asyncActions: {},
}
