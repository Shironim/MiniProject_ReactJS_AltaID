import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

const isLoginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
      // console.log('ini state', state.isLogin);
    },
    logout: (state) => {
      state.isLogin = false;
      // console.log('ini state', state.isLogin);
    },
  }
});

export const { login, logout } = isLoginReducer.actions

export default isLoginReducer.reducer