import { useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import style from "./style.module.css";
import NavBar from "../../components/NavBar";
import Loading from "../../components/Loading";
import Music from "../../components/Music";
// Apollo Client
import { useQuery } from '@apollo/client';
// Query
import { GET_MUSIK } from '../../GrapQL/Musik/queries';

const Home = () => {
  const { data, loading } = useQuery(GET_MUSIK);
  const [statePlaylistOrMusic, setStatePlaylist] = useState(false);

  return (
    loading ? <Loading /> : <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col xl={3} md={3} sm={3} xs={3}>
          <div
            className={style.sidebar}
            style={{ height: "100vh", overflow: "auto", padding: "0 16px", paddingTop: "1.5rem" }}
          >
            <div className='d-flex justify-content-between'>
              <div className="fs-4">
                List Musik
              </div>
            </div >
            <div className='mt-2'>
              <div className="mt-4">
                {
                  data.mymusik_musik.map((musik, musikIdx) => (
                    <div key={musikIdx} className={style.songs}>
                      <div className="d-flex flex-row p-3">
                        <Image
                          src={musik.cover}
                          rounded
                          style={{ width: "100px", height: "100px" }}
                        />
                        <div className="ps-2 d-flex flex-column align-self-center">
                          <p className="m-0 fs-6"><b>{musik.artist}</b></p>
                          <p>{musik.judul}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div >
        </Col>
        <Col
          xl={9}
          md={9}
          sm={9}
          xs={9}>
          <NavBar />
          <div
            className='d-flex flex-column justify-content-center align-items-center'
          >
            <Music
              songs={data.mymusik_musik}
            />

          </div>

        </Col>
      </Row >
    </ Container>
  )
}

export default Home
