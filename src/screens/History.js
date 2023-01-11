import {
  Text,
  View,
  HStack,
  VStack,
  Image,
  Box,
  Button,
  ScrollView,
} from 'native-base';
import React, {Component} from 'react';
import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';

const History = () => {
  return (
    <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={false}>
      <Navbar />
      <VStack bg="#E5E5E5">
        <HStack
          justifyContent="space-around"
          bg="#A6BB8D"
          p="5"
          borderBottomRadius="20">
          <Text color="gray.400" fontWeight="bold" fontSize="lg">
            Details Account
          </Text>
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
              source={require('../assets/images/cineone21.png')}
              alt="ticket"
            />
            <Text fontSize="lg" color="#AAAAAA">
              Tuesday, 07 July 2020 - 04:30pm
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              Spider-Man: Homecoming
            </Text>
          </VStack>
          <Box borderWidth="1" borderColor="#DEDEDE" my="3" />
          <Box px="6">
            <Button
              backgroundColor="#A6BB8D"
              borderRadius="10"
              fontWeight="bold">
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
              Ticket in active
            </Button>
          </Box>
        </VStack>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default History;
