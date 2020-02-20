import React, {ImgHTMLAttributes} from "react"

const REACT_APP_PRE_IMG_DOMAIN: string = process.env.REACT_APP_PRE_IMG_DOMAIN ?? ''
export const dealImgUrl = (src: string = '') => {
  if (src?.includes('blob:')) {
    return src
  }
  return REACT_APP_PRE_IMG_DOMAIN + src
}
export const ImgDealUrl = (props: ImgHTMLAttributes<any>) => {
  return (
      <img
          {...props}
          src={REACT_APP_PRE_IMG_DOMAIN + props.src}
          alt={props.alt || ''}
      />
  )
}
