import {Dialog, DialogContent, TextField} from "@material-ui/core"
import React from "react"
import {CusButton} from "@/component/CusButton"
import styled from "styled-components"
import {mergeModel} from '@/common/ModelAction/modelUtil'
import {modalModelFactory} from '@/common/model/modal'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {configDataModel} from '@/views/DataConfig/List/model'
import {saveDataConfig} from '@/common/graphqlTypes/graphql/doc'

const DialogContentBox = styled(DialogContent)`
  & .MenuLayout-MuiFormControl-root{
    margin-bottom: 20px;
  } 
`

export const addTypeModalModel = mergeModel(modalModelFactory('AddType', {
  id: '',
  name: '',
  sort: '',
  code: '',
}), 'AddType', {

}, {

})

export const AddType = () => {
  const {getLoad} = useStoreModelByType__Graphql(configDataModel)
  const {actions: addTypeModalModelActions, state: addTypeModalModelState} = useStoreModelByType__Graphql(addTypeModalModel)
  const {open, modalData, openResolve} = addTypeModalModelState
  const {onClose, setModal} = addTypeModalModelActions

  return (
      <Dialog
          open={open}
          onClose={()=>onClose()}
      >
        <DialogContentBox>
          <TextField
              fullWidth
              color={"secondary"}
              label={'名称'}
              value={modalData?.name}
              onChange={e => setModal({name: e.target.value})}
          />
          <TextField
              fullWidth
              color={"secondary"}
              label={'code'}
              value={modalData?.code}
              onChange={e => setModal({code: e.target.value})}
          />
          <TextField
              fullWidth
              color={"secondary"}
              label={'排序'}
              value={modalData?.sort}
              onChange={e => setModal({sort: e.target.value})}
          />
          <CusButton
              loading={getLoad(saveDataConfig)}
              color="primary"
              variant="contained"
              fullWidth
              onClick={()=>{
                openResolve(modalData)
              }}
          >
            保存
          </CusButton>
        </DialogContentBox>
      </Dialog>
  )
}
