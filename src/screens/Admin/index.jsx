import React, { useEffect, useState } from 'react'
import NavBar from "../../components/NavBar";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Playlist from "../../components/PlaylistAdmin";
import MusikAdmin from "../../components/MusikAdmin";
import style from "./style.module.css";
// Apollo Client
import { useLazyQuery } from '@apollo/client';
// Query
import { GET_MUSIK } from '../../GrapQL/Musik/queries';
const Admin = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const dataUser = useSelector((state) => state.user.dataUser[0]);
  // console.log(dataUser.role);
  const [stateNav, setStateNav] = useState([
    {
      id: 0,
      name: "Musik",
      active: false,
    },
    {
      id: 1,
      name: "Playlist",
      active: true,
    },
    {
      id: 2,
      name: "Users",
      active: false,
    },
  ]);
  const navigate = useNavigate();
  const handleRouter = (idx) => {
    const newStates = stateNav.map((nav, navIdx) => {
      if (navIdx === idx) {
        return {
          ...nav,
          active: true,
        }
      } else {
        return {
          ...nav,
          active: false,
        }
      }
    });
    setStateNav(newStates);
  }
  useEffect(() => {
    if (dataUser.role === "user") {
      navigate('/login');
    }
  }, []);
  return (
    dataUser.role === "admin" ?
      <Container fluid>
        <Row>
          <Col xl={3} md={3} sm={3} xs={3}>
            <nav
              id="sidebarMenu"
              className="collapse d-lg-block sidebar collapse bg-white"
            >
              <div>
                <div className="list-group list-group-flush mx-3 mt-4">
                  {
                    stateNav.map((nav, navIdx) => (
                      <div
                        key={navIdx}
                        className={stateNav[navIdx].active ? style.bgdiv : ""}
                        onClick={() => handleRouter(navIdx)}
                      >
                        <a
                          className="list-group-item list-group-item-action py-2 ripple"
                        >
                          <i className="fas fa-tachometer-alt fa-fw me-3"></i
                          ><span>{nav.name}</span>
                        </a>
                      </div>
                    ))
                  }
                </div>
              </div>
            </nav>
          </Col>
          <Col xl={9} md={9} sm={9} xs={9}>
            <NavBar />
            {
              stateNav[0].active ? <MusikAdmin /> : <></>
            }
            {
              stateNav[1].active ? <Playlist /> : <></>
            }
            {
              stateNav[2].active ? "User" : <></>
            }

          </Col>
        </Row>
      </Container>
      :
      <></>
  )
}

export default Admin;
