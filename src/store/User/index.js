import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataUser: [],
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    simpanDataUser: (state, actions) => {
      state.dataUser = [
        ...state.dataUser,
        actions.payload,
      ];
    },
    deleteDataUser: (state, action) => {
      state.dataUser = [];
    }
  }
});

export const { simpanDataUser, deleteDataUser } = userReducer.actions

export default userReducer.reducer