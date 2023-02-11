import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import auth from './auth';
import transaction from './transaction';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const transactionConfig = {
  key: 'transaction',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transaction: persistReducer(transactionConfig, transaction),
});

export default reducer;
