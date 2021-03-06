import React from 'react'
import { S } from './style'
import { Add, Replay } from "@material-ui/icons"
import { getObjectURL } from "@/common/utils"
import Upload from "rc-upload"
import { dealImgUrl } from '@/component/ImgDealUrl/ImgDealUrl.tsx'

export const ImgUpload = (
    {
      onChange,
      initSrc = '',
      mainCss = '',
      noSetSrc = false,
    }) => {

  const [imgSrc, setImgSrc] = React.useState(initSrc)
  React.useEffect(() => {
    if (initSrc) {
      setImgSrc(initSrc)
    }
  }, [initSrc])
  return (
      <S.ImgUpload>
        <Upload
            beforeUpload={(file) => {
              if (!noSetSrc) {
                setImgSrc(getObjectURL(file))
              }
              onChange(file)
              return false
            }}
        >
          <S.AddButton>
            <S.Add
                mainCss={mainCss}
            >
              {!imgSrc
                  ? <span>
                    <Add/>
                    <span>点击添加</span>
                  </span>
                  : <S.ImgBox>
                    <img src={dealImgUrl(imgSrc)}
                         alt=""/>
                    <Replay />
                  </S.ImgBox>
              }
            </S.Add>
          </S.AddButton>
        </Upload>
      </S.ImgUpload>
  )
}

export default {
  ImgUpload
}
