import {Dialog, DialogContent, TextField} from '@material-ui/core'
import React from 'react'
import {mergeModel} from '@/common/ModelAction/modelUtil'
import {modalModelFactory} from '@/common/model/modal'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {CusButton} from '@/component/CusButton'
import {saveDataConfig} from '@/common/graphqlTypes/graphql/doc'
import {showMessage} from '@/component/Message'
import {omit} from 'lodash'

export const addOneConfigModalModel = mergeModel(modalModelFactory('AddOneConfig', {
  name: '',
  type: '',
  value: {},
  remark: '',
  verification: '',
}), 'AddOneConfigModalModel', {}, {
  addOne: async (value, option) => {
    return await option.mutate(saveDataConfig, {
      ...omit(option.data.modalData, ['verification']),
    })
  },
})

export const AddOneConfigModal = () => {
  const {state, actions} = useStoreModelByType__Graphql(addOneConfigModalModel)
  const {modalData} = state

  return (
      <Dialog
          open={state.open}
          onClose={() => actions.onClose()}
      >
        <DialogContent>
          <TextField
              fullWidth
              label={'验证码'}
              value={modalData.verification}
              onChange={e => {
                actions.setModal({
                  verification: e.target.value,
                })
              }}
          />
          <TextField
              fullWidth
              label={'名称'}
              value={modalData.name}
              onChange={e => {
                actions.setModal({
                  name: e.target.value,
                })
              }}
          />
          <TextField
              fullWidth
              label={'code'}
              value={modalData.type}
              onChange={e => {
                actions.setModal({
                  type: e.target.value,
                })
              }}
          />
          <footer
              style={{marginTop: '20px'}}
          >
            <CusButton
                color="primary"
                variant="contained"
                fullWidth
                onClick={async () => {
                  if (modalData.verification !== 'dw123') {
                    return showMessage({message: '验证码错误', msg_type: 'error'})
                  }
                  if (await actions.addOne()) {
                    showMessage({message: '操作成功'})
                    actions.onClose({})
                  }
                }}
            >
              保存
            </CusButton>
          </footer>
        </DialogContent>
      </Dialog>
  )
}
