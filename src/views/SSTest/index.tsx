import React from 'react'
import {RenderTimer} from "@/component/RenderTimer/RenderTimer"
import {InnerA} from "@/views/SSTest/innerA"
import {InnerB} from "@/views/SSTest/innerB"

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
