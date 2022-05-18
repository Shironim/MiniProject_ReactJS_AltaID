import React from 'react';
import style from "./style.module.css";

import { Image } from 'react-bootstrap';
const CardMusic = ({ currentSong, songs }) => {
  console.log(songs);
  return (
    <div className='w-100 text-center' style={{
      minHeight: "40vh"
    }}>
      <Image
        style={{ width: "300px", height: "300px" }}
        className={style.card_image_top}
        roundedCircle
        src={currentSong.cover}
      />
      <div className='text-center mt-2'>
        <p className='fs-3 fw-bold mb-0'>{currentSong.artist}</p>
        <p className='fs-6'>{currentSong.name}</p>
      </div>
    </div >

  )
}
export default CardMusic;