import React from "react"
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {configDataModel} from '@/views/DataConfig/List/model'
import {CusButton} from '@/component/CusButton'
import {fpRemove, fpSet} from '@/common/utils'
import {useParams} from 'react-router-dom'
import {showConfirm} from '@/component/ConfirmDialog'
import styled from 'styled-components'
import {grey} from '@material-ui/core/colors'
import {AddType, addTypeModalModel} from '@/views/DataConfig/ConfigHelpDocumentationType/AddType'

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 520px));
  > * {
    padding: 8px;
    display: grid;
    align-items: center;
    border: 1px solid ${grey[200]};
    margin-right: -1px;
    margin-bottom: -1px;
  }
  > header {
    border: 0;
    grid-column: 1 / 5;
    justify-self: start;
  }

`
export const ConfigHelpType = () => {
  const routerParams = useParams<any>()
  const activeCode = routerParams?.dictType
  const {state: configState, actions: configActions} = useStoreModelByType__Graphql(configDataModel)
  const {value} = configState?.dataConfig ?? {}
  const {actions: addTypeModalModelActions} = useStoreModelByType__Graphql(addTypeModalModel)


  const changeSort = async ({index, type}: { index: number, type: number }) => {
    const curData = value?.typeList?.[index]
    const changeData = value?.typeList?.[index + type]
    if (curData && changeData) {
      configActions.setDataConfig(fpSet(value, ['typeList'], preData => fpSet(fpSet(preData, [index + type], {
        ...changeData,
        sort: curData.sort,
      }), [index], {
        ...curData,
        sort: changeData.sort,
      })))
      await configActions.saveDataConfig()
      await configActions.getDataConfig(activeCode)
    }
  }
  const deleteOne = ({index}: { index: number }) => {
    showConfirm({
      message: `确定删除吗?`,
      callBack: async (res) => {
        if (!res) return
        configActions.setDataConfig(fpSet(value, ['typeList'], preData => fpRemove(preData, index)))
        await configActions.saveDataConfig()
        await configActions.getDataConfig(activeCode)
      },
    })
  }

  return (
      <Box>
        <header>
          <CusButton
              variant={"outlined"}
              onClick={async () => {
                const res = await addTypeModalModelActions.openClick({})
                if (res) {
                  configActions.setDataConfig(fpSet(value, ['typeList'], preData => [
                    ...preData ?? [],
                    {...res, id: `${new Date().getTime()}`},
                  ]))
                  await configActions.saveDataConfig()
                  await configActions.getDataConfig(activeCode)
                  addTypeModalModelActions.onClose()
                }
              }}
          >添加分类</CusButton>
        </header>
        {['操作', '名称', '序号', '排序'].map(value => <div
            key={`${value}`}
            style={{textAlign: 'center'}}
        >{value}</div>)}
        {value?.typeList?.sort((a: any, b: any) => (a?.sort - b?.sort))?.map((v: DictType, index: number) => (
            <React.Fragment key={`problemList.map_${v.id}`}>
              <aside>
                <CusButton
                    variant={"outlined"}
                    color={"primary"}
                    onClick={() => deleteOne({index})}
                >删除</CusButton>
                <CusButton
                    variant={"outlined"}
                    onClick={async () => {
                      const res = await addTypeModalModelActions.openClick({...v})
                      if (res) {
                        configActions.setDataConfig(fpSet(value, ['typeList', index], preData => ({
                          ...preData,
                          ...res,
                        })))
                        await configActions.saveDataConfig()
                        await configActions.getDataConfig(activeCode)
                        addTypeModalModelActions.onClose()
                      }
                    }}
                >编辑</CusButton>
              </aside>
              <section><span>{v?.name}</span></section>
              <section><span>{v?.sort}</span></section>
              <section>
                <CusButton
                    onClick={() => changeSort({index, type: -1})}
                >上移</CusButton>
                <CusButton
                    onClick={() => changeSort({index, type: 1})}
                >下移</CusButton>
              </section>
            </React.Fragment>))}
        <AddType/>
      </Box>
  )
}

export default ConfigHelpType
