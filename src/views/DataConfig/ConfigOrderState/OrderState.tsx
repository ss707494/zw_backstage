import React from 'react'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {OrderState} from 'ss_common/enum'
import {isString} from 'lodash'
import {CusTextField} from '@/component/CusTextField'
import {HeaderAction} from '@/views/DataConfig/component/HeaderAction/HeaderAction'
import {configDataModel} from '@/views/DataConfig/List/model'

//  1 已下单， 2 已收款， 3 已配货， 4 已取货， 5 订单完成， 6 订单取消
export const ConfigOrderState = () => {
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state

  return (
      <div>
        <HeaderAction
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
              value={dataConfig?.value?.[value]}
              onChange={event => {
                actions.setDataConfig({
                  ...dataConfig.value,
                  [value]: event.target.value,
                })
              }}
          />)}
        </main>
      </div>
  )
}
