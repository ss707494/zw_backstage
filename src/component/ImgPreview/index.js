import React from 'react'
import { S } from './style'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const { Box, Img } = S

export const ImgPreview = ({ open, closeModal, data = [] }) => {

  return (
      <Box
          open={open}
          onClose={closeModal}
      >
        <Carousel
        >
          {data?.map(e => <Img
              key={`Carousel${e?.id}`}
          >
            <img
                alt=""
                src={e?.url}/>
          </Img>)}
        </Carousel>
      </Box>
  )
}

export default {
  ImgPreview
}
