import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  TextField,
  TextFieldProps,
} from "@material-ui/core"
import React from "react"
import {editThemeModel} from "@/views/DataConfig/ConfigThemeSelect/model/editTheme"
import {CusButton} from "@/component/CusButton"
import {ImgUpload} from "@/component/ImgUpload"
import styled from "styled-components"
import {KeyboardDatePicker} from "@material-ui/pickers"
import {useStoreModel, useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {fileUploadAjax, fpMerge, fpSet} from '@/common/utils'
import {configDataModel} from '@/views/DataConfig/List/model'
import {endOfDay} from "date-fns"

export declare type ConfigThemeSelectTs = {
  title: string
  remark: string
  imgUrl: string
  startTime: any
  endTime: any
  selectProductList?: string[]
  isDisabled: number
}

const FullTextField:React.ComponentType<TextFieldProps> = (props) => <TextField
    fullWidth
    color={"secondary"}
    {...props}
/>

const DialogContentBox = styled(DialogContent)`
  && .MenuLayout-MuiFormControl-root {
    margin-bottom: 20px;
  }

`

const updateOne = async (value: { configThemeSelect: ConfigThemeSelectTs; imgFile: any; index: number }, pre: any) => {
  let uploadRes = value.configThemeSelect.imgUrl
  if (value.imgFile) {
    uploadRes = (await fileUploadAjax({}, [value.imgFile], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
  }
  if (value.index > -1) {
    return fpSet(pre, ['list', value.index], {
      ...value.configThemeSelect,
      imgUrl: uploadRes,
    })
  } else {
    return fpMerge(pre, {
      list: [
        ...pre?.list,
        {
          ...value.configThemeSelect,
          imgUrl: uploadRes,
        }
      ],
    })
  }
}

export const EditModal = () => {
  const {state, actions} = useStoreModel(editThemeModel)
  const {state: configState, actions: configActions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = configState

  return (
      <Dialog
          open={state.open}
          onClose={() => (actions.onClose)({})}
      >
        <DialogContentBox>
          <FullTextField
              label={'名称'}
              value={state.modalData.title || ''}
              onChange={event => (actions.setModal)({
                title: event?.target?.value,
              })}
          />
          <FullTextField
              label={'描述'}
              value={state.modalData.remark || ''}
              onChange={event => (actions.setModal)({
                remark: event?.target?.value,
              })}
          />
          <FormControl
              fullWidth
          >
            <FormLabel>
              图片
            </FormLabel>
            <ImgUpload
                initSrc={state.modalData.imgUrl}
                onChange={(file: any) => {
                  (actions.uploadImg)(file)
                }}
            />
          </FormControl>
          <FormControl
              fullWidth
          >
            <FormLabel>
              有效日期-开始
            </FormLabel>
            <KeyboardDatePicker
                format={'yyyy/MM/dd'}
                value={state.modalData.startTime || null}
                onChange={date => (actions.setModal)({
                  startTime: date,
                })}
            />
          </FormControl>
          <FormControl
              fullWidth
          >
            <FormLabel>
              有效日期-结束
            </FormLabel>
            <KeyboardDatePicker
                format={'yyyy/MM/dd'}
                value={state.modalData.endTime || null}
                onChange={date => (actions.setModal)({
                  endTime: endOfDay(date ?? 0),
                })}
            />
          </FormControl>
        </DialogContentBox>
        <DialogActions>
          <CusButton
              fullWidth
              variant={"contained"}
              color={"primary"}
              onClick={async () => {
                configActions.setDataConfig(await updateOne({
                  imgFile: state.imgFile,
                  configThemeSelect: state.modalData,
                  index: state.isEdit,
                }, dataConfig.value))
                await configActions.saveDataConfig()
                actions.onClose({})
              }}
          >保存</CusButton>
        </DialogActions>
      </Dialog>
  )
}
