import { useState } from "react";
import { Col, Container, Row, Image, Form, FormControl } from "react-bootstrap";
import style from "./style.module.css";
import NavBar from "../../components/NavBar";
import Loading from "../../components/Loading";
import Music from "../../components/MusicBox";
// Apollo Client
import { useQuery } from '@apollo/client';
// Query
import { GET_MUSIK } from '../../GrapQL/Musik/queries';

import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/isLogin";

const Home = () => {
  const { data, loading } = useQuery(GET_MUSIK);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [isMusik, setIsMusik] = useState(true);
  const isLogin = useSelector((state) => state.login.isLogin);
  const dataUser = useSelector((state) => state.user.dataUser);
  // console.log('ini diluar handle', isPlaylist);
  console.log('ini user', dataUser);
  const handlePlaylist = () => {

    setIsPlaylist(!isPlaylist);
    setIsMusik(!isMusik);
  }
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
                <ul className="fs-6">
                  <li><s>user /admin info login == redux persist</s></li>
                  <li>liat daftar playlist + daftar lagu</li>
                  <li>search by playlist + lagu</li>
                  <li>make playlist (nama + gambar) / delete (db) per user</li>
                  <li>add / delete musik to playlist per user</li>
                  <li>Admin sistem</li>
                  <li>tambah / update / delete lagu</li>
                  <li>liat jumlah user + playlist yang dibuat</li>
                  <li>hapus user</li>
                </ul>
              </div>
            </div >
            <div className='mt-2'>
              <div className="d-flex justify-content-between">
                <div onClick={() => handlePlaylist()}>{isPlaylist ? <b>Playlist</b> : "Playlist"}</div>
                <div onClick={() => handlePlaylist()}>{isMusik ? <b>Musik</b> : "Musik"}</div>
              </div>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
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
