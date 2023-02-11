import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  bookingDate: null,
  movieId: null,
  cinemaId: null,
  movieSchedulesId: null,
  fullName: null,
  email: null,
  phoneNUm: null,
  statusId: null,
  paymentMethodId: null,
  seatNum: null,
  time: null,
  price: null,
  movieTitle: null,
  totalPrice: null,
  cinemaName: null,
  cinemaPicture: null,
};

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    selectCinemas: (state, action) => {
      state.bookingDate = action.payload.bookingDate;
      state.movieId = action.payload.movieId;
      state.userId = action.payload.userId;
      state.cinemaId = action.payload.cinemaId;
      state.time = action.payload.time;
      state.price = action.payload.price;
      state.movieTitle = action.payload.movieTitle;
      state.cinemaName = action.payload.cinemaName;
      state.cinemaPicture = action.payload.cinemaPicture;
      state.movieSchedulesId = action.payload.movieSchedulesId;
    },
    chooseSeat: (state, action) => {
      state.seatNum = action.payload.seatNum;
      state.totalPrice = action.payload.totalPrice;
    },
    selectPayment: (state, action) => {
      state.paymentMethodId = action.payload.paymentMethodId;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phoneNUm = action.payload.phoneNUm;
      state.statusId = action.payload.statusId;
    },
    history: (state, action) => {},
    cancelTransaction: (state, {payload}) => {
      return initialState;
    },
  },
  extraReducers: build => {},
});

export const {
  selectCinemas,
  selectPayment,
  chooseSeat,
  history,
  cancelTransaction,
} = transactionReducer.actions;

export default transactionReducer.reducer;
