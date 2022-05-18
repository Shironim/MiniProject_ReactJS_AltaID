import { gql } from '@apollo/client';

export const GET_MUSIK = gql`
query MyQuery {
  mymusik_musik {
    judul
    id_musik
    cover
    audio
    artist
  }
}
`;
