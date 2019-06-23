import React, { useState } from 'react'
import { S } from './style'
import DialogTitle from "@material-ui/core/DialogTitle";

export const useInitState = () => {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => () => {
    setEditData(item)
    setOpen(true)
  }
  return {
    editClick,
    open,
    setOpen,
    editData,
    setEditData
  }
}

export const EditModal = (
    {
      open,
      setOpen,
      editData,
      setEditData
    }) => {

  return (
      <S.Box
          open={open}
          onClose={() => setOpen(false)}
          maxWidth={false}
      >
        <DialogTitle>EDIT</DialogTitle>
        <S.Content>
          <header>编辑产品类别</header>
          <main>
            {editData.toString()}
          </main>
          <section></section>
        </S.Content>
      </S.Box>
  )
};

export default {
  EditModal
}
