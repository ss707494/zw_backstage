import React from "react"
import {useStore} from "@/common/context"
import {CusButton} from "@/component/CusButton"

export const testModel: ContextModel<{test: string}, {
  doTest: ActionFun,
}, {
  setTest: AsyncActionFun<{test: string}>
}> = {
  state: {test: 'ss'},
  actions: {
    doTest: (v, data) => {
      return {
        ...data,
        test: data.test + '::sss::'
      }
    },
  },
  asyncActions: {
    setTest: (value, setData) => {
      setData(() => ({test: 'sd'}))
    }
  },
}

export const StoreTest = () => {
  const {actions, store, state, dealStoreAction} = useStore('test', testModel)
  console.log(store)
  // dealStoreAction(actions.doTest)()


  return (
      <div>
        StoreTest
        {JSON.stringify(store)}
        {JSON.stringify(state)}
        <CusButton
            onClick={dealStoreAction(actions.doTest)}
        >
          doTest
        </CusButton>
      </div>
  )
}
