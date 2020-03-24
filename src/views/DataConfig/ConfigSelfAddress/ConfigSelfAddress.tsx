import React from "react"
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction"
import {configDataModel} from '@/views/DataConfig/List/model'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {styled, TextareaAutosize} from '@material-ui/core'
import {CusButton} from '@/component/CusButton'
import {ImgUpload} from '@/component/ImgUpload'
import {fileUploadAjax, fpMerge, fpRemove, fpSet} from '@/common/utils'

interface SelfAddress {
  name: string
  imgUrl: string
  address: string
  phone: string
  openTime: string
}

const Box = styled('div')({
  display: 'grid',
  gridTemplateColumns: '10fr 10fr 8fr repeat(3, 12fr)',
  '& > * ': {
    padding: 10,
  },
})
const Text = styled(TextareaAutosize)({
  width: '98%',
})

const upload = async (file: any) => {
  return (await fileUploadAjax({}, [file], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
}

export const ConfigSelfAddress = () => {
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  console.log(actions)
  console.log(dataConfig)
  const configValue = dataConfig.value
  const addOne = () => {
    actions.setDataConfig(fpMerge(configValue, {
      list: [
        ...configValue.list ?? [],
        {} as SelfAddress,
      ],
    }))
  }
  const deleteOne = (index: number) => {
    actions.setDataConfig(fpMerge(configValue, {
      list: fpRemove(configValue.list, index),
    }))
  }
  const setEditData = (index: number) => (key: string) => (value: string) => {
    actions.setDataConfig(fpSet(configValue, ['list', index, key], value))
  }

  return (
      <div>
        <HeaderAction/>
        <Box>
          {['操作', '名称', '图片', '地址', '电话', '营业时间'].map(value => (<section key={`action_${value}`}>
            {value}
          </section>))}
          {configValue?.list?.map((item: SelfAddress, index: number) => (
              <React.Fragment key={`configValue_${index}`}>
                <main>
                  <CusButton
                      variant={'outlined'}
                      onClick={() => deleteOne(index)}
                  >
                    删除
                  </CusButton>
                </main>
                <main>
                  <Text
                      rows={6}
                      value={item.name}
                      onChange={event => setEditData(index)('name')(event.target.value)}
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
                <main>
                  <Text
                      rows={6}
                      value={item.address}
                      onChange={event => setEditData(index)('address')(event.target.value)}
                  />
                </main>
                <main>
                  <Text
                      rows={6}
                      value={item.phone}
                      onChange={event => setEditData(index)('phone')(event.target.value)}
                  />
                </main>
                <main>
                  <Text
                      rows={6}
                      value={item.openTime}
                      onChange={event => setEditData(index)('openTime')(event.target.value)}
                  />
                </main>
              </React.Fragment>
          ))}
          <CusButton
              variant={'outlined'}
              onClick={() => addOne()}
          >新增</CusButton>
        </Box>
      </div>
  )
}
