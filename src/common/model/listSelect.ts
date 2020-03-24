import {modelFactory} from '@/common/ModelAction/modelUtil'
import {fpMergePre} from '@/common/utils'

const checkAllData = (allList: string[], itemList: string[]) => allList.every(item => itemList.includes(item))

export const listSelectModel = modelFactory('listSelect', {
  selectItems: [] as string[],
}, {
  setSelectItems: (value: { flag: boolean, items: string[] }, {data, setData}) => {
    const {flag, items} = value
    if (flag) {
      setData(fpMergePre({
        selectItems: [
          ...data.selectItems.filter(value1 => !items.includes(value1)),
          ...items,
        ],
      }))
    } else {
      setData(fpMergePre({
        selectItems: data.selectItems.filter(value1 => !items.includes(value1)),
      }))
    }
  },
  checkAll: (alllist: string[], options) => checkAllData(alllist, options.data.selectItems),
  checkIndeterminate: (allList: string[], options) => !checkAllData(allList, options.data.selectItems) && !!options.data.selectItems.length,
})
