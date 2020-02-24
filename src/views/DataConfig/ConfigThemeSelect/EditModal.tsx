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
import {ModuleEnum, useStore} from "@/common/context"
import {editThemeModel} from "@/views/DataConfig/ConfigThemeSelect/model/editTheme"
import {CusButton} from "@/component/CusButton"
import {ImgUpload} from "@/component/ImgUpload"
import styled from "styled-components"
import {KeyboardDateTimePicker} from "@material-ui/pickers"
import {themeSelectModel} from "@/views/DataConfig/ConfigThemeSelect/model/config"

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

export const EditModal = () => {
  const {state, actions, handleAction: dealAction} = useStore([ModuleEnum.ConfigThemeSelect, 'editModal'], editThemeModel)
  const {actions: asyncActionsConfig, handleAction: dealActionConfig} = useStore(ModuleEnum.ConfigThemeSelect, themeSelectModel)

  return (
      <Dialog
          open={state.open}
          onClose={() => dealAction(actions.onClose)()}
      >
        <DialogContentBox>
          <FullTextField
              label={'名称'}
              value={state.modalData.title}
              onChange={event => dealAction(actions.setModal)({
                title: event?.target?.value,
              })}
          />
          <FullTextField
              label={'描述'}
              value={state.modalData.remark}
              onChange={event => dealAction(actions.setModal)({
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
                  dealAction(actions.uploadImg)(file)
                }}
            />
          </FormControl>
          <FormControl
              fullWidth
          >
            <FormLabel>
              有效日期-开始
            </FormLabel>
            <KeyboardDateTimePicker
                format={'yyyy/MM/dd HH:mm'}
                value={state.modalData.startTime}
                onChange={date => dealAction(actions.setModal)({
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
            <KeyboardDateTimePicker
                format={'yyyy/MM/dd HH:mm'}
                value={state.modalData.endTime}
                onChange={date => dealAction(actions.setModal)({
                  endTime: date,
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
                const res = await dealActionConfig(asyncActionsConfig.updateOne)({
                  imgFile: state.imgFile,
                  configThemeSelect: state.modalData,
                  index: state.isEdit,
                })
                if (res) {
                  dealAction(actions.onClose)()
                }
              }}
          >保存</CusButton>
        </DialogActions>
      </Dialog>
  )
}
