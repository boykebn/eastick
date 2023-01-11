import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async ({email, password, cb}) => {
    try {
      const {data} = await http().post('/auth/login', {email, password});
      cb();
      return data.result;
    } catch (error) {
      return error.response.data.message;
    }
  },
);

export const registerAction = createAsyncThunk(
  'auth/registerAction',
  async ({firstName, lastName, email, password, phoneNUm, cb}) => {
    try {
      console.log('masuk nih');
      const data = await http().post('/auth/register', {
        firstName,
        lastName,
        phoneNUm,
        email,
        password,
      });
      cb();
      console.log('nahkan udah masuk');
      return data.results;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  },
);
