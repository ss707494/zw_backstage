import React from "react";
import {Dialog, DialogTitle} from "@material-ui/core";
import {S} from "./style";
import {CusTextField} from "@/component/CusTextField";
import {CusButton} from "@/component/CusButton";
import {useMutationGraphql} from "@/component/ApolloQuery";
import {saveDictItemGraphql} from "@/views/Dictionary/List/dictionaryGraphql";
import {parseFloatForInput} from "@/common/utils";

export const DictAddModal = (
    {
      open,
      setOpen,
      modalData,
      setModalData,
      refresh,
    }: CommonModalState) => {
  const handleClose = () => {
    setOpen(false)
    refresh()
  }
  const [saveDictItem, , updateLoading] = useMutationGraphql(saveDictItemGraphql)

  const handleSave = async () => {
    const res = await saveDictItem({
      data: {
        ...modalData,
      }
    })
    if (res?.save_dict_item?.flag) {
      handleClose()
    }
  }
  return (
      <Dialog
          open={open}
          onClose={handleClose}
      >
        <DialogTitle>添加字典</DialogTitle>
        <S.Content>
          <form>
            <CusTextField
                label="名称"
                value={modalData.name}
                onChange={(e: any) => setModalData({
                  ...modalData,
                  name: (e.target.value)
                })}
            />
            <CusTextField
                label="code"
                value={modalData.code}
                onChange={(e: any) => setModalData({
                  ...modalData,
                  code: (e.target.value)
                })}
            />
            <CusTextField
                label="排序"
                value={modalData.sort}
                onChange={(e: any) => setModalData({
                  ...modalData,
                  sort: parseFloatForInput(e.target.value)
                })}
            />
            <CusButton
                loading={updateLoading ? 1 : 0}
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleSave}
            >
              保存
            </CusButton>
          </form>
        </S.Content>
      </Dialog>
  )
}

export default DictAddModal
