import {CusButton} from "@/component/CusButton"
import React from "react"
import styled from "styled-components"
import {grey} from "@material-ui/core/colors"
import {EditProblem, editProblemModel} from "@/views/DataConfig/ConfigHelpDocumentation/EditProblem"
import {configHelpDocumentationModel} from "@/views/DataConfig/ConfigHelpDocumentation/model"
import {useStoreModel, useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {configDataModel} from '@/views/DataConfig/List/model'
import {fpRemove, fpSet} from '@/common/utils'
import {showConfirm} from '@/component/ConfirmDialog'
import { useParams } from "react-router-dom"

const ProblemBoxStyle = styled.div`
  display: grid;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid ${grey[200]};
  grid-template-columns: max-content repeat(4, minmax(120px, 520px));
  > * {
    padding: 8px;
    display: grid;
    align-items: center;
    border: 1px solid ${grey[200]};
    margin-right: -1px;
    margin-bottom: -1px;
  }
  > aside {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
  }
  > section {
    padding: 8px 16px;
    > span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  > footer {
    border: 0;
  }

`

export const ProblemBox = () => {
  const routerParams = useParams<any>()
  const activeCode = routerParams?.dictType

  const {state: configState, actions: configActions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = configState

  const {state} = useStoreModel(configHelpDocumentationModel)
  const actType = state.actType
  const {actions} = useStoreModel(editProblemModel)

  const problemList: Problem[] = dataConfig.value?.problemListData?.[actType.code] ?? []

  const addOne = () => {
    actions.openClick({})
  }
  const editOne = (item: any) => {
    actions.openClick(item)
  }
  const deleteOne = ({index}: {index: number}) => {
    showConfirm({
      message: `确定删除吗?`,
      callBack: async (res) => {
        if (!res) return
        configActions.setDataConfig(fpSet(dataConfig.value, ['problemListData', actType.code], preData => fpRemove(preData, index)))
        await configActions.saveDataConfig()
        await configActions.getDataConfig(activeCode)
      }
    })
  }
  const changeSort = async ({index, type}: { index: number, type: number }) => {
    const curData = dataConfig.value?.problemListData?.[actType.code]?.[index]
    const changeData = dataConfig.value?.problemListData?.[actType.code]?.[index + type]
    if (curData && changeData) {
      configActions.setDataConfig(fpSet(dataConfig.value, ['problemListData', actType.code], preData => fpSet(fpSet(preData, [index + type], {
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

  return (
      <ProblemBoxStyle>
        {['操作', '问题', '答案', '序号', '排序'].map(value => <div
            key={`${value}`}
            style={{textAlign: 'center'}}
        >{value}</div>)}
        {problemList.sort((a, b) => a.sort - b.sort).map((v, index) => (<React.Fragment key={`problemList.map_${v.answer}`}>
          <aside>
            <CusButton
                variant={"outlined"}
                color={"primary"}
                onClick={() => deleteOne({index})}
            >删除</CusButton>
            <CusButton
                variant={"outlined"}
                onClick={() => editOne({...v, index})}
            >编辑</CusButton>
          </aside>
          <section><span>{v?.problem}</span></section>
          <section><span>{v?.answer}</span></section>
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
        <footer>
          <CusButton
              variant={"outlined"}
              onClick={addOne}
          >添加问题</CusButton>
        </footer>
        <EditProblem
        />
      </ProblemBoxStyle>
  )
}
