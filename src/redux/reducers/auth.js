import {createSlice} from '@reduxjs/toolkit';
import {loginAction, registerAction} from '../actions/auth';

const initialState = {
  token: null,
  isLoading: false,
  message: '',
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: (state, action) => {
    //   // console.log(action);
    //   state.token = action.payload.token;
    // },
    logout: (state, action) => {
      return initialState;
    },
  },
  extraReducers: build => {
    build.addCase(loginAction.pending, (state, {payload}) => {
      state.isLoading = false;
    });

    build.addCase(loginAction.fulfilled, (state, {payload}) => {
      console.log('masuk');
      state.token = payload.token;
      state.isLoading = true;
      state.message = payload.message;
      // console.log(state.message);
    });

    build.addCase(loginAction.rejected, (state, action) => {
      state.token = null;
      state.isLoading = true;
      state.message = action.error.message;
    });

    build.addCase(registerAction.pending, (state, {payload}) => {
      state.isLoading = false;
    });

    build.addCase(registerAction.fulfilled, (state, {payload}) => {
      // console.log(action)
      state.token = payload.results.token;
      state.isLoading = true;
      state.message = '';
    });

    build.addCase(registerAction.rejected, (state, action) => {
      state.token = null;
      state.isLoading = true;
      state.message = action.error.message;
    });
  },
});

export const {logout: logoutAction} = authReducer.actions;

export default authReducer.reducer;
