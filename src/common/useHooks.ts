import {useState} from "react"
import {baseActionOption} from "@/common/ModelAction/modelUtil"

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

export const useModelState = <T extends FetchObj, E extends HelpObj<ModelAction<any, T>>, Y>(model: ModelData<T, E>): ModelResult<T, E> => {
  const {state: modelState, actions} = model
  const [state, setState] = useState(modelState)

  const newActions = Object.keys(actions).reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue]: async (v: any) => actions[currentValue](v, {
        ...baseActionOption,
        data: state,
        notice: setState,
        setData: setState,
      })
    }
  }, {}) as DealFunObj<typeof actions>

  return {
    state,
    actions: newActions,
  }
}
