import React, {useEffect} from "react"
import {ModuleEnum, useStore} from "@/common/context"
import {Checkbox, Dialog, DialogActions, DialogContent} from "@material-ui/core"
import {fpMerge, fpSet} from "@/common/utils"
import {productGraphql} from "@/views/Product/List/productGraphql"
import styled from "styled-components"
import {CusButton} from "@/component/CusButton"
import {modelFactory} from "@/common/ModelAction/modelUtil"

export const selectProductModel = modelFactory({
  open: false,
  list: [],
  selectList: [] as string[],
  index: -1,
  dealOut: async (data: {selectList: string[]; index: number}, event: any) => {
    return false
  },
}, {
  setDealOut: (value: (data: {selectList: string[]; index: number}, event: any) => any, setData) => setData(data => fpMerge(data, {dealOut: value})),
  setOpen: (value, setData) => setData(data => fpMerge(data, {
    open: value,
  })),
  openClick: (value: {
    open: boolean
    index: number
    selectList: string[]
  }, setData) => setData(data => fpMerge(data, value)),
  setSelectList: ({id, checked}: { id: string; checked: boolean }, setData) => {
    return setData(data => fpSet(data, 'selectList', (checked ? [...data.selectList, id] : data.selectList.filter(value => value !== id))))
  },
  getList: async (value, setData, {query}) => {
    // await option?.query
    const {product_list} = await query(productGraphql.getList, {
      page: 0,
      rows_per_page: 10000,
      is_group: -1,
    })
    setData(pre => fpMerge(pre, {
      list: product_list,
    }))
  },
})

const DialogContentBox = styled(DialogContent)`
  display: grid;
  grid-template-columns: 40px auto;
  grid-row-gap: 10px;
  align-items: center;
  max-height: calc(90vh - 200px);
  min-width: 900px;
  overflow-y: auto;
`

export const SelectProduct = () => {
  const {state: {index, open, list, selectList, dealOut}, actions, handleAction: dealAction} = useStore(ModuleEnum.SelectProduct, selectProductModel)

  useEffect(() => {
    dealAction(actions.getList)()
  }, [actions.getList, dealAction])
  const onClose = () => dealAction(actions.openClick)({
    open: false,
    selectList: [],
    index: -1,
  })

  return (
      <Dialog
          maxWidth={"lg"}
          open={open}
          onClose={onClose}
      >
        <DialogContentBox>
          {list.map((value: any) => <React.Fragment key={`list.map_${value.name}`}>
            <aside>
              <Checkbox
                  checked={selectList.includes(value.id)}
                  onChange={event => dealAction(actions.setSelectList)({
                    id: value.id,
                    checked: event.target.checked
                  })}
              />
            </aside>
            <section>{value.name}</section>
          </React.Fragment>)}
        </DialogContentBox>
        <DialogActions>
          <CusButton
              fullWidth
              color={"primary"}
              variant={"contained"}
              onClick={async event => {
                const res = await dealOut({selectList, index}, event)
                if (res) {
                  onClose()
                }
              }}
          >保存</CusButton>
        </DialogActions>
      </Dialog>
  )
}
