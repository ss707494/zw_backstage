import {modelFactory} from '@/common/ModelAction/modelUtil'
import {fpMergePre} from '@/common/utils'
import {getDataConfigDoc, saveDataConfig} from '@/common/graphqlTypes/graphql/doc'
import {DataConfig, DataConfigItemInput} from '@/common/graphqlTypes/types'

export const configDataModel = modelFactory('configDataModel', {
  dataConfig: {} as DataConfig,
  originDataConfig: {} as DataConfig,
}, {
  getDataConfig: async (type: string, option) => {
    const res = await option.query(getDataConfigDoc, {
      type,
    })
    option.setData(fpMergePre({
      dataConfig: res?.getDataConfig ?? {},
      originDataConfig: res?.getDataConfig ?? {},
    }))
  },
  setDataConfig: (value: DataConfig, option) => {
    option.setData(fpMergePre({
      dataConfig: {
        value,
      },
    }))
  },
  saveDataConfig: async (value, option) => {
    const res = option.mutate(saveDataConfig, option.data.dataConfig as DataConfigItemInput)
    if (res) {
      option.setData(fpMergePre({
        originDataConfig: option.data.dataConfig,
      }))
    }
    return res
  },
})
