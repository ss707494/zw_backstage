import {Dialog, DialogContent, MenuItem, TextField} from '@material-ui/core'
import React from 'react'
import {mergeModel} from '@/common/ModelAction/modelUtil'
import {modalModelFactory} from '@/common/model/modal'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {fpMerge} from '@/common/utils'
import {CusButton} from '@/component/CusButton'
import styled from 'styled-components'


const provinceData = [
  ['AL', 'Alabama'],
  ['AK', 'Alaska'],
  ['AZ', 'Arizona'],
  ['AR', 'Arkansas'],
  ['CA', 'California'],
  ['CO', 'Colorado'],
  ['CT', 'Connecticut'],
  ['DE', 'Delaware'],
  ['DC', 'District Of Columbia'],
  ['FL', 'Florida'],
  ['GA', 'Georgia'],
  ['HI', 'Hawaii'],
  ['ID', 'Idaho'],
  ['IL', 'Illinois'],
  ['IN', 'Indiana'],
  ['IA', 'Iowa'],
  ['KS', 'Kansas'],
  ['KY', 'Kentucky'],
  ['LA', 'Louisiana'],
  ['ME', 'Maine'],
  ['MD', 'Maryland'],
  ['MA', 'Massachusetts'],
  ['MI', 'Michigan'],
  ['MN', 'Minnesota'],
  ['MS', 'Mississippi'],
  ['MO', 'Missouri'],
  ['MT', 'Montana'],
  ['NE', 'Nebraska'],
  ['NV', 'Nevada'],
  ['NH', 'New Hampshire'],
  ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'],
  ['NY', 'New York'],
  ['NC', 'North Carolina'],
  ['ND', 'North Dakota'],
  ['OH', 'Ohio'],
  ['OK', 'Oklahoma'],
  ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'],
  ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'],
  ['SD', 'South Dakota'],
  ['TN', 'Tennessee'],
  ['TX', 'Texas'],
  ['UT', 'Utah'],
  ['VT', 'Vermont'],
  ['VA', 'Virginia'],
  ['WA', 'Washington'],
  ['WV', 'West Virginia'],
  ['WI', 'Wisconsin'],
  ['WY', 'Wyoming'],
]

export interface AddressInfoDialog {
  fullName: string
  streetAddress: string
  apartment: string
  city: string
  province: string
  zip: string
}

type ResolverFun = (addressInfoDialog: AddressInfoDialog) => any

const Content = styled(DialogContent)`
  > main {
    margin-bottom: 10px;
    > .MenuLayout-MuiFormControl-root {
      margin-bottom: 10px;
    }
  }
`

export const AddressModalModel = mergeModel(modalModelFactory('address', {
  fullName: '', zip: '',
  apartment: '', city: '',
  province: '', streetAddress: '',
} as AddressInfoDialog), 'addressModal', {
  resolve: (() => {
  }) as ResolverFun,
}, {
  openClickPromise: (value, option) => {
    return new Promise(resolve => {
      option.setData(preData => fpMerge(preData, {
        open: true,
        modalData: value,
        isEdit: -1,
        resolve: resolve,
      }))
    })
  },

})

export const AddressModal = () => {
  const {state, actions} = useStoreModelByType__Graphql(AddressModalModel)
  const {modalData} = state

  return (
      <Dialog
          open={state.open}
          onClose={() => actions.onClose()}
      >
        <Content>
          <main>
            <TextField
                fullWidth
                label={'Full name'}
                value={modalData.fullName}
                onChange={e => actions.setModal({fullName: e.target.value})}
            />
            <TextField
                fullWidth
                label={'Street Address'}
                value={modalData.streetAddress}
                onChange={e => actions.setModal({streetAddress: e.target.value})}
            />
            <TextField
                fullWidth
                label={'Apartment'}
                value={modalData.apartment}
                onChange={e => actions.setModal({apartment: e.target.value})}
            />
            <TextField
                fullWidth
                label={'City'}
                value={modalData.city}
                onChange={e => actions.setModal({city: e.target.value})}
            />
            <TextField
                select
                fullWidth
                label={'Province'}
                value={modalData.province}
                onChange={e => actions.setModal({province: e.target.value})}
            >
              {provinceData.map(item => <MenuItem
                  key={`provinceData_${item[0]}`}
                  value={item[1]}>
                {item[1]}
              </MenuItem>)}
            </TextField>
            <TextField
                fullWidth
                label={'Zip'}
                value={modalData.zip}
                onChange={e => actions.setModal({zip: e.target.value})}
            />
          </main>
          <footer>
            <CusButton
                fullWidth
                variant={"contained"}
                onClick={async () => {
                  await state.resolve(modalData)
                }}
            >保存</CusButton>
          </footer>
        </Content>
      </Dialog>
  )
}
