import { gql } from '@apollo/client';

export const GET_SUB_PLAYLIST = gql`
subscription MySubscription($id_user: Int) {
  mymusik_playlist(where: {id_user: {_eq: $id_user}}) {
    judul
    id_user
    id_playlist
    gambar
    list_playlists {
      musik {
        artist
        audio
        cover
        judul
        id_musik
      }
    }
  }
}
`;
export const GET_SEARCH_PLAYLIST = gql`
query MyQuery($judul: String, $id_user: Int) {
  mymusik_playlist(where: {judul: {_ilike: $judul}, id_user: {_eq: $id_user}}) {
    judul
    id_user
    id_playlist
    list_playlists {
      musik {
        artist
        audio
        cover
        id_musik
        judul
      }
    }
  }
}

`;
export const ADD_NEW_PLAYLIST = gql`
mutation MyMutation($id_user: Int, $judul: String) {
  insert_mymusik_playlist(objects: {judul: $judul, id_user: $id_user}) {
    returning {
      judul
      id_user
      id_playlist
    }
  }
}
`;
export const ADD_MUSIK_TO_PLAYLIST = gql`
mutation MyMutation($id_lagu: Int, $id_playlist: Int, $id_user: Int) {
  insert_mymusik_list_playlist(objects: {id_lagu: $id_lagu, id_playlist: $id_playlist, id_user: $id_user}) {
    returning {
      id_lagu
      id_list
      id_playlist
      id_user
    }
  }
}
`;


