import {
  Text,
  HStack,
  VStack,
  Image,
  Stack,
  View,
  Box,
  ScrollView,
} from 'native-base';
import React, {Component} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';

import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';

const TicketResult = () => {
  const bookingDate = useSelector(state => state?.transaction.bookingDate);
  const movieTitle = useSelector(state => state.transaction.movieTitle);
  const totalPrice = useSelector(state => state.transaction.totalPrice);
  const time = useSelector(state => state.transaction.time);
  const price = useSelector(state => state.transaction.price);
  const seatNum = useSelector(state => state.transaction.seatNum);

  //set date
  const date = moment(bookingDate).format('LLLL').split(' ');
  const day = date[0];
  const month = date[1];
  const newDate = date[2];
  const year = date[3];
  const fixDate = `${day} ${month} ${newDate} ${year}`;
  return (
    <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
      <Navbar />
      <VStack bg="#F5F6F8" p="10">
        <VStack
          bg="white"
          p="5"
          borderRadius="10"
          position="relative"
          space="10">
          <VStack alignItems="center">
            <Stack>
              <Image
                source={require('../assets/images/qr-code.png')}
                alt="QR"
              />
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Box
                borderBottomWidth={2}
                flex={1}
                borderStyle={'dashed'}
                borderBottomColor={'gray.400'}
              />
              <View
                style={{width: 44, height: 44, borderRadius: 44, left: -40}}
                position={'absolute'}
                left={-22}
                backgroundColor={'#F5F6F8'}
              />
              <View
                position={'absolute'}
                right={-22}
                style={{width: 44, height: 44, borderRadius: 44, right: -40}}
                backgroundColor={'#F5F6F8'}
              />
            </Stack>
          </VStack>
          <HStack justifyContent="space-between">
            <VStack space="5">
              <VStack space="2">
                <Text color="#AAAAAA">Movie</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {movieTitle}
                </Text>
              </VStack>
              <VStack space="2">
                <Text color="#AAAAAA">Date</Text>
                <Text fontSize="xs" fontWeight="bold">
                  {fixDate}
                </Text>
              </VStack>

              <VStack space="2">
                <Text color="#AAAAAA">Count</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {totalPrice / price} pcs
                </Text>
              </VStack>
            </VStack>
            <VStack space="5">
              <VStack space="2">
                <Text color="#AAAAAA">Category</Text>
                <Text fontSize="sm" fontWeight="bold">
                  Action
                </Text>
              </VStack>
              <VStack space="2">
                <Text color="#AAAAAA">Time</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {time} WIB
                </Text>
              </VStack>

              <VStack space="2">
                <Text color="#AAAAAA">Seats</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {seatNum.join(', ')}
                </Text>
              </VStack>
            </VStack>
          </HStack>
          <HStack
            justifyContent="space-between"
            borderWidth="1"
            borderRadius="lg"
            p="4"
            borderColor="#DEDEDE">
            <Text fontSize="xl" fontWeight="bold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              Rp.{totalPrice}
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default TicketResult;
