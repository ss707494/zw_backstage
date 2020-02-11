import {Dialog, DialogActions, DialogContent, TextField} from "@material-ui/core"
import React from "react";
import {parseFloatForInput} from "@/common/utils";
import {CusButton} from "@/component/CusButton";
import {dealNameSpace, ModuleEnum, useStore} from "@/common/context"
import {modalModel} from "@/common/model/modal"
import {configHelpDocumentationModel} from "@/views/DataConfig/ConfigHelpDocumentation/model"

export const EditProblemNamespace = 'editProblem'

export const EditProblem = () => {
  const {dealStoreAction, actions} = useStore(ModuleEnum.ConfigHelpDocumentation, configHelpDocumentationModel)
  const {state: editState, dealStoreAction: dealStoreActionEdit, actions: editActions} = useStore(dealNameSpace(ModuleEnum.ConfigHelpDocumentation, EditProblemNamespace), modalModel)
  const modalData = editState.modalData
  const setModalData = dealStoreActionEdit(editActions.setModal)
  const handleSave = () => {
    if (modalData?.problem && modalData?.answer && modalData?.sort) {
      if (modalData?.index > -1) {
        dealStoreAction(actions.editProblem)(modalData)
      } else {
        dealStoreAction(actions.addProblem)(modalData)
      }
      dealStoreActionEdit(editActions.onClose)()
    }
  }

  return (
      <Dialog
          open={editState.open}
          onClose={dealStoreActionEdit(editActions.onClose)}
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
