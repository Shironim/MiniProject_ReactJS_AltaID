import { Col, Container, Row, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import NavPlayer from "../../components/NavPlayer";
import CardMusic from "../../components/CardMusic";
import NavBar from "../../components/NavBar";
import MusicPlayer from "../../components/MusicPlayer";
import Image from "react-bootstrap/Image";
import style from "./style.module.css";

const Home = () => {
  const now = 40;
  return (
    <Container fluid >
      <Row style={{ height: "100vh" }}>
        <Col style={{ height: "100vh", overflow: "auto", borderRight: "2px solid rgb(205, 192, 192)" }} xl={2} md={2} sm={2} xs={2}>
          <div className='mt-2'>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
            <div className="mt-4">
              <div className={style.songs}>
                <div className="d-flex flex-row p-3">
                  <Image
                    src={'https://github.com/mshaaban0.png'}
                    rounded
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ps-2 d-flex flex-column align-self-center">
                    <p className="m-0 fs-5"><b>Diam</b></p>
                    <p>Payung Teduh</p>
                  </div>
                </div>
              </div>
              <div className={style.songs}>
                <div className="d-flex flex-row p-3">
                  <Image
                    src={'https://github.com/mshaaban0.png'}
                    rounded
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ps-2 d-flex flex-column align-self-center">
                    <p className="m-0 fs-5"><b>Diam</b></p>
                    <p>Payung Teduh</p>
                  </div>
                </div>
              </div>
              <div className={style.songs}>
                <div className="d-flex flex-row p-3">
                  <Image
                    src={'https://github.com/mshaaban0.png'}
                    rounded
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ps-2 d-flex flex-column align-self-center">
                    <p className="m-0 fs-5"><b>Diam</b></p>
                    <p>Payung Teduh</p>
                  </div>
                </div>
              </div>
              <div className={style.songs}>
                <div className="d-flex flex-row p-3">
                  <Image
                    src={'https://github.com/mshaaban0.png'}
                    rounded
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ps-2 d-flex flex-column align-self-center">
                    <p className="m-0 fs-5"><b>Diam</b></p>
                    <p>Payung Teduh</p>
                  </div>
                </div>
              </div>
              <div className={style.songs}>
                <div className="d-flex flex-row p-3">
                  <Image
                    src={'https://github.com/mshaaban0.png'}
                    rounded
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ps-2 d-flex flex-column align-self-center">
                    <p className="m-0 fs-5"><b>Diam</b></p>
                    <p>Payung Teduh</p>
                  </div>
                </div>
              </div>
              <div className={style.songs}>
                <div className="d-flex flex-row p-3">
                  <Image
                    src={'https://github.com/mshaaban0.png'}
                    rounded
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ps-2 d-flex flex-column align-self-center">
                    <p className="m-0 fs-5"><b>Diam</b></p>
                    <p>Payung Teduh</p>
                  </div>
                </div>
              </div>
              <div className={style.songs}>
                <div className="d-flex flex-row p-3">
                  <Image
                    src={'https://github.com/mshaaban0.png'}
                    rounded
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ps-2 d-flex flex-column align-self-center">
                    <p className="m-0 fs-5"><b>Diam</b></p>
                    <p>Payung Teduh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xl={10}
          md={10}
          sm={10}
          xs={10}>
          <NavBar />
          <div
            className='d-flex flex-column justify-content-center align-items-center'
          >
            <CardMusic />
            <MusicPlayer />
          </div>
        </Col>
      </Row >
    </Container >
  )
}

export default Home
