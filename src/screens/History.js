import {
  Text,
  HStack,
  VStack,
  Image,
  Box,
  Button,
  ScrollView,
  Pressable,
} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import {cancelTransaction} from '../redux/reducers/transaction';
import http from '../helpers/http';
import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';

const History = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const bookingDate = useSelector(state => state?.transaction.bookingDate);
  // const movieTitle = useSelector(state => state.transaction.movieTitle);
  // const cinemaPicture = useSelector(state => state.transaction.cinemaPicture);
  // const time = useSelector(state => state.transaction.time);

  // //set date
  // const date = moment(bookingDate).format('LLLL').split(' ');
  // const day = date[0];
  // const month = date[1];
  // const newDate = date[2];
  // const year = date[3];
  // const fixDate = `${day} ${month} ${newDate} ${year}`;

  const [history, setHistory] = React.useState([]);
  // console.log(history)
  const token = useSelector(state => state.auth.token);
  const fetchHistory = async () => {
    try {
      const response = await http(token).get('/transaction/history');
      setHistory(response?.data?.results);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    dispatch(cancelTransaction());
    if (token) {
      fetchHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const today = new Date();

  return (
    <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
      <Navbar />
      <VStack bg="#E5E5E5">
        <HStack
          justifyContent="space-around"
          bg="#A6BB8D"
          p="5"
          borderBottomRadius="20">
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Text color="gray.400" fontWeight="bold" fontSize="lg">
              Details Account
            </Text>
          </Pressable>

          <Text
            color="white"
            fontWeight="bold"
            fontSize="lg"
            pb="2"
            borderBottomColor="white"
            borderBottomWidth="3">
            Order History
          </Text>
        </HStack>
      </VStack>
      <VStack bg="#E5E5E5" px="3" py="5" space="5">
        {history?.map(item => {
          return (
            <VStack
              key={String(item.id)}
              bg="white"
              borderRadius="10"
              space="3"
              py="6">
              <VStack px="6" space="3">
                <Image
                  source={{uri: item?.picture}}
                  alt="ticket"
                  width="200"
                  height="50"
                  resizeMode="contain"
                />
                <Text fontSize="sm" color="#AAAAAA">
                  {moment(item?.bookingDate).format('llll').slice(0, 18)} -{' '}
                  {/* {item.time.split(':')[0] +
                    ':' +
                    item.time.split(':')[1] +
                    ' WIB'} */}
                  {item.time} WIB
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {item?.movieTitle}
                </Text>
              </VStack>
              <Box borderWidth="1" borderColor="#DEDEDE" my="3" />
              <Box px="6">
                {new Date(item.bookingDate) >= today ? (
                  <Button
                    onPress={() =>
                      navigation.navigate('TicketResult', {idTicket: item.id})
                    }
                    bgColor="#A6BB8D"
                    borderRadius="10"
                    fontWeight="bold">
                    Ticket in active
                  </Button>
                ) : (
                  <Button
                    onPress={() =>
                      navigation.navigate('TicketResult', {idTicket: item.id})
                    }
                    bgColor="#AAAAAA"
                    borderRadius="10"
                    fontWeight="bold">
                    Ticket is Expired
                  </Button>
                )}
              </Box>
            </VStack>
          );
        })}
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default History;
