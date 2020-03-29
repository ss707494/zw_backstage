import React, {useEffect} from "react"
import styled from "styled-components"
import {ProblemBox} from "@/views/DataConfig/ConfigHelpDocumentation/ProblemBox"
import {configHelpDocumentationModel} from "@/views/DataConfig/ConfigHelpDocumentation/model"
import {useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"

const Box = styled.div`
  display: grid;
  grid-template-rows: min-content min-content 1fr;
  justify-items: start;
  height: 100%;
`

export const ConfigHelpDocumentation = () => {
  const {state, actions} = useStoreModelByType__Graphql(configHelpDocumentationModel)
  const {actType} = state

  useEffect(()=>{
    actions.getTypeList()
  }, [actions])

  useEffect(() => {
    if (state?.typeList?.length && !actType.id) {
      actions.setActType(state?.typeList?.[0])
    }
  }, [actType.id, actions, state.typeList])

  return (
      <Box>
        <ProblemBox/>
      </Box>
  )
}

export default ConfigHelpDocumentation
