import React, { useState } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import FormInput from "../../components/FormInput";
import style from "./style.module.css";

import { useNavigate } from "react-router-dom";

/** Apollo Client */
import { useMutation } from '@apollo/client';
/** Query */
import { DAFTAR_USER } from '../../GrapQL/User/queries';
const Daftar = () => {
  const navigate = useNavigate();

  const [insertUser, { loading }] = useMutation(DAFTAR_USER, {
    onCompleted: (data) => {
      navigate("/login")
      // console.log(data);
    },
    onError: (error) => {
      console.log('Terjadi error di mutasi insert', { error });
    }
  });

  const [inputs, setInputs] = useState([
    {
      id: 0,
      label: 'Nama Lengkap',
      type: 'text',
      placeholder: "John Doe",
      value: ''
    },
    {
      id: 1,
      label: 'Email',
      type: 'email',
      value: '',
      placeholder: "john@mail.com",
    },
    {
      id: 2,
      label: 'Password',
      type: 'password',
      value: '',
      placeholder: "****",
    },
  ]);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // console.log("cek")
    insertUser({
      variables: {
        nama: inputs[0].value,
        email: inputs[1].value,
        password: inputs[2].value,
      }
    })
  }

  const onChange = (value, index) => {
    const newInput = { ...inputs[index], value };
    console.log(newInput);
    const newInputs = [...inputs];

    newInputs[index] = newInput;

    setInputs(newInputs);
  };

  return (
    loading ? <Loading /> :
      <Row>
        <Col xl={6} md={6} sm={6} xs={6} className="m-auto">
          <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            <Form
              onSubmit={handleSubmitForm}
              className="p-5 rounded form border border-2">
              <div className='fs-3 mb-4 text-center'>
                Daftar User
              </div>
              {
                inputs.map((input, inputIdx) => (
                  <FormInput
                    key={inputIdx}
                    {...input}
                    value={input.value}
                    onChange={onChange}
                  />
                ))
              }
              <Button
                type="submit"
                className="w-100">
                Daftar
              </Button>
              <div className='py-2 text-end'>
                Sudah punya akun ? <Link to="/login">Login</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row >
  )
}

export default Daftar;
