import {
  Box,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  Button,
  ScrollView,
  Pressable,
} from 'native-base';
import React from 'react';
import {AlertTriangle} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';
// import moment from 'moment';

import {selectPayment} from '../redux/reducers/transaction';
import http from '../helpers/http';
import Footer from '../components/Footer';
import Navbar from '../components/NavbarUser';

const Payment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.transaction.userId);
  const bookingDate = useSelector(state => state?.transaction.bookingDate);
  const movieTitle = useSelector(state => state.transaction.movieTitle);
  const movieId = useSelector(state => state.transaction.movieId);
  const time = useSelector(state => state.transaction.time);
  const cinemaName = useSelector(state => state.transaction.cinemaName);
  const totalPrice = useSelector(state => state.transaction.totalPrice);
  const price = useSelector(state => state.transaction.price);
  const movieSchedulesId = useSelector(
    state => state.transaction.movieSchedulesId,
  );
  const cinemaId = useSelector(state => state.transaction.cinemaId);
  const seatNum = useSelector(state => state.transaction.seatNum);

  // const date = moment(bookingDate).format('LLLL').split(' ');
  // const day = date[0];
  // const month = date[1];
  // const newDate = date[2];
  // const year = date[3];
  // const fixDate = `${day} ${month} ${newDate} ${year}`;

  //handle get payment method
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [selectPaymentMethod, setSelectPaymentMethod] = React.useState(null);

  const getPaymentMethod = async () => {
    try {
      const response = await http(token).get('/paymentMethod?limit=9');
      setPaymentMethod(response?.data?.results);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    if (token) {
      getPaymentMethod();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // handle get profile
  const [getProfile, setGetProfile] = React.useState({});
  const fullNames = `${getProfile.firstName} ${getProfile.lastName}`;

  const getDataProfile = async () => {
    try {
      const response = await http(token).get('/profile');
      setGetProfile(response?.data?.results);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    if (token) {
      getDataProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [successMessage, setSuccessMessage] = React.useState(false);
  const [errorPayment, setErrorPayment] = React.useState(false);

  // handle payment order
  const handlePaymentOrdered = value => {
    if (!selectPaymentMethod) {
      setErrorPayment('Please select a payment method first');
      setTimeout(() => {
        setErrorPayment(false);
      }, 2000);
    } else {
      dispatch(
        selectPayment({
          paymentMethodId: selectPaymentMethod,
          fullName: fullNames,
          email: getProfile.email,
          phoneNUm: getProfile.phoneNUm,
          statusId: 1,
        }),
      );
      createTransaction(value);
    }
  };

  // create transaction
  const createTransaction = async () => {
    try {
      const response = await http(token).post('/transaction/orderTransaction', {
        userId: userId,
        bookingDate: bookingDate,
        movieId: movieId,
        cinemaId: cinemaId,
        movieSchedulesId: movieSchedulesId,
        fullName: fullNames,
        email: getProfile?.email,
        phoneNUm: getProfile?.phoneNUm,
        statusId: 1,
        paymentMethodId: selectPaymentMethod,
        seatNum: seatNum,
        time: time,
        totalPrice: totalPrice,
      });
      PushNotification.localNotification({
        channelId: 'global_notif',
        title: 'Success!',
        message: 'Yeay! Your order has been succes, we wait for you!',
      });
      setSuccessMessage('Order has been succes');
      setTimeout(() => {
        setSuccessMessage(false);
        navigation.navigate('History');
      }, 2000);
      return response;
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <ScrollView>
      <Navbar />
      <VStack bg="#E5E5E5">
        <HStack
          justifyContent="space-between"
          bg="#A6BB8D"
          p="5"
          borderBottomRadius="20">
          <Text color="white" fontWeight="bold" fontSize="lg">
            Total Payment
          </Text>
          <Text color="white" fontWeight="bold" fontSize="2xl">
            Rp.{totalPrice}
          </Text>
        </HStack>
      </VStack>
      <VStack bg="#E5E5E5" px="5" space="5" pt="10">
        <Text fontSize="2xl" fontWeight="bold">
          Payment Method
        </Text>
        <VStack bg="white" p="5" borderRadius="10" space="5">
          <Box space="10px" flexDirection="row" flexWrap="wrap">
            {paymentMethod?.map(item => {
              return (
                <Pressable
                  key={item.id}
                  borderWidth="1"
                  borderRadius="10"
                  px="3"
                  py="2"
                  space="2"
                  m="1"
                  alignItems="center"
                  w="80px"
                  onPress={() => setSelectPaymentMethod(item?.id)}
                  backgroundColor={
                    selectPaymentMethod === item?.id ? '#61876E' : 'white'
                  }>
                  <Image
                    source={{uri: item.picture}}
                    alt={`${item.name}`}
                    width="80px"
                    height="50px"
                    resizeMode="contain"
                  />
                </Pressable>
              );
            })}
          </Box>
          <HStack position="relative" alignItems="center">
            <Box
              borderBottomColor="#DEDEDE"
              borderBottomWidth="1"
              width="35%"
              position="absolute"
              top="2.5"
              pb="1"
              left="0"
            />

            <Text fontSize="lg" fontWeight="bold" textAlign="center" w="100%">
              Or
            </Text>
            <Box
              borderBottomColor="#DEDEDE"
              borderBottomWidth="1"
              width="35%"
              position="absolute"
              top="2.5"
              pb="1"
              right="0"
            />
          </HStack>
          <Text textAlign="center" color="#6E7191">
            Pay via cash.{' '}
            <Text color="#61876E" fontWeight="bold">
              See how it work
            </Text>
          </Text>
        </VStack>
        <Text fontSize="2xl" fontWeight="bold">
          Personal Info
        </Text>
        <VStack bg="white" p="5" borderRadius="10" space="5">
          <VStack space="2">
            <Text fontSize="lg">Full Name</Text>
            <Input
              defaultValue={fullNames}
              borderRadius="10"
              borderColor="black"
            />
          </VStack>
          <VStack space="2">
            <Text fontSize="lg">Email</Text>
            <Input
              defaultValue={getProfile?.email}
              borderColor="black"
              borderRadius="10"
            />
          </VStack>
          <VStack space="2">
            <Text fontSize="lg">Phone Number</Text>
            <HStack
              alignItems="center"
              justifyContent="center"
              px="5"
              borderWidth="1"
              borderColor="black"
              borderRadius="10">
              <Input
                width="20%"
                placeholder="+62"
                borderTopWidth="0"
                borderBottomWidth="0"
                borderLeftWidth="0"
                pt="2"
                borderRightColor="black"
              />
              <Input
                width="80%"
                defaultValue={getProfile?.phoneNUm}
                borderWidth="0"
              />
            </HStack>
          </VStack>
          <HStack
            bg="#F4B7404D"
            alignItems="center"
            justifyContent="center"
            py="3"
            space="3"
            borderRadius="10">
            <AlertTriangle size={50} color="#F4B740" />
            <Text fontSize="lg" fontWeight="bold">
              Fill your data correctly.
            </Text>
          </HStack>
        </VStack>

        {errorPayment && (
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="red.500"
            textAlign="center">
            {errorPayment}
          </Text>
        )}
        {successMessage && (
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="green.500"
            textAlign="center">
            {successMessage}
          </Text>
        )}

        <Button
          mb="10"
          borderRadius="10"
          fontWeight="bold"
          fontSize="3xl"
          onPress={handlePaymentOrdered}
          backgroundColor="#61876E"
          bg="#3C6255"
          _pressed={{bg: '#A6BB8D'}}>
          Pay your order
        </Button>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default Payment;
