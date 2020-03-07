import {Dialog, DialogActions, DialogContent, TextField} from "@material-ui/core"
import React from "react";
import {parseFloatForInput} from "@/common/utils";
import {CusButton} from "@/component/CusButton";
import {modalModelFactory} from "@/common/model/modal"
import {configHelpDocumentationModel} from "@/views/DataConfig/ConfigHelpDocumentation/model"
import {ModuleEnum, useStoreModel} from "@/common/ModelAction/useStore"

export const EditProblemNamespace = 'editProblem'

export const EditProblem = () => {
  const {actions} = useStoreModel(ModuleEnum.ConfigHelpDocumentation, configHelpDocumentationModel)
  const {state: editState, actions: editActions} = useStoreModel([ModuleEnum.ConfigHelpDocumentation, EditProblemNamespace], modalModelFactory({
    problem: '',
    answer: '',
    sort: 0,
    index: 0,
  }))
  const modalData = editState.modalData
  const setModalData = (editActions.setModal)
  const handleSave = () => {
    if (modalData?.problem && modalData?.answer && modalData?.sort) {
      if (modalData?.index > -1) {
        (actions.editProblem)(modalData)
      } else {
        (actions.addProblem)(modalData)
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
