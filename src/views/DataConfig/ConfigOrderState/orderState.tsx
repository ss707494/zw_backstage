import React, {useEffect} from 'react'
import {modelFactory} from '@/common/ModelAction/modelUtil'
import {useStoreModel} from '@/common/ModelAction/useStore'
import {OrderState} from 'ss_common/enum'
import {fpMergePre} from '@/common/utils'
import {isString} from 'lodash'
import {CusTextField} from '@/component/CusTextField'
import {HeaderAction} from '@/views/DataConfig/component/HeaderAction/HeaderAction'

//  1 已下单， 2 已收款， 3 已配货， 4 已取货， 5 订单完成， 6 订单取消
const orderStateModel = modelFactory('orderStateModel', {
  configData: {} as { [key: string]: string },
}, {
  setConfigData: (value, options) => options.setData(fpMergePre({configData: value})),
})

export const ConfigOrderState = ({dataConfig = {}}: any) => {
  const {state, actions} = useStoreModel(orderStateModel)
  useEffect(() => {
    if (dataConfig?.value) {
      actions.setConfigData(dataConfig.value)
    }
  }, [actions, actions.setConfigData, dataConfig.value])

  return (
      <div>
        <HeaderAction
            dataConfig={dataConfig}
            configData={state.configData}
        />
        <header>设置订单状态</header>
        <main
            style={{
              marginTop: 20,
              maxWidth: '500px',
            }}
        >
          {Object.values(OrderState).filter(value => isString(value)).map(value => <CusTextField
              key={`OrderState_${value}`}
              label={value}
              value={state.configData[value]}
              onChange={event => {
                actions.setConfigData({
                  ...state.configData,
                  [value]: event.target.value,
                })
              }}
          />)}
        </main>
      </div>
  )
}
