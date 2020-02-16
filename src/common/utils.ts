import format from 'date-fns/format'
import set from 'lodash/set'
import {cloneDeep, merge} from 'lodash'
import _ from 'lodash'

export const getObjectURL = (file: any) => {
  // @ts-ignore
  return window?.createObjectURL?.(file)
      ?? window?.URL?.createObjectURL?.(file)
      ?? window?.webkitURL?.createObjectURL?.(file)
}

export const fileUploadAjax = (data: any, files: any, url: string, option?: any) => {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  }
  if (files) {
    files.forEach((e: any) => {
      formData.append('FileData[]', e)
    })
  }
  // @ts-ignore
  return axios.post(url, formData, {
    ...option
  })
}

export const parseFloatForInput = (value: any) => {
  if (value === '-' || value === '') return value
  try {
    return parseFloat(value)
  } catch (e) {
    console.error(e)
  }
}

type SetData<S = any> = S | ((preData: S) => S)

export const fpSet = <E = any>(origin: any, path: any, value: SetData<E>) => {
  let newData = cloneDeep(origin)
  if (_.isFunction(value)) {
    const oldData = _.get(origin, path)
    set(newData, path, value(oldData))
  } else {
    set(newData, path, value)
  }
  return newData
}

export const fpMerge: <TObject, TSource1>(
    origin: TObject,
    newValue: TSource1,
) => TObject & TSource1 = (origin, newValue) => {
  return merge({}, origin, newValue)
}

export const fpRemove = (arr: any, index: number) => {
  if (!arr) return []
  return [
    ...arr?.slice(0, index),
    ...arr?.slice(index + 1, arr?.length),
  ]
}

export const formatDate = format

export const dealNonBooleanProps = (value: any) => !!value ? 1 : 0

export default {
  getObjectURL
}
