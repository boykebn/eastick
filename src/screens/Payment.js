import {
  Box,
  FlatList,
  HStack,
  Image,
  Input,
  Text,
  View,
  VStack,
  Button,
  ScrollView,
} from 'native-base';
import React, {Component} from 'react';
import {AlertTriangle} from 'react-native-feather';
import Footer from '../components/Footer';
import Navbar from '../components/NavbarUser';
import {useNavigation} from '@react-navigation/native';

const Payment = () => {
  const navigation = useNavigation();
  return (
    <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
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
            $30
          </Text>
        </HStack>
      </VStack>
      <VStack bg="#E5E5E5" px="5" space="5" pt="10">
        <Text fontSize="2xl" fontWeight="bold">
          Payment Method
        </Text>
        <VStack bg="white" p="5" borderRadius="10" space="5">
          <HStack space="2" alignItems="center" justifyContent="center">
            <VStack
              borderWidth="1"
              borderRadius="10"
              px="3"
              py="2"
              space="2"
              alignItems="center"
              w="100">
              <Image
                source={require('../assets/images/ovo.png')}
                alt="OVO"
                width="43"
                height="14"
              />
            </VStack>
            <VStack
              borderWidth="1"
              borderRadius="10"
              px="3"
              py="2"
              space="2"
              alignItems="center"
              w="100">
              <Image
                source={require('../assets/images/dana.png')}
                alt="Dana"
                width="51"
                height="14"
              />
            </VStack>
            <VStack
              borderWidth="1"
              borderRadius="10"
              px="3"
              py="2"
              space="2"
              alignItems="center"
              w="100">
              <Image
                source={require('../assets/images/gopay.png')}
                alt="Gopay"
                width="50"
                height="14"
              />
            </VStack>
          </HStack>
          <HStack space="2" alignItems="center" justifyContent="center">
            <VStack
              borderWidth="1"
              borderRadius="10"
              px="3"
              py="2"
              space="2"
              alignItems="center"
              w="100">
              <Image
                source={require('../assets/images/google-pay.png')}
                alt="Gpay"
                width="35"
                height="14"
              />
            </VStack>
            <VStack
              borderWidth="1"
              borderRadius="10"
              px="3"
              py="2"
              space="2"
              alignItems="center"
              w="100">
              <Image
                source={require('../assets/images/visa.png')}
                alt="Visa"
                width="55"
                height="18"
              />
            </VStack>
            <VStack
              borderWidth="1"
              borderRadius="10"
              px="3"
              py="2"
              space="2"
              alignItems="center"
              w="100">
              <Image
                source={require('../assets/images/paypal.png')}
                alt="Paypal"
                width="15"
                height="19"
              />
            </VStack>
          </HStack>
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
              placeholder="Boyke Berry Nugraha"
              borderRadius="10"
              borderColor="black"
            />
          </VStack>
          <VStack space="2">
            <Text fontSize="lg">Email</Text>
            <Input
              placeholder="boykeberryn@gmail.com"
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
              <Input width="80%" placeholder="81388262406" borderWidth="0" />
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
        <Button
          mb="10"
          borderRadius="10"
          fontWeight="bold"
          fontSize="3xl"
          onPress={() => navigation.navigate('History')}
          backgroundColor="#61876E">
          Pay your order
        </Button>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default Payment;
