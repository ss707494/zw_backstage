import React, {useEffect} from "react"
import {modelFactory, ModuleEnum, useStore} from "@/common/context"
import {Checkbox, Dialog, DialogActions, DialogContent} from "@material-ui/core"
import {fpMerge, fpSet} from "@/common/utils"
import {productGraphql} from "@/views/Product/List/productGraphql"
import styled from "styled-components"
import {CusButton} from "@/component/CusButton"

export const selectProductModel = modelFactory({
  open: false,
  list: [],
  selectList: [] as string[],
  index: -1,
  dealOut: async (selectList: string[], event: any) => {
    return selectList
  },
}, {
  setDealOut: (value: (selectList: string[], event: any) => any, data) => fpMerge(data, {dealOut: value}),
  setOpen: (value, data) => fpMerge(data, {
    open: value,
  }),
  openClick: (value: {
    open: boolean,
    index: number,
    selectList: string[],
  }, data) => fpMerge(data, value),
  setSelectList: ({id, checked}: { id: string, checked: boolean }, data) => {
    // console.log(data.selectList)
    // console.log((checked ? [...data.selectList, id] : data.selectList.filter(value => value !== id)))
    // console.log(fpSet(data, 'selectList', (checked ? [...data.selectList, id] : data.selectList.filter(value => value !== id))))
    return fpSet(data, 'selectList', (checked ? [...data.selectList, id] : data.selectList.filter(value => value !== id)))
  },
}, {
  getList: async (value, setData, {query}) => {
    const {product_list} = await query(productGraphql.getList, {
      page: 0,
      rows_per_page: 10000,
      is_group: -1,
    })
    setData(pre => fpMerge(pre, {
      list: product_list,
    }))
  }
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
  const {state: {open, list, selectList, dealOut}, actions, asyncActions, dealStoreAction, dealActionAsync} = useStore(ModuleEnum.SelectProduct, selectProductModel)

  useEffect(() => {
    dealActionAsync(asyncActions.getList)()
  }, [asyncActions.getList, dealActionAsync])
  const onClose = () => dealStoreAction(actions.openClick)({
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
                  onChange={event => dealStoreAction(actions.setSelectList)({
                    id: value.id,
                    checked: event.target.checked
                  })}
              />
            </aside>
            <section>{value.name}{JSON.stringify(selectList)}{value.id}{`${selectList.includes(value.id)}`}</section>
          </React.Fragment>)}
        </DialogContentBox>
        <DialogActions>
          <CusButton
              fullWidth
              color={"primary"}
              variant={"contained"}
              onClick={async event => {
                const res = await dealOut(selectList, event)
                if (res) {
                  onClose()
                }
              }}
          >保存</CusButton>
        </DialogActions>
      </Dialog>
  )
}
