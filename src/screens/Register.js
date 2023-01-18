import React from 'react';
import {
  Box,
  View,
  Text,
  Stack,
  Image,
  Input,
  Button,
  ScrollView,
  FormControl,
  Pressable,
  Alert,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {registerAction} from '../redux/actions/auth';

// Validation Schema
const RegistSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNUm: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .password()
    .min(8, 'Min lenght 8')
    .minLowercase(1, 'Min lowercase 1')
    .minUppercase(1, 'Min uppercase 1')
    .minSymbols(1, 'Min symbol 1')
    .minNumbers(1, 'Min number 1')
    .required('Required'),
});

const Register = () => {
  const navigation = useNavigation();

  const [show, setShow] = React.useState(false);
  const message = useSelector(state => state.auth.message);
  const isLoading = useSelector(state => state.auth.isLoading);

  console.log(message);
  const dispatch = useDispatch();

  const RegistHandle = value => {
    dispatch(registerAction({value}));
  };

  return (
    <ScrollView>
      <Stack p="8" pb="0">
        <Stack space="2">
          <Image
            source={require('../assets/images/logo-eastick.png')}
            alt="logo"
            width="100"
            height="60"
            resizeMode="center"
          />
        </Stack>
        <Stack>
          <Text fontSize="30" fontWeight="bold">
            Sign Up
          </Text>
          <Text color="#AAA">Fill your additional details</Text>
        </Stack>
      </Stack>

      {message && (
        <Box my={5}>
          <Alert status={'error'}>
            <Text fontWeight={'bold'}>{message}</Text>
          </Alert>
        </Box>
      )}

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNUm: '',
          email: '',
          password: '',
        }}
        validationSchema={RegistSchema}
        onSubmit={RegistHandle}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Stack space="sm" p="8">
            <FormControl isInvalid={errors.firstName && touched.firstName}>
              <Stack>
                <FormControl.Label fontSize={15}>First Name</FormControl.Label>
                <Input
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  variant="outline"
                  p={2}
                  placeholder="Write your first name"
                  placeholderTextColor={'#AAA'}
                  fontSize={15}
                />
                {errors.firstName && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" size={18} color="red" />
                    }>
                    {errors.firstName}
                  </FormControl.ErrorMessage>
                )}
              </Stack>
            </FormControl>
            <FormControl isInvalid={errors.lastName && touched.lastName}>
              <Stack>
                <FormControl.Label fontSize={15}>Last Name</FormControl.Label>
                <Input
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  variant="outline"
                  p={2}
                  placeholder="Write your last name"
                  placeholderTextColor={'#AAA'}
                  fontSize={15}
                />
                {errors.lastName && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" size={18} color="red" />
                    }>
                    {errors.lastName}
                  </FormControl.ErrorMessage>
                )}
              </Stack>
            </FormControl>
            <FormControl isInvalid={errors.phoneNUm && touched.phoneNUm}>
              <Stack>
                <FormControl.Label fontSize={15}>
                  Phone Number
                </FormControl.Label>
                <Input
                  onChangeText={handleChange('phoneNUm')}
                  onBlur={handleBlur('phoneNUm')}
                  value={values.phoneNUm}
                  variant="outline"
                  p={2}
                  placeholder="Write your phone number"
                  placeholderTextColor={'#AAA'}
                  fontSize={15}
                  keyboardType="number-pad"
                />
                {errors.phoneNUm && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="alert-circle" size={18} color="red" />
                    }>
                    {errors.phoneNUm}
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
                <FormControl.Label fontSize={15}>Password</FormControl.Label>
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
            <Stack space="2">
              <Button
                bg="#3C6255"
                _pressed={{bg: '#A6BB8D'}}
                onPress={handleSubmit}
                isLoading={!isLoading}>
                Sign Up
              </Button>

              <View style={{flex: 1, alignItems: 'center', marginTop: 15}}>
                <Text style={{fontSize: 17}}>
                  Already have account?{' '}
                  <Text
                    onPress={() => navigation.navigate('Login')}
                    style={{color: '#1b30cf', textDecorationLine: 'underline'}}>
                    Sign In
                  </Text>
                </Text>
              </View>
            </Stack>
          </Stack>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Register;
