import {
  Box,
  HStack,
  Text,
  VStack,
  Pressable,
  Image,
  ScrollView,
  Button,
} from 'native-base';
import React from 'react';
import {ArrowDown, ArrowRight} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import {chooseSeat} from '../redux/reducers/transaction';
import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';

const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const bookingDate = useSelector(state => state.transaction.bookingDate);
  const price = useSelector(state => state.transaction.price);
  const movieTitle = useSelector(state => state.transaction.movieTitle);
  const time = useSelector(state => state.transaction.time);
  const cinemaName = useSelector(state => state.transaction.cinemaName);
  const cinemaPicture = useSelector(state => state.transaction.cinemaPicture);
  const movieSchedulesId = useSelector(
    state => state.transaction.movieSchedulesId,
  );

  //set date
  const date = moment(bookingDate).format('LLLL').split(' ');
  const day = date[0];
  const month = date[1];
  const newDate = date[2];
  const year = date[3];
  const fixDate = `${day} ${month} ${newDate} ${year}`;

  //set seatnum
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const column1 = [1, 2, 3, 4, 5, 6, 7];
  const column2 = [8, 9, 10, 11, 12, 13, 14];

  const [selectSeat, setSelectSeat] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const totalPrice = Number(selectSeat.length * price).toLocaleString('id');

  const handleChooseSeat = seat => {
    if (!selectSeat.includes(seat)) {
      setSelectSeat([...selectSeat, seat].sort());
    } else {
      setSelectSeat(selectSeat.filter(e => e !== seat));
    }
  };

  // handle for choose seat to payment
  const handleChekOut = () => {
    try {
      if (selectSeat.length) {
        dispatch(
          chooseSeat({
            movieTitle: movieTitle,
            seatNum: selectSeat,
            totalPrice: selectSeat.length * price,
          }),
        );
        navigation.navigate('Payment');
      } else {
        setErrorMessage('Please choose your seat');
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <Navbar />
      <VStack bg="#E5E5E5" px="5" py="10" mb="10">
        <Text fontSize="2xl" fontWeight="bold" mb="5">
          Choose Your Seat
        </Text>
        <VStack bg="white" borderRadius="10" py="10" px="3">
          <Box borderColor="#61876E" borderWidth="5" borderRadius="5" mb="5" />
          <HStack space="5">
            <Box>
              {alphabet.map((alpha, i) => {
                return (
                  <HStack key={String(i)} flexDirection="row">
                    {column1.map((num, index) => {
                      const seat = alpha + num;
                      return (
                        <Pressable
                          key={String(index)}
                          borderRadius="5"
                          m="0.5"
                          h="4"
                          w="4"
                          bg={selectSeat.includes(seat) ? '#61876E' : '#D6D8E7'}
                          onPress={() => handleChooseSeat(seat)}
                        />
                      );
                    })}
                  </HStack>
                );
              })}
            </Box>
            {/* RIGHT */}
            <Box>
              {alphabet.map((alpha, i) => {
                return (
                  <HStack key={String(i)} flexDirection="row">
                    {column2.map((num, index) => {
                      const seat = alpha + num;
                      return (
                        <Pressable
                          key={String(index)}
                          borderRadius="5"
                          m="0.5"
                          h="4"
                          w="4"
                          bg={selectSeat.includes(seat) ? '#A6BB8D' : '#D6D8E7'}
                          onPress={() => handleChooseSeat(seat)}
                        />
                      );
                    })}
                  </HStack>
                );
              })}
            </Box>
          </HStack>
          <Text my="5" fontWeight="bold" fontSize="lg">
            Seating key
          </Text>
          <HStack space="10">
            <VStack space="3">
              <HStack space="3" alignItems="center">
                <ArrowDown size={50} color="#14142B" />
                <Text fontSize="lg">A - G</Text>
              </HStack>
              <HStack space="3" alignItems="center">
                <Box w="4" h="4" borderRadius="5" bgColor="#D6D8E7" />
                <Text fontSize="lg" color="#4E4B66">
                  Available
                </Text>
              </HStack>
              <HStack space="3" alignItems="center">
                <Box w="4" h="4" borderRadius="5" bgColor="#6E7191" />
                <Text fontSize="lg" color="#4E4B66">
                  Sold
                </Text>
              </HStack>
            </VStack>
            <VStack space="3">
              <HStack space="3" alignItems="center">
                <ArrowRight size={50} color="#14142B" />
                <Text fontSize="lg">1 - 14</Text>
              </HStack>
              <HStack space="3" alignItems="center">
                <Box w="4" h="4" borderRadius="5" bgColor="#61876E" />
                <Text fontSize="lg" color="#4E4B66">
                  Selected
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <Text fontSize="2xl" fontWeight="bold" mb="5" pt="10">
          Order Info
        </Text>
        <VStack
          bg="white"
          borderRadius="10"
          py="10"
          px="3"
          alignItems="center"
          space="3">
          <Image
            source={{uri: cinemaPicture}}
            width="200px"
            height="50px"
            resizeMode="contain"
            alt="ticket"
          />
          <Text fontWeight="bold" fontSize="3xl">
            {cinemaName}
          </Text>
          <Text fontWeight="bold" fontSize="xl">
            {movieTitle}
          </Text>
          <VStack w="100%" mt="3" space="3">
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="#6B6B6B">
                {fixDate}
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="#14142B">
                {time} WIB
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="#6B6B6B">
                One ticket price
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="#14142B">
                Rp{Number(price).toLocaleString('id')}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" color="#6B6B6B">
                Seat Choosed
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="#14142B">
                {selectSeat.length ? selectSeat.join(', ') : '-'}
              </Text>
            </HStack>
          </VStack>
          <Box
            borderBottomWidth="1"
            w="100%"
            py="3"
            mb="3"
            borderBottomColor="#E6E6E6"
          />
          <HStack justifyContent="space-between" w="100%">
            <Text fontSize="md" fontWeight="bold">
              Total Payment
            </Text>
            <Text fontSize="md" fontWeight="bold" color="#61876E">
              Rp.{totalPrice}
            </Text>
          </HStack>
        </VStack>
        <Button
          mt="10"
          borderRadius="10"
          fontWeight="bold"
          fontSize="3xl"
          onPress={() => handleChekOut(totalPrice)}
          backgroundColor="#61876E">
          Checkout Now
        </Button>
        {errorMessage && (
          <Text
            fontSize="xl"
            color="red.500"
            textAlign="center"
            fontWeight="bold"
            mt="5">
            {errorMessage}
          </Text>
        )}
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default Order;
