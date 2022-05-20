import { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, FormControl, Button, Modal } from "react-bootstrap";
import style from "./style.module.css";
import NavBar from "../../components/NavBar";
import Loading from "../../components/Loading";
import Music from "../../components/MusicBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

// Apollo Client
import { useSubscription, useLazyQuery, useMutation } from '@apollo/client';
// Query
import { GET_SUB_MUSIK, GET_SEARCH_MUSIK } from '../../GrapQL/Musik/queries';
import { GET_SUB_PLAYLIST, ADD_NEW_PLAYLIST, ADD_MUSIK_TO_PLAYLIST, GET_SEARCH_PLAYLIST } from '../../GrapQL/Playlist/queries';

import { useSelector } from 'react-redux';

const Home = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const dataUser = useSelector((state) => state.user.dataUser);

  const { data, loading } = useSubscription(GET_SUB_MUSIK);

  const { data: dataPlaylist, loading: loadingPlaylist } = useSubscription(GET_SUB_PLAYLIST, {
    variables: { id_user: dataUser.length === 0 ? 0 : dataUser[0].id_user }
  });
  const [getSearchMusik, { data: searchMusik, loading: searchMusikLoad }] = useLazyQuery(GET_SEARCH_MUSIK, {
    onCompleted: (searchMusik) => {
      // console.log(searchMusik);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const [getSearchPlaylist, { data: searchPlaylist, loading: searchPlaylistLoad }] = useLazyQuery(GET_SEARCH_PLAYLIST, {
    onCompleted: (searchPlaylist) => {
      // console.log(searchPlaylist);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const [insertPlaylist, { loading: loadingInsert }] = useMutation(ADD_NEW_PLAYLIST, {
    onCompleted: (data) => {
    },
    onError: (error) => {
      console.log('Terjadi error di mutasi insert', { error });
    }
  });
  const [insertMusikToPlaylist, { loading: loadingInsertMusik }] = useMutation(ADD_MUSIK_TO_PLAYLIST, {
    onCompleted: (data) => {
    },
    onError: (error) => {
      console.log('Terjadi error di mutasi insert', { error });
    }
  });
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [isMusik, setIsMusik] = useState(true);
  const [inputSearchMusik, setSearchMusik] = useState("");
  const [inputSearchPlaylist, setSearchPlaylist] = useState("");
  const [show, setShow] = useState(false);
  const [addToPlaylistShow, setAddToPlaylistShow] = useState(false);
  const [inputAddPlaylist, setInputAddPlaylist] = useState("")
  const [addPlaylist, setAddPlaylist] = useState(
    {
      id_user: dataUser.length === 0 ? 0 : dataUser[0].id_user,
      id_lagu: 0,
      id_playlist: 0,
    }
  )
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddToPlaylistClose = () => setAddToPlaylistShow(false);
  const handleAddToPlaylistShow = (playlistIdx) => {
    setAddToPlaylistShow(true)
    setAddPlaylist({ ...addPlaylist, id_playlist: playlistIdx })
  };
  const handleMilihLagu = (e) => {
    setAddPlaylist({ ...addPlaylist, id_lagu: parseInt(e) })
  }
  const SubmitPlaylist = () => {
    insertMusikToPlaylist({
      variables: {
        id_playlist: addPlaylist.id_playlist,
        id_user: addPlaylist.id_user,
        id_lagu: addPlaylist.id_lagu,
      }
    });
    setAddPlaylist({
      id_user: dataUser[0].id_user,
      id_lagu: 0,
      id_playlist: 0,
    })
  }
  const handlePlaylist = () => {
    setIsPlaylist(!isPlaylist);
    setIsMusik(!isMusik);
  }
  const onChangeSearchMusik = (value) => {
    setSearchMusik(value);
    setTimeout(() => {
      getSearchMusik({
        variables: {
          judul: `%${inputSearchMusik}%`
        }
      })
    }, 1000);
  }
  const onChangeSearchPlaylist = (value) => {
    setSearchPlaylist(value);
    setTimeout(() => {
      getSearchPlaylist({
        variables: {
          judul: `%${inputSearchPlaylist}%`,
          id_user: dataUser[0].id_user,
        }
      })
    }, 1000);
  }
  const handleAddPlaylist = () => {
    insertPlaylist({
      variables: {
        judul: inputAddPlaylist,
        id_user: dataUser[0].id_user,
      }
    })
    setInputAddPlaylist("");

  }
  const handleInputPlaylist = (e) => {
    setInputAddPlaylist(e.target.value);
  }
  // console.log(inputAddPlaylist)
  return (
    loading || loadingPlaylist || loadingInsert || loadingInsertMusik ? <Loading /> : <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col xl={3} md={3} sm={3} xs={3}>
          <div
            className={style.sidebar}
            style={{ height: "100vh", overflow: "auto", padding: "0 16px", paddingTop: "1.5rem" }}
          >
            <div className='d-flex justify-content-between'>
              <div className="fs-4">
                List Musik
                {/* <ul className="fs-6">
                  <li><s>user /admin info login == redux persist</s></li>
                  <li>liat daftar playlist + daftar lagu</li>
                  <li>search by playlist + lagu</li>
                  <li>make playlist (nama + gambar) / delete (db) per user</li>
                  <li>add / delete musik to playlist per user</li>
                  <li>Admin sistem</li>
                  <li>tambah / update / delete lagu</li>
                  <li>liat jumlah user + playlist yang dibuat</li>
                  <li>hapus user</li>
                </ul> */}
              </div>
            </div >
            <div className='mt-2'>
              <div className="d-flex justify-content-between">
                <div onClick={() => handlePlaylist()}>{isPlaylist ? <b>Playlist</b> : "Playlist"}</div>
                <div onClick={() => handlePlaylist()}>{isMusik ? <b>Musik</b> : "Musik"}</div>
              </div>
              <Form className="d-flex flex-column mt-2">
                {
                  isMusik ?
                    <FormControl
                      type="search"
                      placeholder="Search Musik"
                      className="me-2"
                      aria-label="Search"
                      value={inputSearchMusik}
                      onChange={(e) => onChangeSearchMusik(e.target.value)}
                    />
                    :
                    <></>
                }
                {
                  isPlaylist ?
                    <>
                      <FormControl
                        type="search"
                        placeholder="Search Playlist"
                        className="me-2"
                        aria-label="Search"
                        value={inputSearchPlaylist}
                        onChange={(e) => onChangeSearchPlaylist(e.target.value)}

                      />
                      <Button variant="primary" onClick={handleShow} disabled={isLogin ? false : true} className="my-3">
                        Add Playlist
                      </Button>
                    </>
                    :
                    <></>
                }
              </Form>
              {
                isMusik ?
                  searchMusik === undefined ?
                    <div className="mt-3">
                      {
                        data.mymusik_musik.map((musik, musikIdx) => (
                          <div key={musikIdx} className={style.songs}>
                            <div className="d-flex flex-row p-2">
                              <Image
                                src={musik.cover}
                                rounded
                                style={{ width: "100px", height: "100px" }}
                              />
                              <div className="w-100 d-flex flex-row justify-content-between align-self-center">
                                <div className="ps-2 d-flex flex-column align-self-center">
                                  <p className="m-0 fs-6"><b>{musik.artist}</b></p>
                                  <p>{musik.judul}</p>
                                </div>
                                <div className="align-self-center">

                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    :
                    searchMusikLoad ?
                      <Loading /> :
                      <div className="mt-3">
                        {
                          searchMusik.mymusik_musik.map((musik, musikIdx) => (
                            <div key={musikIdx} className={style.songs}>
                              <div className="d-flex flex-row p-2">
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
                  :
                  <></>
              }
              {
                isPlaylist ?
                  dataUser.length > 0 ?
                    searchPlaylist === undefined ?
                      <div div className="mt-3">
                        {
                          dataPlaylist.mymusik_playlist.map((playlist, playlistIdx) => {
                            // console.log(playlist);
                            return (
                              <div div key={playlistIdx}>
                                <div className="d-flex flex-column p-2">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <h6>{playlist.judul}</h6>
                                    <FontAwesomeIcon
                                      onClick={() => handleAddToPlaylistShow(playlist.id_playlist)}
                                      className={style.addToPlaylist}
                                      style={{ fontSize: "1.75rem" }}
                                      icon={faSquarePlus}
                                    />
                                  </div>
                                  {
                                    playlist.list_playlists.map((list, listIdx) => {
                                      // console.log('cek', playlist.id_playlist);
                                      return (
                                        <div key={listIdx} className="d-flex flex-row py-2">
                                          <Image
                                            src={list.musik.cover}
                                            rounded
                                            style={{ width: "100px", height: "100px" }}
                                          />
                                          <div className="d-flex w-100 justify-content-between align-items-center">
                                            <div className="ps-2 d-flex flex-column">
                                              <p className="m-0 fs-6"><b>{list.musik.artist}</b></p>
                                              <p>{list.musik.judul}</p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    })
                                  }

                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                      :
                      searchPlaylistLoad ?
                        <Loading /> :
                        <div div className="mt-3">
                          {
                            searchPlaylist.mymusik_playlist.map((playlist, playlistIdx) => {
                              // console.log(playlist);
                              return (
                                <div div key={playlistIdx}>
                                  <div className="d-flex flex-column p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h6>{playlist.judul}</h6>
                                      <FontAwesomeIcon
                                        onClick={() => handleAddToPlaylistShow(playlist.id_playlist)}
                                        className={style.addToPlaylist}
                                        style={{ fontSize: "1.75rem" }}
                                        icon={faSquarePlus}
                                      />
                                    </div>
                                    {
                                      playlist.list_playlists.map((list, listIdx) => {
                                        // console.log('cek', playlist.id_playlist);
                                        return (
                                          <div key={listIdx} className="d-flex flex-row py-2">
                                            <Image
                                              src={list.musik.cover}
                                              rounded
                                              style={{ width: "100px", height: "100px" }}
                                            />
                                            <div className="d-flex w-100 justify-content-between align-items-center">
                                              <div className="ps-2 d-flex flex-column">
                                                <p className="m-0 fs-6"><b>{list.musik.artist}</b></p>
                                                <p>{list.musik.judul}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })
                                    }

                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>

                    :
                    <div className="text-center">
                      Playlist Tidak Tersedia
                    </div>
                  :
                  <></>
              }

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
        <Modal show={show} backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddPlaylist}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nama Playlist</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Playlist 1"
                  autoFocus
                  value={inputAddPlaylist}
                  onChange={(e) => handleInputPlaylist(e)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Simpan
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={addToPlaylistShow} backdrop="static" onHide={handleAddToPlaylistClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Lagu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={SubmitPlaylist}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Group className="mb-3">
                  <Form.Label>Pilihan Lagu</Form.Label>
                  <Form.Select value={addPlaylist.id_lagu} onChange={(e) => handleMilihLagu(e.target.value)}>
                    {
                      data.mymusik_musik.map((msc, mscIdx) => {
                        // console.log(msc);
                        return (
                          <option key={mscIdx} value={msc.id_musik} >{msc.judul} oleh {msc.artist}</option>
                        )
                      })
                    }
                  </Form.Select>
                </Form.Group>
              </Form.Group>
              <Button type="submit" variant="primary" onClick={handleAddToPlaylistClose}>
                Simpan
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Row >
    </ Container >
  )
}

export default Home
