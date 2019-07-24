import React from 'react'
import { S } from './style'
import { CusTextField } from "@/component/CusTextField";
import MenuItem from "@material-ui/core/MenuItem";
import { CusSelectField } from "@/component/CusSelectField";
import { ImgPreview } from "@/component/ImgPreview";
import Button from "@material-ui/core/Button";
import { showMessage } from "@/component/Message";
import { ImgUpload } from "@/component/ImgUpload";


export const Test = () => {

  const [search, setSearch] = React.useState({
    type: '',
    sort: '',
  })
  const [imgOpen, setImgOpen] = React.useState(false)
  const [imgSrc, ] = React.useState('')
  return (
      <S.Box>
        <div>
          rc-upload
          <ImgUpload
          />
          <img
              style={{
                width: '300px'
              }}
              src={imgSrc}
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
              onChange={(v) => {
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
            {/* eslint-disable jsx-a11y/alt-text */}
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
                showMessage({ message: 'test', duration: 9999 })
              }}
          >
            showMessage
          </Button>
          <Button
              onClick={() => {
                showMessage({ message: 'test', duration: 9999, msg_type: 'error' })
              }}
          >
            showMessage
          </Button>
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

