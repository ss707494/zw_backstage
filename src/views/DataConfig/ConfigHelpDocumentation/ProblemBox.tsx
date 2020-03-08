import {CusButton} from "@/component/CusButton"
import React from "react"
import styled from "styled-components"
import {grey} from "@material-ui/core/colors"
import {EditProblem} from "@/views/DataConfig/ConfigHelpDocumentation/EditProblem"
import {modalModelFactory} from "@/common/model/modal"
import {configHelpDocumentationModel} from "@/views/DataConfig/ConfigHelpDocumentation/model"
import {useStoreModel} from "@/common/ModelAction/useStore"

const ProblemBoxStyle = styled.div`
  display: grid;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid ${grey[200]};
  grid-template-columns: max-content repeat(3, minmax(120px, 520px));
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
  const {state} = useStoreModel(configHelpDocumentationModel)
  const configData = state
  const actType = configData.actType
  const {actions} = useStoreModel(modalModelFactory('ConfigHelpDocumentation', {}))

  const problemList: Problem[] = configData.problemListData?.[actType.code] ?? []

  const addOne = () => {
    (actions.openClick)({})
  }
  const editOne = (item: any) => {
    (actions.openClick)(item)
  }
  return (
      <ProblemBoxStyle>
        {problemList.map((v, index) => (<React.Fragment key={`problemList.map_${v.answer}`}>
          {['操作', '问题', '答案', '排序'].map(value => <div
              key={`${value}`}
              style={{textAlign: 'center'}}
          >{value}</div>)}
          <aside>
            <CusButton
                variant={"outlined"}
                color={"primary"}
                onClick={() => editOne({...v, index})}
            >删除</CusButton>
            <CusButton
                variant={"outlined"}
                onClick={() => editOne({...v, index})}
            >编辑</CusButton>
          </aside>
          <section><span>{v?.problem}</span></section>
          <section><span>{v?.answer}</span></section>
          <section><span>{v?.sort}</span></section>
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
