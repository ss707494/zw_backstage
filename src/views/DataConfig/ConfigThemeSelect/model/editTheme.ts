import {mergeModel} from "@/common/ModelAction/modelUtil"
import {fpMerge} from "@/common/utils"
import {modalModelFactory} from "@/common/model/modal"

const _modalModel = modalModelFactory('themeModal', {
  title: '',
  remark: '',
  imgUrl: '',
  startTime: null,
  endTime: null,
})

export const editThemeModel = mergeModel(_modalModel, 'editThemeModel', {
  imgFile: '',
}, {
  uploadImg: (value, {setData}) => setData(data => fpMerge(data, {imgFile: value})),
  ss: (value, {setData}) => {
    setData(pre => {
      return {...pre}
    })
  },
})


