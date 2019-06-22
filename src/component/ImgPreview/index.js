import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'
import { S } from './style'

const { Box, Img } = S

export const ImgPreview = ({ open, closeModal }) => {

  const settings = {
    dots: true,
  }
  return (
      <div className="container">
        <Slider
            {...settings}
        >
          <div>
            {/* eslint-disable jsx-a11y/alt-text */}
            <img src="http://placekitten.com/g/400/200"/>
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200"/>
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200"/>
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200"/>
          </div>
        </Slider>
      </div>
  )
}

export default {
  ImgPreview
}
