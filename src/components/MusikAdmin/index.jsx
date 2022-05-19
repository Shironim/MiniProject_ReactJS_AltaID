import React, { useEffect } from 'react'
// Apollo Client
import { useSubscription } from '@apollo/client';
// Query
import { GET_SUB_MUSIK } from '../../GrapQL/Musik/queries';
import { Row, Col, Image } from 'react-bootstrap';
import Loading from '../Loading';
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
        {
          data.mymusik_musik.map((musik, musikIdx) => (
            <Col xl={2} md={2} sm={2} xs={2}>
              <div key={musikIdx}>
                <div className="d-flex flex-column">
                  <Image
                    src={musik.cover}
                    rounded
                    style={{ width: "100%", height: "100%" }}
                  />
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
