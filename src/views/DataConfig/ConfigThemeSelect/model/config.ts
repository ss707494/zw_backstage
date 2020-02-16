import {fileUploadAjax, fpMerge, fpSet} from "@/common/utils"
import {modelFactory} from "@/common/context"
import {ConfigThemeSelect} from "@/views/DataConfig/ConfigThemeSelect/ConfigThemeSelect"

export declare type ConfigThemeSelect = {
  title: string,
  remark: string,
  imgUrl: string,
  startTime: any,
  endTime: any,
  selectProductList?: string[],
}

export const themeSelectModel = modelFactory({
  configData: {
    list: [] as ConfigThemeSelect[],
  },
}, {
  setConfigData: (value, data) => fpMerge(data, {configData: value}),
}, {
  updateOne: async (value: { configThemeSelect: ConfigThemeSelect, imgFile: any, index: number }, setData) => {
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
            ...pre.configData.list,
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
