import React from 'react'
import {RenderTimer} from "@/component/RenderTimer/RenderTimer"
import {InnerA} from "@/views/SSTest/innerA"
import {InnerB} from "@/views/SSTest/innerB"

// type AddName<N = ''> = <T>(name: string, obj: T) => {[N + k in keyof T]: any}

// const addName = (name: string, obj: HelpObj): {ss: any} => {
//   return Object.keys(obj).reduce((previousValue, currentValue) => ({
//       ...previousValue,
//     [currentValue + name]: obj[currentValue],
//   }), {})
// }
//
// addName('ss', obj)

// const dealNameModel = <N, T, E extends HelpObj<ModelAction<any, T>>>(name:string, model: ModelData<T, E>): {
//   state: {
//     [key in (keyof T)]: T[key]
//   }
// } => {
//
//   return {
//     // state: _.mapKeys(model.state, (v, k) => k + name)
//   }
// }

// dealNameModel('ss', model).state

const SsTest = () => {

  return (
      <div>
        <RenderTimer/>
        <InnerA/>
        <InnerB/>
      </div>
  )
}

export default {
  props: {
    path: process.env.REACT_APP_PRE_ROUTE + '/test',
    component: SsTest,
  },
}
