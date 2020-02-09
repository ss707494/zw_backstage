import {Dialog, DialogContent, TextField} from "@material-ui/core";
import React from "react";
import {CusButton} from "@/component/CusButton";
import styled from "styled-components";
import {fpSet, parseFloatForInput} from "@/common/utils";

const DialogContentBox = styled(DialogContent)`
  & .MenuLayout-MuiFormControl-root{
    margin-bottom: 20px;
  } 
`

export const AddType = ({
                          modalData,
                          open,
                          setModalData,
                          setOpen,
                          addTypeListAction,
                          editTypeAction,
                        }: CommonModalState) => {

  const handleClose = () => {
    setOpen(false)
    setModalData({})
  }
  const handleSubmit = () => {
    if (modalData?.name && modalData?.code) {
      if (!modalData?.isEdit) {
        addTypeListAction(modalData)
      }else {
        editTypeAction(modalData)
      }
      handleClose()
    }
  }
  return (
      <Dialog
          open={open}
          onClose={handleClose}
      >
        <DialogContentBox>
          <TextField
              fullWidth
              color={"secondary"}
              label={'名称'}
              value={modalData?.name || ''}
              onChange={event => setModalData({
                ...modalData,
                name: event?.target?.value,
              })}
          />
          <TextField
              fullWidth
              color={"secondary"}
              label={'code'}
              value={modalData?.code || ''}
              onChange={event => setModalData(fpSet(modalData, 'code', event?.target?.value))}
          />
          <TextField
              fullWidth
              color={"secondary"}
              label={'排序'}
              value={modalData?.sort || ''}
              onChange={event => setModalData(fpSet(modalData, 'sort', parseFloatForInput(event?.target?.value)))}
          />
          <CusButton
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
          >
            保存
          </CusButton>
        </DialogContentBox>
      </Dialog>
  )
}
