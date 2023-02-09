import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const loginAction = createAsyncThunk(
  'auth/loginAsync',
  async ({value}, {rejectWithValue}) => {
    try {
      const form = {
        email: value.email,
        password: value.password,
      };
      const {data} = await http().post('/auth/login', form);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const registerAction = createAsyncThunk(
  'auth/registerAsync',
  async ({value}, {rejectWithValue}) => {
    try {
      const form = {
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNUm: value.phoneNUm,
        email: value.email,
        password: value.password,
      };
      const {data} = await http().post('/auth/register', form);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
