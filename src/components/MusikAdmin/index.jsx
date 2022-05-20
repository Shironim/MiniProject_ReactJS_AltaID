import React, { useEffect } from 'react'
// Apollo Client
import { useSubscription } from '@apollo/client';
// Query
import { GET_SUB_MUSIK } from '../../GrapQL/Musik/queries';
import { Row, Col, Image, Button } from 'react-bootstrap';
import Loading from '../Loading';
import style from './style.module.css';
const MusikAdmin = () => {

  const { data, loading, error } = useSubscription(GET_SUB_MUSIK);
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    console.log(data)
  }, [loading])
  return (
    loading ? <Loading /> : <div>
      <Row>
        <div>
          <Button>Add Musik</Button>
        </div>
        {
          data.mymusik_musik.map((musik, musikIdx) => (
            <Col xl={2} md={2} sm={2} xs={2}>
              <div key={musikIdx} >
                <div className="d-flex flex-column">
                  <div className={style.container}>
                    <Image
                      className={style.image}
                      src={musik.cover}
                      rounded
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className={style.overlay}>
                      <p className='p-3'>AAAA</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column text-center">
                    <p className="m-0 fs-6"><b>{musik.artist}</b></p>
                    <p>{musik.judul}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default MusikAdmin;
