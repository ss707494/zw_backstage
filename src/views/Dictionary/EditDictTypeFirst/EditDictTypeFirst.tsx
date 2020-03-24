import React from 'react'
import {mergeModel} from '@/common/ModelAction/modelUtil'
import {modalModelFactory} from '@/common/model/modal'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {Dialog, DialogContent, TextField} from '@material-ui/core'
import {CusButton} from '@/component/CusButton'
import {DictTypeFirst} from '@/common/graphqlTypes/types'
import {saveDictTypeFirstDco} from '@/common/graphqlTypes/graphql/doc'
import {showMessage} from '@/component/Message'
import {fpMergePre} from '@/common/utils'
import {pick} from 'lodash'

export const editDictTypeFirstModel = mergeModel(modalModelFactory('editDictTypeFirstModel', {
  name: '',
  code: '',
  verification: '',
}), 'dictTypeFirs', {
  refresh: Function,
}, {
  setRefresh: (value, option) => option.setData(fpMergePre({refresh: value})),
  addOneDictTypeFirst: async (value: DictTypeFirst, option) => {
    return await option.mutate(saveDictTypeFirstDco, [value])
  },
})

export const EditDictTypeFirstModal = () => {
  const {state, actions, getLoad} = useStoreModelByType__Graphql(editDictTypeFirstModel)
  const {modalData} = state

  return (
      <Dialog
          open={state.open}
          onClose={() => actions.onClose({})}
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
              value={modalData.code}
              onChange={e => {
                actions.setModal({
                  code: e.target.value,
                })
              }}
          />
          <footer>
            <CusButton
                loading={getLoad(saveDictTypeFirstDco)}
                color="primary"
                variant="contained"
                fullWidth
                onClick={async () => {
                  if (modalData.verification !== 'dw123') {
                    return showMessage({message: '验证码错误', msg_type: 'error'})
                  }
                  if (await actions.addOneDictTypeFirst(pick(modalData, ['name', 'code']))) {
                    showMessage({message: '操作成功'})
                    actions.onClose({})
                    state.refresh()
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
