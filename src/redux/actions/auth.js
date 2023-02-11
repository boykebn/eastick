import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const loginAction = createAsyncThunk(
  'auth/loginAsync',
  async ({value}) => {
    try {
      const form = {
        email: value.email,
        password: value.password,
      };
      // console.log(form);
      const {data} = await http().post('/auth/login', form);
      console.log('masuk');
      // cb();
      return data.results;
    } catch (err) {
      console.log(err);
      throw err.response.data.message;
    }
  },
);

export const registerAction = createAsyncThunk(
  'auth/registerAsync',
  async ({value, cb}) => {
    try {
      const form = {
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNUm: value.phoneNUm,
        email: value.email,
        password: value.password,
      };
      const {data} = await http().post('/auth/register', form);
      cb();
      return data.results;
    } catch (err) {
      throw err.response.data.message;
    }
  },
);
