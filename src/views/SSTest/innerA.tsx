import React from "react"
import {RenderTimer} from "@/component/RenderTimer/RenderTimer"
import {CusButton} from "@/component/CusButton"
import {tModel} from "@/views/SSTest/innerB"
import {ModuleEnum, useStoreModel} from "@/common/ModelAction/useStore"

export const InnerA = () => {
  const {state} = useStoreModel(ModuleEnum.Test, tModel)
  const {state: state2, actions: actions2} = useStoreModel(ModuleEnum.Test, tModel)

  return (
      <div>
        <header>innerA</header>
        <span>count: {state.count}</span>
        <header>innerA: state2</header>
        <span>count2: {state2.count}</span>
        <CusButton
            onClick={() => actions2.addOne({ss: '123'})}
        >addModelCon2</CusButton>
        {/*<span>count: {testM.state.countA}</span>*/}
        {/*<CusButton*/}
        {/*    onClick={() => testM.handleAction(testM.actions.addOne)()}*/}
        {/*>addModel</CusButton>*/}
        {/*<span>count: {testCount}</span>*/}
        {/*<CusButton*/}
        {/*    onClick={() => setCount(prevState => prevState + 1)}*/}
        {/*>add</CusButton>*/}
        <RenderTimer/>
      </div>
  )
}
