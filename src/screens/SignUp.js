import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
// import {Spinner} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPasword from 'yup-password';
YupPasword(Yup);
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {registerAction} from '../redux/actions/auth';
import http from '../helpers/http';

const SignUp = () => {
  // Form Validation
  const phoneRegExpID = /^(^08)(\d{8,10})$/;
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExpID, 'Invalid phone number')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .password()
      .min(8, 'Min lenght 8')
      .minLowercase(1, 'Min lowercase 1')
      .minUppercase(1, 'Min uppercase 1')
      .minSymbols(1, 'Min symbol 1')
      .minNumbers(1, 'Min number 1'),
  });

  // Show or hide password
  const [isPasswordSecure, setIspasswordSecure] = React.useState(true);
  const [iconEye, setIconEye] = React.useState(true);
  const showPassword = () => {
    if (iconEye === true) {
      setIspasswordSecure(false);
      setIconEye(false);
    } else {
      setIspasswordSecure(true);
      setIconEye(true);
    }
  };

  // Navigation
  const navigation = useNavigation();

  // integrasi signup
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const RegistHandle = async form => {
    try {
      const response = await http().post('/auth/register', form);
      const token = response?.data?.results;
      setSuccessMessage(response?.data?.message);
      setTimeout(() => {
        dispatch(registerAction(token));
      }, 1000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Register Failed. ' + error?.response?.data?.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.containerImage}>
        <Image
          source={require('../assets/images/logo-eastick.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.containerHead}>
        <Text style={styles.h1}>Sign Up</Text>
        <Text style={styles.text}>Fill your additional details</Text>
      </View>
      {successMessage && (
        <>
          <View style={styles.alertSuccess}>
            <Icon name="alert-circle" size={20} color="black" />
            <Text style={styles.alertMessage}>{successMessage}</Text>
          </View>
          {/* <Spinner style={{marginTop: 20}} size="lg" /> */}
        </>
      )}
      {errorMessage && (
        <View style={styles.alertError}>
          <Icon name="alert-triangle" size={20} color="black" />
          <Text style={styles.alertMessage}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.containerForm}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={values => {
            RegistHandle(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.containerInput}>
                <Text style={styles.text}>First Name</Text>
                <TextInput
                  name="firstName"
                  keyboardType="text"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  style={styles.input}
                  placeholder="Write your first name"
                />
              </View>
              {errors.firstName && touched.firstName ? (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              ) : null}
              <View style={styles.containerInput}>
                <Text style={styles.text}>Last Name</Text>
                <TextInput
                  name="lastName"
                  keyboardType="text"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  style={styles.input}
                  placeholder="Write your last name"
                />
              </View>
              {errors.lastName && touched.lastName ? (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              ) : null}
              <View style={styles.containerInput}>
                <Text style={styles.text}>Phone Number</Text>
                <TextInput
                  name="phoneNumber"
                  keyboardType="numeric"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  style={styles.input}
                  placeholder="Write your phone number"
                />
              </View>
              {errors.phoneNumber && touched.phoneNumber ? (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              ) : null}
              <View style={styles.containerInput}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                  name="email"
                  keyboardType="text"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Write your email"
                />
              </View>
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
              <View style={styles.containerInput}>
                <Text style={styles.text}>Password</Text>
                <TextInput
                  name="password"
                  keyboardType="text"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isPasswordSecure ? true : false}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Write your password"
                />
                <Icon
                  onPress={showPassword}
                  name={iconEye ? 'eye' : 'eye-off'}
                  style={styles.icon}
                  size={20}
                />
              </View>
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
              <View style={styles.containerBtn}>
                <Pressable onPress={handleSubmit} style={styles.btn}>
                  <Text style={styles.textBtn}>Sign Up</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
        <View style={styles.containerText2}>
          <Text style={styles.text2}>
            Already have account ?{' '}
            <Pressable onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.innerText2}> Sign In</Text>
            </Pressable>
          </Text>
        </View>
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
  },
  containerHead: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
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
    marginBottom: 50,
  },
  text2: {
    textAlign: 'center',
  },
  innerText2: {
    color: '#3C6255',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default SignUp;
