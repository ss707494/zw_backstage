import React from "react"
import {RenderTimer} from "@/component/RenderTimer/RenderTimer"
import {CusButton} from "@/component/CusButton"
import {delay, fpSet} from "@/common/utils"
import {gql} from "apollo-boost"
import {mergeModel, modelFactory} from "@/common/ModelAction/modelUtil"
import {useModelState} from "@/common/useHooks"

const testQuery = gql`
    query{
        test
    }
`
export const tModel = modelFactory('tModel', {
  count: 0,
}, {
  addOne: (data: {ss: string}, notice) => {
    console.log(notice.data)
    notice.setData(fpSet(notice.data, 'count', preData => preData + 1))
  },
  addOneAsync: async (value, option) => {
    console.log(option.store)
    await delay(1000)
    option.setData(fpSet(option.data, 'count', preData => preData + 1))
  },
  testQuery: async (value, option) => {
    const res = await option.query(testQuery, {})
    console.log(res)
    console.log(option.store['rest'])
    option.store['rest'].actions.addOne({ss: '123'})
  },
})
const mergerM = mergeModel(tModel, 'mergeM', {
  slkdfj: 'sdlfkj'
}, {
})

export const InnerB = () => {
  // const {state, actions} = useStoreModel('rest', mergerM)
  const {state, actions} = useModelState(mergerM)
  // sldkfj
  // const [, act] = useGlobal(React, {}, {ss: () => {}})()


  return (
      <div>
        <span>innerB</span>
        <span>{state.count}</span>
        <CusButton
            onClick={() => actions.addOne({ss: ''})}
        >
          addSModel
        </CusButton>
        <CusButton
            onClick={() => actions.addOneAsync({ss: ''})}
        >
          addSModelAsync
        </CusButton>
        <div>
          <span>testQueryLoad:: {JSON.stringify(state.fetchLoad[testQuery])}</span>
          <CusButton
              onClick={() => actions.testQuery({ss: ''})}
          >
            testQuery
          </CusButton>
        </div>
        {/*<header>innerB</header>*/}
        {/*<span>count: {testM.state.countB}</span>*/}
        {/*<span>setN State: {state.count}</span>*/}
        {/*<CusButton*/}
        {/*    onClick={() => state.count = state.count + 1}*/}
        {/*>*/}
        {/*  add setN*/}
        {/*</CusButton>*/}
        {/*<CusButton*/}
        {/*    onClick={() => setN({})}*/}
        {/*>*/}
        {/*  setN*/}
        {/*</CusButton>*/}
        <RenderTimer/>
      </div>
  )
}
