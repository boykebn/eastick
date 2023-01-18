// r
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import HomePage from './HomePage';
import ListMovie from './ListMovie';
import MovieDetail from './MovieDetail';
import Order from './Order';
import Payment from './Payment';
import Profile from './Profile';
import History from './History';
import TicketResult from './TicketResult';

const Stack = createNativeStackNavigator();

const Main = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {!token && (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{headerShown: false}}
              />
            </>
          )}
          {token && (
            <>
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="ListMovie"
                component={ListMovie}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="MovieDetail"
                component={MovieDetail}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Order"
                component={Order}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="History"
                component={History}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="TicketResult"
                component={TicketResult}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
        {/* <SignUp /> */}
        {/* <SignIn /> */}
        {/* <ForgotPassword /> */}
        {/* <ResetPassword /> */}
        {/* <HomePage /> */}
        {/* <ListMovie /> */}
        {/* <MovieDetail /> */}
        {/* <Order /> */}
        {/* <Payment /> */}
        {/* <Profile /> */}
        {/* <History /> */}
        {/* <TicketResult /> */}
        {/* <Register /> */}
        {/* <Login /> */}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default Main;
