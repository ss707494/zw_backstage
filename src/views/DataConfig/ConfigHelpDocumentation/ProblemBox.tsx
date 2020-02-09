import {CusButton} from "@/component/CusButton"
import React from "react"
import styled from "styled-components"
import {grey} from "@material-ui/core/colors"
import {EditProblem, EditProblemNamespace} from "@/views/DataConfig/ConfigHelpDocumentation/EditProblem"
import {
  dealNameSpace,
  ModuleEnum,
  useStore
} from "@/common/context"
import {modalModel} from "@/common/model/modal"
import {configHelpDocumentationModel} from "@/views/DataConfig/ConfigHelpDocumentation/model"

const ProblemBoxStyle = styled.div`
  display: grid;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid ${grey[200]};
  grid-template-columns: repeat(4, 1fr);
  align-items: center;

`

export const ProblemBox = () => {
  const {state} = useStore(ModuleEnum.ConfigHelpDocumentation, configHelpDocumentationModel)
  const configData = state
  const actType = configData.actType
  const {dealStoreAction: dealStoreActionEdit} = useStore(dealNameSpace(ModuleEnum.ConfigHelpDocumentation, EditProblemNamespace), modalModel)

  const problemList = configData?.problemListData?.[actType.code] ?? []
  const addOne = () => {
    dealStoreActionEdit(modalModel.actions.openClick)({})
  }
  return (
      <ProblemBoxStyle>
        {problemList.map((v: Problem) => (<React.Fragment key={`problemList.map_${v.answer}`}>
          <aside>
            <CusButton
                variant={"outlined"}
                onClick={() => {
                }}
            >编辑问题</CusButton>
          </aside>
          <section>{v?.problem}</section>
          <section>{v?.answer}</section>
          <section>{v?.sort}</section>
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
