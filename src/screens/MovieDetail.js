/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Box,
  HStack,
  VStack,
  Image,
  Button,
  Select,
  Modal,
  ScrollView,
  Pressable,
} from 'native-base';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
// import {Modal, Pressable} from 'react-native';
import {Calendar, MapPin, ChevronDown} from 'react-native-feather';
import CalendarPicker from 'react-native-calendar-picker';
// import DatePicker from 'react-native-date-picker';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

import {selectCinemas} from '../redux/reducers/transaction';
import Navbar from '../components/NavbarUser';
import Footer from '../components/Footer';
import http from '../helpers/http';

const MovieDetail = ({idMovie}) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const {id} = jwt_decode(token);
  const route = useRoute();
  const navigation = useNavigation();

  const getId = route.params.idMovie;
  const minDate = new Date();
  const maxDate = new Date(2023, 6, 3);

  //setting release date
  // let month = NewDate.split(' ')[1];
  // let newDate = NewDate.split(' ')[2];
  // let year = NewDate.split(' ')[3];

  //fethcing movie by id
  const [movieId, setMovieId] = React.useState({});
  const getMovieById = async () => {
    try {
      const response = await http().get(`/movies/${getId}`);
      setMovieId(response?.data?.results);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    getMovieById();
  }, []);

  //FETCHING CINEMA
  const [selectDate, setSelectDate] = React.useState('');
  const [selectCity, setSelectCity] = React.useState('');
  const [selectTime, setSelectTime] = React.useState(null);
  const [selectCinema, setSelectCinema] = React.useState(null);
  const [selectPrice, setSelectPrice] = React.useState('');

  const [showModal, setShowModal] = React.useState(false);

  const [cinema, setCinema] = React.useState([]);

  const fetchCinema = async () => {
    try {
      const response = await http(token).get(
        `/movieDetails/${getId}/schedules?date=${selectDate}&city=${selectCity}`,
      );
      setCinema(response?.data?.results);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    fetchCinema();
  }, [selectCity, selectDate]);

  //handle select time
  const handleSelectTime = (item, cinemaId, price) => {
    setSelectTime(item);
    setSelectCinema(cinemaId);
    setSelectPrice(price);
  };

  //handle onsubmit book now

  const [errorSelectedTime, setErrorSelectedTime] = React.useState(false);
  const [errorSelectedDate, setErrorSelectedDate] = React.useState(false);
  const handleSubmitBookNow = async (
    cinemaName,
    price,
    movieSchedulesId,
    cinemaPicture,
  ) => {
    try {
      if (!selectDate) {
        setErrorSelectedDate('Please select date...');
        setTimeout(() => {
          setErrorSelectedDate(false);
        }, 3000);
      } else if (!selectTime) {
        setErrorSelectedTime('Please select time...');
        setTimeout(() => {
          setErrorSelectedTime(false);
        }, 3000);
      } else {
        dispatch(
          selectCinemas({
            movieTitle: movieId.movieTitle,
            bookingDate: selectDate,
            userId: id,
            movieId: getId,
            cinemaId: selectCinema,
            time: selectTime,
            price: selectPrice,
            cinemaName,
            cinemaPicture,
            movieSchedulesId,
          }),
        );
        navigation.navigate('Order');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
      <Navbar />
      <VStack alignItems="center" justifyContent="center">
        <Box
          p="5"
          borderWidth="1"
          borderRadius="10"
          borderColor="#DEDEDE"
          marginY="5">
          <Image
            source={{uri: movieId?.pictures}}
            alt="Spiderman"
            width="200"
            height="300"
            resizeMode="cover"
          />
        </Box>
        {/* DETAILS MOVIE */}
        <VStack space="2">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            {movieId?.movieTitle}
          </Text>
          <Text fontWeight="normal" color="#4E4B66" textAlign="center">
            {movieId?.genre}
          </Text>
        </VStack>
      </VStack>
      <VStack px="3">
        <HStack justifyContent="space-between" py="8">
          <VStack space="5">
            <VStack space="2">
              <Text fontWeight="normal" color="#4E4B66">
                Relase date
              </Text>
              <Text fontWeight="600" flexWrap="wrap" fontSize="lg">
                {/* {new Date(movieId?.releaseDate).toDateString()} */}
                {moment(movieId?.releaseDate).format('LL').slice(0, 28)}
              </Text>
            </VStack>
            <VStack space="2">
              <Text fontWeight="normal" color="#4E4B66">
                Duration
              </Text>
              <Text fontWeight="600" fontSize="lg" flexWrap="wrap">
                {movieId?.duration}
              </Text>
            </VStack>
          </VStack>
          <VStack space="5" width="50%">
            <VStack space="2">
              <Text fontWeight="normal" color="#4E4B66">
                Directed by
              </Text>
              <Text fontWeight="600" fontSize="lg" flexWrap="wrap">
                {movieId?.director}
              </Text>
            </VStack>
            <VStack space="2">
              <Text fontWeight="normal" color="#4E4B66">
                Casts
              </Text>
              <Text fontWeight="600" fontSize="lg" flexWrap="wrap">
                {movieId?.casts}
              </Text>
            </VStack>
          </VStack>
        </HStack>
        <Box borderBottomWidth="1" borderColor="#D6D8E7" />
        <VStack space="3" py="8">
          <Text fontWeight="bold" fontSize="lg">
            Synopsis
          </Text>
          <Text color="#4E4B66">{movieId?.synopsis} </Text>
        </VStack>
      </VStack>

      {/* Showtimes and Tickets */}
      <VStack bg="#F5F6F8" px="3" py="5" space="4" alignItems="center">
        <Text textAlign="center" fontWeight="bold" fontSize="2xl">
          Showtimes and Tickets
        </Text>
        {/* DATE */}
        <Pressable
          onPress={() => setShowModal(true)}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          borderWidth="1"
          borderRadius={4}
          borderColor="#EFF0F6"
          bg="#EFF0F6"
          px="3"
          width={180}
          height={35}>
          <Calendar color="black" size={15} />
          <Text ml="3" flex={1}>
            {selectDate ? selectDate : 'Set a date'}
          </Text>
          <ChevronDown color="black" size={18} />
        </Pressable>
        <Modal
          size="full"
          isOpen={showModal}
          onClose={() => setShowModal(false)}>
          <Modal.Content>
            <Modal.Body>
              <Box>
                <CalendarPicker
                  minDate={minDate}
                  maxDate={maxDate}
                  onDateChange={value =>
                    setSelectDate(String(moment(value).format()).split('T')[0])
                  }
                />
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Confirm
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* CITY */}
        <Box width="56" position="relative">
          <Select
            textAlign="center"
            variant="rounded"
            accessibilityLabel="Sort"
            placeholder="Set a city"
            bg="#EFF0F6"
            onValueChange={e => setSelectCity(e)}
            borderRadius="md"
            _selectedItem={{
              bg: '#61876E',
            }}
            mt="1">
            <Select.Item label="Karawang" value="Karawang" />
          </Select>
          <MapPin
            size={50}
            color="black"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{position: 'absolute', top: 13, left: 20}}
          />
        </Box>

        {cinema?.map(cinema => (
          <VStack bg="white" width="100%" py="7" key={cinema.id}>
            <VStack alignItems="center" space="3">
              <Image
                alt="ticket"
                source={{uri: cinema?.picture}}
                width="200"
                height="50"
                resizeMode="contain"
              />
              <Text color="#AAAAAA" textAlign="center">
                {cinema?.address}
              </Text>
            </VStack>
            <VStack px="5" space="5">
              <Box mt="5" borderColor="#DEDEDE" borderBottomWidth="2" />
              <Box
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center">
                {cinema?.time.map((item, index) => {
                  return (
                    <Pressable
                      width={75}
                      py="1.5"
                      key={String(index)}
                      onPress={() =>
                        handleSelectTime(item, cinema.id, cinema.price)
                      }>
                      <Text
                        color={
                          selectTime === item && selectCinema === cinema.id
                            ? '#A6BB8D'
                            : 'black'
                        }
                        fontWeight={
                          selectTime === item && selectCinema === cinema.id
                            ? 'bold'
                            : ''
                        }
                        fontSize={
                          selectTime === item && selectCinema === cinema.id
                            ? 'lg'
                            : 'md'
                        }>
                        {item.split(':')[0] + ':' + item.split(':')[1] + ' WIB'}
                      </Text>
                    </Pressable>
                  );
                })}
              </Box>

              <HStack justifyContent="space-between">
                <Text fontSize="lg">Price</Text>
                <Text fontSize="xl" fontWeight="bold">
                  Rp {Number(cinema.price).toLocaleString('id')}/seat
                </Text>
              </HStack>
              <Button
                onPress={() =>
                  handleSubmitBookNow(
                    cinema?.name,
                    cinema?.price,
                    cinema?.movieschedulesid,
                    cinema?.picture,
                  )
                }
                bgColor="#61876E"
                alignItems="center"
                justifyContent="center">
                <Text fontSize="lg" fontWeight="bold" color="white">
                  Book now
                </Text>
              </Button>
              {errorSelectedTime && (
                <Text
                  fontSize="xl"
                  color="red.500"
                  textAlign="center"
                  fontWeight="bold">
                  {errorSelectedTime}
                </Text>
              )}
              {errorSelectedDate && (
                <Text
                  fontSize="xl"
                  color="red.500"
                  textAlign="center"
                  fontWeight="bold">
                  {errorSelectedDate}
                </Text>
              )}
            </VStack>
          </VStack>
        ))}
        <HStack position="relative">
          <Box
            borderBottomColor="#DEDEDE"
            borderBottomWidth="1"
            width="40%"
            position="absolute"
            top="3"
            right="-150"
            pb="1"
          />

          <Text bg="#F5F6F8" color="#61876E" fontSize="lg" fontWeight="bold">
            view more
          </Text>
          <Box
            borderBottomColor="#DEDEDE"
            borderBottomWidth="1"
            width="40%"
            position="absolute"
            top="3"
            left="-150"
            pb="1"
          />
        </HStack>
      </VStack>
      <Footer />
    </ScrollView>
  );
};

export default MovieDetail;
