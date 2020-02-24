import React, {useState} from 'react'
import {S} from './style'
import {CusTextField} from "@/component/CusTextField"
import MenuItem from "@material-ui/core/MenuItem"
import {CusSelectField} from "@/component/CusSelectField"
import {ImgPreview} from "@/component/ImgPreview"
import Button from "@material-ui/core/Button"
import {showMessage} from "@/component/Message"
import {ImgUpload} from "@/component/ImgUpload"
import {KeyboardDateTimePicker} from '@material-ui/pickers'
import {dealImgUrl} from "@/component/ImgDealUrl/ImgDealUrl"
import {modelFactory} from "@/common/ModelAction/modelUtil"
import {fpMerge} from "@/common/utils"
import {CusButton} from "@/component/CusButton"
import {useModelState} from "@/common/useHooks"

const testModel = modelFactory({
  count: 0,
  ss: '123',
}, {
  add: (value, setData,) => setData(data => fpMerge(data, {count: data.count + 1})),
  // ss: (value, data, {}) => {
  // },
})



export const Test = () => {
  const {handleAction: dealAction, actions, state: {count}} = useModelState(testModel)

  const [search, setSearch] = React.useState<any>({
    type: '',
    sort: '',
  })
  const [imgOpen, setImgOpen] = React.useState(false)
  const [imgSrc,] = React.useState('')
  const [date, changeDate] = useState(new Date())

  return (
      <S.Box>
        <div>
          rc-upload
          <span>span</span>
          <Button>
            testJsx
          </Button>
          <ImgUpload
              onChange={() => {
              }}
          />
          <img
              style={{
                width: '300px'
              }}
              src={dealImgUrl(imgSrc)}
              alt=""/>
        </div>
        <div>
          test file ajax
          <Button
              onClick={() => {
                // axios
              }}
          >ajax</Button>
        </div>
        <CusTextField
            error
            id="e"
            label="sad"
            helperText="324"
            value={search.name || ''}
            onChange={e => setSearch({
              ...search,
              name: e.target.value
            })}
        />
        <div>
          <CusSelectField
              error
              helperText="324"
              id="kfjsdf"
              label="sad"
              placeholder="alksdlkjf"
              onChange={(v: any) => {
                setSearch({
                  ...search,
                  type: v.target.value
                })
              }}
              value={search.type}
          >
            <MenuItem
                key={'123'}
                value={'123'}
            >123</MenuItem>
            <MenuItem
                key={'1234'}
                value={'1234'}
            >1234</MenuItem>
          </CusSelectField>
        </div>
        <div>
          <div>
          </div>
          <ImgPreview
              open={imgOpen}
              closeModal={() => setImgOpen(false)}
          />
          <Button
              onClick={() => setImgOpen(true)}
          >openModal</Button>
        </div>
        <div>
          <Button
              onClick={() => {
                showMessage({message: 'test', duration: 9999})
              }}
          >
            showMessage
          </Button>
          <Button
              onClick={() => {
                showMessage({message: 'test', duration: 9999, msg_type: 'error'})
              }}
          >
            showMessage
          </Button>
        </div>
        <div>
          <KeyboardDateTimePicker
              format={'yyyy/MM/dd HH:mm'}
              value={date}
              onChange={(date: any) => changeDate(date)}
          />
        </div>
        <div>
          <header>count test</header>
          <div>{count}</div>
          <CusButton
              onClick={() => {
                dealAction(actions.add)()
              }}
          >add</CusButton>
        </div>

      </S.Box>
  )
}

export default {
  props: {
    path: process.env.REACT_APP_PRE_ROUTE + '/test',
    component: Test,
  },
}

