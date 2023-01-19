import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Pressable,
  HStack,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
  FormControl,
  Stack,
  Input,
  Box,
  Button,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';

// Form Validation
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1'),
  confirmPassword: Yup.string().required('Required'),
});

const ResetPassword = ({route}) => {
  // Show or hide password
  const [show, setShow] = React.useState(false);

  //reset password handle
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigation = useNavigation();
  const email = route.params.email;
  console.log(email);

  const resetPasswordHandle = async form => {
    try {
      if (form.password === form.confirmPassword) {
        const {codeUnique, email, password, confirmPassword} = form;
        const {data} = await http().post('/auth/resetPassword', {
          codeUnique,
          email,
          password,
          confirmPassword,
        });

        navigation.navigate('Login', {
          message: 'Password has been updated, please relogin',
        });
      } else {
        setErrorMessage('Password and confirm password not match');
      }
    } catch (err) {
      setErrorMessage(err?.response?.data?.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.containerImage}>
        <Image
          source={require('../assets/images/logo-eastick.png')}
          style={styles.image}
          alt="logo"
          width="100"
          height="60"
          resizeMode="center"
        />
      </View>
      <View style={styles.containerHead}>
        <Text style={styles.h1}>Set Password</Text>
        <Text style={styles.text}>set your new password</Text>
      </View>

      {errorMessage && (
        <Alert w="100%" status="error" mb="3">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {errorMessage}
                </Text>
              </HStack>
              <IconButton
                onPress={() => setErrorMessage('')}
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'coolGray.600',
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      )}

      <View style={styles.containerForm}>
        <Formik
          initialValues={{
            codeUnique: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={resetPasswordHandle}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Stack space="sm" p="8">
                <FormControl
                  isInvalid={errors.codeUnique && touched.codeUnique}>
                  <Stack>
                    <FormControl.Label fontSize={15}>code</FormControl.Label>
                    <Input
                      onChangeText={handleChange('codeUnique')}
                      onBlur={handleBlur('codeUnique')}
                      value={values.codeUnique}
                      variant="outline"
                      p={2}
                      placeholder="Write your code"
                      placeholderTextColor={'#AAA'}
                      fontSize={15}
                    />
                    {errors.codeUnique && (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <Icon name="alert-circle" size={18} color="red" />
                        }>
                        {errors.codeUnique}
                      </FormControl.ErrorMessage>
                    )}
                  </Stack>
                </FormControl>

                <FormControl isInvalid={errors.email && touched.email}>
                  <Stack>
                    <FormControl.Label fontSize={15}>Email</FormControl.Label>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      variant="outline"
                      p={2}
                      placeholder="Write your email"
                      placeholderTextColor={'#AAA'}
                      fontSize={15}
                    />
                    {errors.email && (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <Icon name="alert-circle" size={18} color="red" />
                        }>
                        {errors.email}
                      </FormControl.ErrorMessage>
                    )}
                  </Stack>
                </FormControl>

                <FormControl isInvalid={errors.password && touched.password}>
                  <Stack mb={5}>
                    <FormControl.Label fontSize={15}>
                      Password
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      w={{
                        base: '100%',
                        md: '25%',
                      }}
                      type={show ? 'text' : 'password'}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Box mr={3}>
                            <Icon
                              name={show ? 'eye' : 'eye-off'}
                              size={20}
                              color="muted.400"
                            />
                          </Box>
                        </Pressable>
                      }
                      fontSize={15}
                      placeholderTextColor={'#AAA'}
                      placeholder="Write your password"
                    />
                    {errors.password && (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <Icon name="alert-circle" size={18} color="red" />
                        }>
                        {errors.password}
                      </FormControl.ErrorMessage>
                    )}
                  </Stack>
                </FormControl>
                <FormControl
                  isInvalid={errors.confirmPassword && touched.confirmPassword}>
                  <Stack mb={5}>
                    <FormControl.Label fontSize={15}>
                      Confirm Password
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      w={{
                        base: '100%',
                        md: '25%',
                      }}
                      type={show ? 'text' : 'password'}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Box mr={3}>
                            <Icon
                              name={show ? 'eye' : 'eye-off'}
                              size={20}
                              color="muted.400"
                            />
                          </Box>
                        </Pressable>
                      }
                      fontSize={15}
                      placeholderTextColor={'#AAA'}
                      placeholder="Write your confirm password"
                    />
                    {errors.confirmPassword && (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <Icon name="alert-circle" size={18} color="red" />
                        }>
                        {errors.confirmPassword}
                      </FormControl.ErrorMessage>
                    )}
                  </Stack>
                  <Stack>
                    <Button
                      bg="#3C6255"
                      _pressed={{bg: '#A6BB8D'}}
                      onPress={handleSubmit}
                      // isLoading={!isLoading}
                    >
                      Submit
                    </Button>
                  </Stack>
                </FormControl>
              </Stack>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    paddingBottom: 0,
  },
  containerHead: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  containerForm: {
    marginTop: 30,
  },
  containerInput: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 50,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
  containerBtn: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#3C6255',
    borderRadius: 12,
  },
  textBtn: {
    fontWeight: 'bold',
    color: 'white',
  },
  containerText2: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  text2: {
    textAlign: 'center',
  },
  innerText2: {
    color: '#00005C',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default ResetPassword;
