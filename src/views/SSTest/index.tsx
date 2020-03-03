import React from 'react'

const SsTest = () => {

  return (
      <div>ss</div>
  )
}

export default {
  props: {
    path: process.env.REACT_APP_PRE_ROUTE + '/test',
    component: SsTest,
  },
}
