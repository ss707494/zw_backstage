import React from 'react'
import { S } from './style'
import { Add, Replay } from "@material-ui/icons";
import { getObjectURL } from "@/common/utils";
import Upload from "rc-upload";

export const ImgUpload = (
    {
      onChange,
      initSrc = ''
    }) => {

  const [imgSrc, setImgSrc] = React.useState(initSrc)
  return (
      <S.ImgUpload>
        <Upload
            beforeUpload={(file) => {
              setImgSrc(getObjectURL(file))
              onChange(file)
              return false
            }}
        >
          <S.AddButton>
            <S.Add>
              {!imgSrc
                  ? <span>
                    <Add/>
                    <span>点击添加</span>
                  </span>
                  : <S.ImgBox>
                    <img src={imgSrc}
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
