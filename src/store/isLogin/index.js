import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

const isLoginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = !state.isLogin;
      // console.log('ini state', state.isLogin);
    },
  }
});

export const { login } = isLoginReducer.actions

export default isLoginReducer.reducer