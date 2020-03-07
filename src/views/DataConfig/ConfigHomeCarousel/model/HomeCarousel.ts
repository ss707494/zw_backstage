import {modelFactory} from "@/common/ModelAction/modelUtil"
import {fileUploadAjax, fpMerge, fpSet} from "@/common/utils"

export const homeCarousel = modelFactory({
  configData: {
    imgList: [] as string[],
  },
}, {
  setConfigData: (value, {setData}) => setData(data => fpMerge(data, {configData: value})),
  addOne: async (value, {setData}) => {
    const uploadRes = (await fileUploadAjax({}, [value], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
    setData(pre => fpSet(pre, ['configData', 'imgList'], [
      ...pre.configData.imgList,
      uploadRes,
    ]))
    return true
  },
  setOneImg: async ({index, file}: {
    index: number
    file: any
  }, {setData},) => {
    const uploadRes = (await fileUploadAjax({}, [file], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
    setData(pre => fpSet(pre, ['configData', 'imgList', index], uploadRes))
    return true
  },
})
