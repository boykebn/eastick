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
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {loginAction as handleLogin} from '../redux/actions/auth';

// Validation Schema
const LoginSchema = Yup.object().shape({
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

const Login = () => {
  const navigation = useNavigation();

  const [show, setShow] = React.useState(false);
  const message = useSelector(state => state?.auth?.message);
  const isLoading = useSelector(state => state.auth.isLoading);

  // console.log(process.env.BASE_URL_BACKEND);

  const dispatch = useDispatch();

  const LoginHandle = async value => {
    dispatch(handleLogin({value}));
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
            Sign In
          </Text>
          <Text color="#AAA">
            Sign in with your data that you entered during your registration
          </Text>
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
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={LoginHandle}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Stack space="sm" p="8">
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
                // isLoading={!isLoading}
              >
                Sign In
              </Button>

              <View style={{flex: 1, alignItems: 'center', marginTop: 15}}>
                <Text style={{fontSize: 15}}>
                  Forgot your password?{' '}
                  <Text
                    style={{color: '#1b30cf', textDecorationLine: 'underline'}}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    Reset now
                  </Text>
                </Text>
              </View>

              <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
                <Text style={{fontSize: 15}}>
                  Don't have an account?{' '}
                  <Text
                    style={{color: '#1b30cf', textDecorationLine: 'underline'}}
                    onPress={() => navigation.navigate('Register')}>
                    Sign Up
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

export default Login;
