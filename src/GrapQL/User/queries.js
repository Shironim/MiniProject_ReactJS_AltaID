import { gql } from '@apollo/client';

export const DAFTAR_USER = gql`
mutation MyMutation($email: String, $nama: String, $password: String) {
  insert_mymusik_user(objects: {email: $email, nama: $nama, password: $password, role: "user"}) {
    returning {
      email
      id_user
      nama
      password
      role
    }
  }
}
`;
export const LOGIN_USER = gql`
query MyQuery($email: String, $password: String) {
  mymusik_user(where: {password: {_eq: $password}, email: {_eq: $email}}) {
    email
    id_user
    nama
    password
    role
  }
}
`;
