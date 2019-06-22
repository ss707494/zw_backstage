import React from 'react'
import { S } from './style'
import { CusTextField } from "@/component/CusTextField";
import MenuItem from "@material-ui/core/MenuItem";
import { CusSelectField } from "@/component/CusSelectField";
import { ImgPreview } from "@/component/ImgPreview";
import Button from "@material-ui/core/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const Test = prop => {
  const [search, setSearch] = React.useState({
    type: '',
    sort: '',
  })
  const [imgOpen, setImgOpen] = React.useState(true)
  return (
      <S.Box>
        <CusTextField
            id="sldkfjsdf"
            label="sad"
            helperText="324"
        />
        <div>
          <CusSelectField
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
          <Carousel
              width={400}
          >
            <div>
              <img src="http://placekitten.com/g/400/200"/>
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200"/>
            </div>
          </Carousel>
          <Button
              onClick={() => setImgOpen(true)}
          >openModal</Button>
        </div>

      </S.Box>
  )
}

export default {
  props: {
    path: '/test',
    component: Test,
  },
}

