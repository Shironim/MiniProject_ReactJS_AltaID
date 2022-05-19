import React, { useState } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router-dom";
/** Apollo Client */
import { useLazyQuery } from '@apollo/client';
/** Query */
import { LOGIN_USER } from '../../GrapQL/User/queries';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/isLogin";
import { simpanDataUser } from "../../store/User";

const Login = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const dataUser = useSelector((state) => state.user.dataUser);
  console.log('ini login', isLogin);
  console.log('ini user', dataUser);
  const navigate = useNavigate();

  const [loginStudent, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data.mymusik_user[0]);
      if (data.mymusik_user.length === 1) {
        dispatch(simpanDataUser(data.mymusik_user[0]));
        dispatch(login());
        navigate("/");
      } else {
        // Sweet Alert user tidak ketemu

      }
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const [inputs, setInputs] = useState([
    {
      id: 0,
      label: 'Email',
      type: 'email',
      value: '',
      placeholder: "john@mail.com",
    },
    {
      id: 1,
      label: 'Password',
      type: 'password',
      value: '',
      placeholder: "****",
    },
  ]);

  const handleSubmit = () => {
    loginStudent({
      variables: {
        email: inputs[0].value,
        password: inputs[1].value,
      }
    })
  }

  const onChange = (value, index) => {
    const newInput = { ...inputs[index], value };
    // console.log(newInput);
    const newInputs = [...inputs];

    newInputs[index] = newInput;

    setInputs(newInputs);
  };
  // console.log(inputs);
  return (
    loading ? <Loading /> : <Row>
      <Col xl={6} md={6} sm={6} xs={6} className="m-auto">
        <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
          <Form
            onSubmit={handleSubmit}
            className="p-5 rounded form border border-2">
            <div className='fs-3 mb-4 text-center'>
              Login User
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
              Login
            </Button>
            <div className='py-2 text-end'>
              Belum punya akun ? <Link to="/daftar">Daftar</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default Login;
