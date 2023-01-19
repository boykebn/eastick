import React from 'react';
import {
  ScrollView,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Alert,
  CloseIcon,
  IconButton,
  FormControl,
  Stack,
  Input,
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import http from '../helpers/http';

// Form Validation
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = React.useState('');

  const reqForgotPassword = async form => {
    try {
      const {data} = await http().post('/auth/forgotPassword', form);

      navigation.navigate('ResetPassword', {
        email: data.email,
      });
    } catch (error) {
      setErrorMessage('email not registered');
    }
  };
  return (
    <ScrollView>
      <Stack p="5">
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
          <Text style={styles.h1}>Forgot Password</Text>
          <Text style={styles.text}>
            we'll send a link to your email shortly
          </Text>
        </View>
      </Stack>

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

      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={reqForgotPassword}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
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
          </Stack>
        )}
      </Formik>
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
    marginTop: 15,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default ForgotPassword;
