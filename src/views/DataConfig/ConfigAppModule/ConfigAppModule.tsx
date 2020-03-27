import {HeaderAction} from '@/views/DataConfig/component/HeaderAction/HeaderAction'
import React from 'react'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {configDataModel} from '@/views/DataConfig/List/model'
import {Checkbox, FormControlLabel} from '@material-ui/core'
import {fpSet} from '@/common/utils'

const list = [
  ['限时选购', 'limitTime'],
  ['热销排行', 'salesRank'],
  ['主题甄选', 'themeSelection'],
  ['猜你喜欢', 'mayLike'],
  ['冲线排行', 'lineRanking'],
  ['热门排行', 'topRanking'],
]
export const ConfigAppModule = () => {
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  const {value} = dataConfig

  return (
      <div>
        <HeaderAction/>
        <main>
          {list.map(item => <FormControlLabel
              key={`ConfigApp_${item[1]}`}
              label={item[0]}
              control={<Checkbox
                  checked={value?.[item[1]] ?? false}
                  onChange={(e) => {
                    actions.setDataConfig(fpSet(value, [item[1]], preData => !preData))
                  }}
                  name="checkedA"
              />}
          />)}

        </main>
      </div>
  )
}
