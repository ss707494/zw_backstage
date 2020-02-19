import {fileUploadAjax, fpMerge, fpSet} from "@/common/utils"
import {modelFactory} from "@/common/context"

export declare type ConfigThemeSelectTs = {
  title: string,
  remark: string,
  imgUrl: string,
  startTime: any,
  endTime: any,
  selectProductList?: string[],
}

export const themeSelectModel = modelFactory({
  configData: {
    list: [],
  },
}, {
  setConfigData: (value, data) => fpSet(data, ['configData'], {...value}),
  setListSelectProduct: ({selectList, index}: { selectList: string[], index: number }, data) => fpSet(data, ['configData', 'list', index, 'selectProductList'], selectList),
}, {
  updateOne: async (value: { configThemeSelect: ConfigThemeSelectTs, imgFile: any, index: number }, setData) => {
    let uploadRes = value.configThemeSelect.imgUrl
    if (value.imgFile) {
      uploadRes = (await fileUploadAjax({}, [value.imgFile], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
    }
    if (value.index > -1) {
      setData(pre => fpSet(pre, ['configData', 'list', value.index], {
        ...value.configThemeSelect,
        imgUrl: uploadRes,
      }))
    } else {
      setData(pre => fpMerge(pre, {
        configData: {
          list: [
            ...pre.configData?.list,
            {
              ...value.configThemeSelect,
              imgUrl: uploadRes,
            }
          ],
        }
      }))
    }
    return true
  },
})
