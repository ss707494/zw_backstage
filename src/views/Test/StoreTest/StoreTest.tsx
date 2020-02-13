import React, {useEffect} from "react"
import {useGetLoad, useStore} from "@/common/context"
import {CusButton} from "@/component/CusButton"
import {gql} from "apollo-boost"
import {getDataConfigGraphql} from "@/views/DataConfig/configGroup"

const queryTest = gql`
    query {
        test
    }
`

export const testModel: ContextModel<{test: string}, {
  doTest: ActionFun,
}, {
  setTest: AsyncActionFun<{test: string}>,
  asyncWait: AsyncActionFun,
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
    },
    asyncWait: async (value, setData, {query}) => {
      await query(queryTest)

      console.log('queryTest')
    },
  },
}

export const StoreTest = () => {
  const loadObj = useGetLoad()
  const {actions, store, state, dealStoreAction, dealActionAsync, asyncActions} = useStore('test', testModel)
  console.log(queryTest)
  console.log(getDataConfigGraphql)
  console.log(loadObj.getData(queryTest))
  // dealStoreAction(actions.doTest)()

  useEffect(() => {
    dealActionAsync(asyncActions.asyncWait)()
  }, [asyncActions.asyncWait, dealActionAsync])

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
        <div>
          {loadObj.getData(queryTest)}
          {JSON.stringify(loadObj)}
          <CusButton
              onClick={dealActionAsync(asyncActions.asyncWait)}
          >
            asyncWait
          </CusButton>
        </div>
      </div>
  )
}
