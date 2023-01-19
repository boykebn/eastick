/* eslint-disable react-hooks/exhaustive-deps */
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
  Stack,
} from 'native-base';
import React, {Component} from 'react';
import {Eye, EyeOff} from 'react-native-feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import {logoutAction} from '../redux/reducers/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

// Form Validation
const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1')
    .required('Required'),
  confirmPassword: Yup.string().required('Required'),
});

const Profile = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const dispatch = useDispatch();

  // Logout action
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  // NAVIGATION
  const navigation = useNavigation();

  // get data Profile
  const [getProfile, setGetProfile] = React.useState({});
  // console.log(`https://192.168.1.9:8888/assets/uploads/${getProfile?.picture}`);
  const token = useSelector(state => state.auth.token);
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
  }, [token]);

  // update data profile
  const [fullName, setFullName] = React.useState('');
  const firstName = String(fullName).split(' ')[0];
  const lastName = String(fullName).split(' ').slice(1).join(' ');
  const [email, setEmail] = React.useState('');
  const [phoneNUm, setPhoneNUm] = React.useState('');

  const [successMessage, setSuccessMessage] = React.useState('');

  const updateDataUser = async () => {
    try {
      const response = await http(token).patch('/profile/updated', {
        firstName,
        lastName,
        email,
        phoneNUm,
      });
      setSuccessMessage('Data succes updated!');
      setTimeout(() => {}, 2000);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Show or hide password
  const [show, setShow] = React.useState(false);

  // change password
  const [passwordMsgSuccess, setPasswordMsgSuccess] = React.useState('');
  const [samePasswordMessage, setSamePasswordMessage] = React.useState('');
  const changeUpdatePassword = async values => {
    try {
      if (values.password === values.confirmPassword) {
        const {password, confirmPassword} = values;
        const response = await http(token).patch('/profile/updated', {
          password,
          confirmPassword,
        });
        setPasswordMsgSuccess('Password succes updated!');
        setTimeout(() => {}, 2000);
        return response;
      } else {
        setSamePasswordMessage('Password and confirm password not match');
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            <Text
              color="white"
              fontWeight="bold"
              fontSize="lg"
              pb="2"
              borderBottomColor="white"
              borderBottomWidth="3">
              Details Account
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('History')}>
            <Text color="gray.400" fontWeight="bold" fontSize="lg">
              Order History
            </Text>
          </Pressable>
        </HStack>
      </VStack>
      <VStack bg="#E5E5E5" px="3" py="5" space="5">
        <VStack bg="white" borderRadius="10" space="3">
          <Text fontSize="lg" p="5">
            INFO
          </Text>
          <VStack alignItems="center" space="3">
            <Box shadow="9">
              {getProfile?.picture ? (
                <Image
                  // source={{
                  //   uri: `https://192.168.1.9:8888/assets/uploads/${getProfile?.picture}`,
                  // }}
                  // source={{uri: getProfile?.picture}}
                  alt="profile"
                  width="100"
                  height="100"
                  borderRadius="full"
                  shadow="9"
                />
              ) : (
                <Image
                  source={require('../assets/images/dummyAvatar.jpg')}
                  alt="profile"
                  width="100"
                  height="100"
                  borderRadius="full"
                  shadow="9"
                />
              )}
            </Box>
            <Text fontSize="xl" fontWeight="bold">
              {getProfile?.firstName} {getProfile?.lastName}
            </Text>
            <Text color="#4E4B66">Eastick People</Text>
          </VStack>
          <Box borderWidth="1" borderColor="#DEDEDE" />
          <Box alignItems="center" p="5">
            <Button
              width="50%"
              borderRadius="10"
              _pressed={{bg: '#A6BB8D'}}
              bg="#61876E"
              onPress={() => dispatch(handleLogout())}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Log out
              </Text>
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

          {successMessage && (
            <Box
              borderWidth="1"
              borderColor="green.500"
              borderRadius="5"
              background="green.200">
              <Text color="green.500" textAlign="center" fontSize="lg">
                {successMessage}
              </Text>
            </Box>
          )}

          <VStack space="2">
            <Text fontSize="lg">Full Name</Text>
            <Input
              onChangeText={value => setFullName(value)}
              onFocus={() => setSuccessMessage('')}
              defaultValue={`${getProfile?.firstName} ${getProfile?.lastName}`}
              borderColor="black"
              borderRadius="10"
            />
          </VStack>
          <VStack space="2">
            <Text fontSize="lg">E-mail</Text>
            <Input
              onChangeText={value => setEmail(value)}
              onFocus={() => setSuccessMessage('')}
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
                defaultValue={getProfile.phoneNUm}
                onChangeText={value => setPhoneNUm(value)}
                onFocus={() => setSuccessMessage('')}
                borderColor="white"
                borderX="0"
                borderRadius="10"
                width="243"
                keyboardType="number"
              />
            </HStack>
          </VStack>
        </VStack>
        <Button
          onPress={updateDataUser}
          mb="10"
          borderRadius="10"
          fontWeight="bold"
          fontSize="3xl"
          _pressed={{bg: '#A6BB8D'}}
          bg="#61876E">
          Update Changes
        </Button>

        <Formik
          initialValues={{password: '', confirmPassword: ''}}
          validationSchema={changePasswordSchema}
          onSubmit={values => changeUpdatePassword(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <VStack bg="white" p="5" borderRadius="10" space="5">
                <VStack space="2">
                  <Text fontSize="lg">Account and Privacy</Text>
                  <Box borderWidth="1" borderColor="#DEDEDE" />
                </VStack>

                {passwordMsgSuccess && (
                  <Box
                    borderWidth="1"
                    borderColor="green.500"
                    borderRadius="5"
                    background="green.200">
                    <Text color="green.500" textAlign="center" fontSize="lg">
                      {passwordMsgSuccess}
                    </Text>
                  </Box>
                )}

                {samePasswordMessage && (
                  <Box
                    borderWidth="1"
                    borderColor="red.500"
                    borderRadius="5"
                    background="red.200">
                    <Text color="red.500" textAlign="center" fontSize="lg">
                      {samePasswordMessage}
                    </Text>
                  </Box>
                )}

                <VStack space="2">
                  <Text fontSize="lg">New Password</Text>
                  <Box position="relative">
                    <Input
                      onFocus={() => setPasswordMsgSuccess('')}
                      name="password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
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
                    {errors.password && touched.password ? (
                      <Text color="red.500">{errors.password}</Text>
                    ) : null}
                  </Box>
                  <Text fontSize="lg">Confirm Password</Text>
                  <Box position="relative">
                    <Input
                      onFocus={() => setPasswordMsgSuccess('')}
                      name="confirmPassword"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
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

                    {errors.password && touched.password ? (
                      <Text color="red.500">{errors.password}</Text>
                    ) : null}
                  </Box>
                </VStack>
              </VStack>
              <Button
                onPress={handleSubmit}
                mt="5"
                borderRadius="10"
                fontWeight="bold"
                fontSize="3xl"
                _pressed={{bg: '#A6BB8D'}}
                bg="#61876E">
                Update Changes
              </Button>
            </>
          )}
        </Formik>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default Profile;
