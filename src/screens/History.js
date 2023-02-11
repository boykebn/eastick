import {
  Text,
  View,
  HStack,
  VStack,
  Image,
  Box,
  Button,
  ScrollView,
  Pressable,
} from 'native-base';
import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';

import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';

const History = () => {
  const navigation = useNavigation();

  const bookingDate = useSelector(state => state?.transaction.bookingDate);
  const movieTitle = useSelector(state => state.transaction.movieTitle);
  const cinemaPicture = useSelector(state => state.transaction.cinemaPicture);
  const time = useSelector(state => state.transaction.time);

  //set date
  const date = moment(bookingDate).format('LLLL').split(' ');
  const day = date[0];
  const month = date[1];
  const newDate = date[2];
  const year = date[3];
  const fixDate = `${day} ${month} ${newDate} ${year}`;
  return (
    <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={false}>
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
        <VStack bg="white" borderRadius="10" space="3" py="6">
          <VStack px="6" space="3">
            <Image
              source={{uri: cinemaPicture}}
              width="50px"
              height="50px"
              resizeMode="contain"
              alt="ticket"
            />
            <Text fontSize="sm" color="#AAAAAA">
              {fixDate} - {time} WIB
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {movieTitle}
            </Text>
          </VStack>
          <Box borderWidth="1" borderColor="#DEDEDE" my="3" />
          <Box px="6">
            <Button
              backgroundColor="#A6BB8D"
              borderRadius="10"
              fontWeight="bold"
              onPress={() => navigation.navigate('TicketResult')}>
              Ticket in active
            </Button>
          </Box>
        </VStack>
        <VStack bg="white" borderRadius="10" space="3" py="6">
          <VStack px="6" space="3">
            <Image
              source={require('../assets/images/ebv-vector.png')}
              alt="ticket"
            />
            <Text fontSize="lg" color="#AAAAAA">
              Monday, 14 June 2020 - 02:00pm
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              Avengers: End Game
            </Text>
          </VStack>
          <Box borderWidth="1" borderColor="#DEDEDE" my="3" />
          <Box px="6">
            <Button
              backgroundColor="#6E7191"
              borderRadius="10"
              fontWeight="bold">
              Ticket Expired
            </Button>
          </Box>
        </VStack>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default History;
