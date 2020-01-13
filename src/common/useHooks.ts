import {useState} from "react";

export const useCommonModalState:() => CommonModalState = () => {
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const openClick = (data: object) => async () => {
    setModalData(data)
    setOpen(true)
  }

  return {
    open,
    setOpen,
    modalData,
    setModalData,
    openClick,
  }
}
