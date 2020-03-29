import {fpMerge, fpMergePre} from "@/common/utils"
import {modelFactory} from "@/common/ModelAction/modelUtil"
import {getDataConfigDoc} from '@/common/graphqlTypes/graphql/doc'

export interface ConfigHelpDocumentationModel {
  list: object[]
  typeList: any[]
  actType: DictType & {id: string}
  problemListData: { [key: string]: Problem[] }
}

export const configHelpDocumentationModel = modelFactory('configHelpDocumentationModel', {
  actType: {id: '', code: "", name: "", sort: 0},
  typeList: [],
  list: [],
  problemListData: {},
} as ConfigHelpDocumentationModel, {
  getTypeList: async (value, option) => {
    const res = await option.query(getDataConfigDoc, {
      type: 'HelpDocumentationType',
    })
    option.setData(fpMergePre({typeList: res?.getDataConfig?.value?.typeList ?? []}))
  },
  setActType: (value, {setData}) => {
    return setData(data => fpMerge(data, {
      actType: value,
    }))
  },
})
