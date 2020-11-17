import React from "react"
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction"
import {configDataModel} from '@/views/DataConfig/List/model'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {styled, TextField} from '@material-ui/core'
import {CusButton} from '@/component/CusButton'
import {ImgUpload} from '@/component/ImgUpload'
import {fileUploadAjax, fpMerge, fpRemove, fpSet} from '@/common/utils'
import {AddressInfoDialog, AddressModal, AddressModalModel} from '@/views/DataConfig/ConfigSelfAddress/AddressModal'

interface SelfAddress extends AddressInfoDialog {
  id: string
  name: string
  imgUrl: string
  address: string
  phone: string
  openTime: string
  isDisabled: boolean
}

const Box = styled('div')({
  display: 'grid',
  gridTemplateColumns: '10fr 30fr repeat(3, 12fr)',
  '& > * ': {
    padding: 10,
  },
})
const Text = styled(TextField)({
  width: '98%',
})

const upload = async (file: any) => {
  return (await fileUploadAjax({}, [file], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
}

const EditAddressBox = styled('main')({
  display: 'grid',
  justifyItems: 'flex-start',
  alignContent: 'space-between',
})

export const ConfigSelfAddress = () => {
  const {actions: addressModalModelActions} = useStoreModelByType__Graphql(AddressModalModel)
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  const configValue = dataConfig.value
  const addOne = () => {
    actions.setDataConfig(fpMerge(configValue, {
      list: [
        ...configValue.list ?? [],
        {
          id: `${new Date().getTime()}`,
        } as SelfAddress,
      ],
    }))
  }
  const deleteOne = (index: number) => {
    actions.setDataConfig(fpMerge(configValue, {
      list: fpRemove(configValue.list, index),
    }))
  }
  const setEditData = (index: number) => (key: string) => (value: string | boolean) => {
    actions.setDataConfig(fpSet(configValue, ['list', index], oldValue => ({
      ...oldValue,
      [key]: value,
      updateTime: new Date().getTime(),
    })))
  }

  return (
      <div>
        <HeaderAction/>
        <Box>
          {['操作', '地址', '电话', '营业时间', '图片'].map(value => (<section key={`action_${value}`}>
            {value}
          </section>))}
          {configValue?.list?.map((item: SelfAddress, index: number) => (
              <React.Fragment key={`configValue_${index}`}>
                <main>
                  <CusButton
                      style={{marginRight: 8}}
                      variant={'outlined'}
                      onClick={() => deleteOne(index)}
                  >
                    删除
                  </CusButton>
                  <CusButton
                      color={item.isDisabled ? 'secondary' : 'primary'}
                      variant={'outlined'}
                      onClick={() => setEditData(index)('isDisabled')(!item.isDisabled)}
                  >
                    {item.isDisabled ? '启用' : '停用'}
                  </CusButton>
                </main>
                <EditAddressBox>
                  <section>
                    <header>{item.fullName}</header>
                    <main>{item.apartment} {item.streetAddress}</main>
                    <footer>{item.city} {item.province} {item.zip}</footer>
                  </section>
                  <CusButton
                      variant={'outlined'}
                      onClick={async () => {
                        const res = await addressModalModelActions.openClick({...item})
                        actions.setDataConfig(fpSet(configValue, ['list', index], preData => ({
                          ...preData,
                          ...res,
                          updateTime: new Date().getTime(),
                        })))
                        addressModalModelActions.onClose()
                      }}
                  >编辑地址</CusButton>
                </EditAddressBox>
                <main>
                  <Text
                      value={item.phone}
                      onChange={event => setEditData(index)('phone')(event.target.value)}
                  />
                </main>
                <main>
                  <Text
                      value={item.openTime}
                      onChange={event => setEditData(index)('openTime')(event.target.value)}
                  />
                </main>
                <main>
                  <ImgUpload
                      initSrc={item.imgUrl}
                      onChange={async (file: any) => {
                        setEditData(index)('imgUrl')(await upload(file))
                      }}
                  />
                </main>
              </React.Fragment>
          ))}
          <CusButton
              variant={'outlined'}
              onClick={() => addOne()}
          >新增</CusButton>
        </Box>
        <AddressModal/>
      </div>
  )
}
