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
export const GET_SUB_MUSIK = gql`
subscription MySubscription {
  mymusik_musik {
    artist
    audio
    cover
    id_musik
    judul
  }
}
`;
export const GET_SEARCH_MUSIK = gql`
query MyQuery($judul: String) {
  mymusik_musik(where: {judul: {_ilike: $judul}}) {
    judul
    id_musik
    cover
    audio
    artist
  }
}

`;


