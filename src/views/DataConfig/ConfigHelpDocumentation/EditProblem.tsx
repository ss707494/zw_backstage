import {Dialog, DialogActions, DialogContent, TextField} from "@material-ui/core"
import React from "react";
import {fpSet, parseFloatForInput} from "@/common/utils"
import {CusButton} from "@/component/CusButton";
import {modalModelFactory} from "@/common/model/modal"
import {configHelpDocumentationModel} from "@/views/DataConfig/ConfigHelpDocumentation/model"
import {useStoreModel, useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import _ from 'lodash'
import {configDataModel} from '@/views/DataConfig/List/model'

export const editProblemModel = modalModelFactory('editProblem', {
  problem: '',
  answer: '',
  sort: 0,
  index: 0,
})

const editProblem = (pre: any, modalData: any, actType: any) => {
  return fpSet(pre, ['problemListData', actType.code, modalData?.index], _.pick(modalData, ['answer', 'sort', 'problem']))
}
const addProblem = (pre: any, modalData: any, actType: any) => fpSet(pre, ['problemListData', actType.code], preData  => [
  ...preData ?? [],
  modalData
])

export const EditProblem = () => {
  const {state: configState, actions: configActions} = useStoreModelByType__Graphql(configDataModel)

  const {state} = useStoreModel(configHelpDocumentationModel)
  const {state: editState, actions: editActions} = useStoreModel(editProblemModel)
  const modalData = editState.modalData
  const setModalData = (editActions.setModal)
  const handleSave = () => {
    if (modalData?.problem && modalData?.answer && modalData?.sort) {
      if (modalData?.index > -1) {
        configActions.setDataConfig(editProblem(configState.dataConfig.value, modalData, state.actType))
      } else {
        configActions.setDataConfig(addProblem(configState.dataConfig.value, modalData, state.actType))
      }
      (editActions.onClose)({})
    }
  }

  return (
      <Dialog
          open={editState.open}
          onClose={(editActions.onClose)}
      >
        <DialogContent>
          <TextField
              fullWidth
              color={"secondary"}
              label={'问题'}
              value={modalData?.problem || ''}
              onChange={event => setModalData({
                problem: event?.target?.value,
              })}
          />
          <TextField
              fullWidth
              color={"secondary"}
              label={'答案'}
              value={modalData?.answer || ''}
              onChange={event => setModalData({
                answer: event?.target?.value,
              })}
          />
          <TextField
              fullWidth
              color={"secondary"}
              label={'排序'}
              value={modalData?.sort || ''}
              onChange={event => setModalData({
                sort: parseFloatForInput(event?.target?.value),
              })}
          />
        </DialogContent>
        <DialogActions>
          <CusButton
              fullWidth
              variant={"contained"}
              color={"primary"}
              onClick={handleSave}
          >保存</CusButton>
        </DialogActions>
      </Dialog>
  )
}
