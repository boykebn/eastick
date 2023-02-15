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
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';

import http from '../helpers/http';
import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';

const TicketResult = ({idTicket}) => {
  // const bookingDate = useSelector(state => state?.transaction.bookingDate);
  // const movieTitle = useSelector(state => state.transaction.movieTitle);
  // const totalPrice = useSelector(state => state.transaction.totalPrice);
  // const time = useSelector(state => state.transaction.time);
  // const price = useSelector(state => state.transaction.price);
  // const seatNum = useSelector(state => state.transaction.seatNum);

  // //set date
  // const date = moment(bookingDate).format('LLLL').split(' ');
  // const day = date[0];
  // const month = date[1];
  // const newDate = date[2];
  // const year = date[3];
  // const fixDate = `${day} ${month} ${newDate} ${year}`;

  const route = useRoute();
  const getIdTicket = route.params.idTicket;

  //FETCHING PROFILE ID
  const [ticket, setTicket] = React.useState({});
  const token = useSelector(state => state.auth.token);
  const fetchTicket = async () => {
    try {
      const response = await http(token).get(
        `/transaction/history/${getIdTicket}`,
      );
      setTicket(response?.data?.results);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    if (token) {
      fetchTicket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  //set Date
  const date = moment(ticket.bookingDate)
    .format('lll')
    .split(',')[0]
    .split(' ');
  const fixDate = `${date[1]} ${date[0]}`;

  const today = new Date();

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
            {new Date(ticket.bookingDate) >= today ? (
              <Stack>
                <Image
                  source={require('../assets/images/qr-code.png')}
                  alt="QR"
                />
              </Stack>
            ) : (
              <Stack>
                <Image
                  source={require('../assets/images/expired.png')}
                  alt="QR"
                />
              </Stack>
            )}
            <Stack direction={'row'} alignItems={'center'}>
              <Box
                borderBottomWidth={2}
                flex={1}
                borderStyle={'dashed'}
                borderBottomColor={'gray.400'}
              />
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: 44, height: 44, borderRadius: 44, left: -40}}
                position={'absolute'}
                left={-22}
                backgroundColor={'#F5F6F8'}
              />
              <View
                position={'absolute'}
                right={-22}
                // eslint-disable-next-line react-native/no-inline-styles
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
                  {ticket?.movieTitle}
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
                  {ticket?.seatnum ? ticket?.seatnum.split(',').length : null}{' '}
                </Text>
              </VStack>
            </VStack>
            <VStack space="5">
              <VStack space="2">
                <Text color="#AAAAAA">Category</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {ticket?.genre}
                </Text>
              </VStack>
              <VStack space="2">
                <Text color="#AAAAAA">Time</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {ticket?.time} WIB
                </Text>
              </VStack>

              <VStack space="2">
                <Text color="#AAAAAA">Seats</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {ticket?.seatnum
                    ? ticket?.seatnum.length <= 10
                      ? ticket?.seatnum
                      : `${ticket?.seatnum.slice(0, 10)}...`
                    : null}
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
              Rp.{ticket?.totalPrice}
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default TicketResult;
