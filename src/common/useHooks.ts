import {SetStateAction, useState} from "react"

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

export const useModelState = <T, E, Y>(model: ModelData<T, E>): ModelResult<T, E> => {
  const {state: modelState, actions} = model
  const [state, setState] = useState(modelState) as [T, ModelDispatch<SetStateAction<T>>]
  const handleAction: HandleAction<T> = action => (value?: any) => {
    return action(value, setState, {})
  }

  return {
    state,
    actions,
    handleAction,
  }
}
