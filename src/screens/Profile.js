import {
  Text,
  View,
  VStack,
  HStack,
  Image,
  Box,
  Button,
  Input,
  Pressable,
  ScrollView,
} from 'native-base';
import React, {Component} from 'react';
import {Eye, EyeOff} from 'react-native-feather';

import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';

const Profile = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  return (
    <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
      <Navbar />
      <VStack bg="#E5E5E5">
        <HStack
          justifyContent="space-around"
          bg="#A6BB8D"
          p="5"
          borderBottomRadius="20">
          <Text
            color="white"
            fontWeight="bold"
            fontSize="lg"
            pb="2"
            borderBottomColor="white"
            borderBottomWidth="3">
            Details Account
          </Text>
          <Text color="gray.400" fontWeight="bold" fontSize="lg">
            Order History
          </Text>
        </HStack>
      </VStack>
      <VStack bg="#E5E5E5" px="3" py="5" space="5">
        <VStack bg="white" borderRadius="10" space="3">
          <Text fontSize="lg" p="5">
            INFO
          </Text>
          <VStack alignItems="center" space="3">
            <Box shadow="9">
              <Image
                source={require('../assets/images/photo-profile.png')}
                alt="profile"
                width="100"
                height="100"
                borderRadius="full"
                shadow="9"
              />
            </Box>
            <Text fontSize="xl" fontWeight="bold">
              Boyke Berry Nugraha
            </Text>
            <Text color="#4E4B66">Eastick People</Text>
          </VStack>
          <Box borderWidth="1" borderColor="#DEDEDE" />
          <Box alignItems="center" p="5">
            <Button width="50%" borderRadius="10" backgroundColor="#61876E">
              Log out
            </Button>
          </Box>
        </VStack>
        <Text fontSize="2xl" fontWeight="bold">
          Account Settings
        </Text>
        <VStack bg="white" p="5" borderRadius="10" space="5">
          <VStack space="2">
            <Text fontSize="lg">Details Information</Text>
            <Box borderWidth="1" borderColor="#DEDEDE" />
          </VStack>
          <VStack space="2">
            <Text fontSize="lg">Full Name</Text>
            <Input
              placeholder="Boyke Berry Nugraha"
              borderColor="black"
              borderRadius="10"
            />
          </VStack>
          <VStack space="2">
            <Text fontSize="lg">E-mail</Text>
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
        </VStack>
        <Button
          mb="10"
          borderRadius="10"
          fontWeight="bold"
          fontSize="3xl"
          backgroundColor="#61876E">
          Update Changes
        </Button>

        <VStack bg="white" p="5" borderRadius="10" space="5">
          <VStack space="2">
            <Text fontSize="lg">Account and Privacy</Text>
            <Box borderWidth="1" borderColor="#DEDEDE" />
          </VStack>
          <VStack space="2">
            <Text fontSize="lg">New Password</Text>
            <Box position="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                borderColor="black"
                placeholder="Write your new password"
                borderRadius="10"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye
                    color="black"
                    position="absolute"
                    style={{bottom: 10, right: 20}}
                  />
                ) : (
                  <EyeOff
                    color="black"
                    position="absolute"
                    style={{bottom: 10, right: 20}}
                  />
                )}
              </Pressable>
            </Box>
            <Text fontSize="lg">Confirm Password</Text>
            <Box position="relative">
              <Input
                type={showPassword2 ? 'text' : 'password'}
                borderColor="black"
                placeholder="Write your confirm password"
                borderRadius="10"
              />
              <Pressable onPress={() => setShowPassword2(!showPassword2)}>
                {showPassword2 ? (
                  <Eye
                    color="black"
                    position="absolute"
                    style={{bottom: 10, right: 20}}
                  />
                ) : (
                  <EyeOff
                    color="black"
                    position="absolute"
                    style={{bottom: 10, right: 20}}
                  />
                )}
              </Pressable>
            </Box>
          </VStack>
        </VStack>

        <Button
          mb="10"
          borderRadius="10"
          fontWeight="bold"
          fontSize="3xl"
          backgroundColor="#61876E">
          Update Changes
        </Button>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default Profile;
