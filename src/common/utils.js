import format from 'date-fns/format'

export const getObjectURL = file => {
  return  window?.createObjectURL?.(file)
      ?? window?.URL?.createObjectURL?.(file)
      ?? window?.webkitURL?.createObjectURL?.(file)
}

export const fileUploadAjax = (data, files, url, option) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  }
  if (files) {
    files.forEach(e => {
      formData.append('FileData[]', e)
    })
  }
  return axios.post(url, formData, {
    ...option
  })
}

export const parseFloatForInput = value => {
  if (value === '-' || value === '') return value
  try {
    return parseFloat(value)
  } catch (e) {
    console.error(e)
  }
}

export const formatDate = format

export default {
  getObjectURL
}
