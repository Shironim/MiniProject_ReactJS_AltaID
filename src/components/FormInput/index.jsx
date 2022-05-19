import React, { useState } from 'react'
import style from "./style.module.css";
import { Form } from "react-bootstrap";

const FormInput = (props) => {
  const { label, type, onChange, placeholder, id } = props;

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={style.inputDaftar}
        onChange={(e) => onChange(e.target.value, id)}
        type={type}
        placeholder={placeholder}
      />
    </Form.Group>
  )
}
export default FormInput;
