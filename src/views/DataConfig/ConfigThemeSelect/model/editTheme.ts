import {modelFactory} from "@/common/context"
import {fpMerge} from "@/common/utils"
import {modalModelFactory} from "@/common/model/modal"

export const editThemeModel = modelFactory({
  imgFile: '',
}, {
  uploadImg: (value, data) => fpMerge(data, {imgFile: value})
}, {
  ss: (value, setData) => {
    setData(pre => {
      return {...pre}
    })
  },
}, modalModelFactory({
  title: '',
  remark: '',
  imgUrl: '',
  startTime: null,
  endTime: null,
}))

