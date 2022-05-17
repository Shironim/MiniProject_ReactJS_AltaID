import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import style from "./style.module.css";

import { Image } from 'react-bootstrap';
const CardMusic = () => {
  const now = 40;
  return (
    <div className='w-100 text-center' style={{
      minHeight: "60vh"
    }}>
      <Image
        style={{ width: "400px", height: "400px" }}
        className={style.card_image_top}
        roundedCircle
        src={'https://github.com/mshaaban0.png'}
      />
      <div className='text-center mt-5'>
        <p className='fs-3'>Diam</p>
        <p className='fs-6'>Payung Teduh</p>
      </div>
    </div >

  )
}
export default CardMusic;