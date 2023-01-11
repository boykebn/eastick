import {createSlice} from '@reduxjs/toolkit';
import {loginAction, registerAction} from '../actions/auth';

const initialState = {
  token: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log(action);
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.token = null;
    },
  },
  extraReducers: build => {
    build.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    build.addCase(loginAction.fulfilled, (state, action) => {
      // console.log(action)
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    });
    build.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const {login, logout} = authReducer.actions;

export default authReducer.reducer;
