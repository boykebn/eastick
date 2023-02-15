import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Box,
  Text,
  NativeBaseProvider,
  HStack,
  Select,
  Input,
  Stack,
  Image,
  Pressable,
  ScrollView,
  CheckIcon,
} from 'native-base';
import NavbarUser from '../components/NavbarUser';
import Month from '../components/Month';
import Footer from '../components/Footer';
import http from '../helpers/http';

const ListMovie = () => {
  // const [page, setPage] = React.useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  const [listMovie, setListMovie] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState('');
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const getDataListMovie = async () => {
      try {
        const response = await http().get(
          `/movies?page=${page}&limit=2&sort=${sort}&sortBy=title&search=${search}`,
        );
        setListMovie(response?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    getDataListMovie();
  }, [page, sort, search]);
  return (
    <NativeBaseProvider>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true}>
        <NavbarUser />
        <Stack space="5" px="5" py="8" bg="#F5F6F8" zIndex={-10}>
          <Text fontSize="18" fontWeight="bold">
            List Movie
          </Text>
          <HStack>
            <Box>
              <Select
                selectedValue={sort}
                onValueChange={value => setSort(value)}
                minWidth="100"
                accessibilityLabel="Choose Service"
                placeholder="Sort"
                fontSize="14"
                borderRadius="16"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={5} />,
                }}>
                <Select.Item label="A-Z" value="ASC" />
                <Select.Item label="Z-A" value="DESC" />
              </Select>
            </Box>
            <Box>
              <Input
                onChangeText={value => setSearch(value)}
                mx="3"
                placeholder="Search Movie Name"
                w="225"
                fontSize="14"
                borderRadius="16"
              />
            </Box>
          </HStack>
          <Box>
            <Month />
          </Box>
          <Box
            // display="flex"
            flexDirection="row"
            // flexWrap="wrap"
            justifyContent="center">
            {listMovie.map(movie => {
              return (
                <Box
                  key={movie.id}
                  width="160"
                  borderWidth="1"
                  borderColor="#DEDEDE"
                  backgroundColor="white"
                  px="2"
                  mx="1.5"
                  my="1.5"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="8">
                  <Image
                    source={{uri: movie?.pictures}}
                    alt="list movies pictires"
                    width="160px"
                    height="250px"
                    resizeMode="contain"
                  />
                  <Box alignItems="center">
                    <Text
                      fontSize="16"
                      fontWeight="bold"
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {movie?.movieTitle}
                    </Text>
                    <Text textAlign="center">{movie?.genre}</Text>
                    <Pressable
                      borderWidth="1"
                      borderColor="#3C6255"
                      borderRadius="4"
                      justifyContent="center"
                      alignItems="center"
                      width="125"
                      height="30px"
                      mb="4">
                      <Text color="#3C6255">Details</Text>
                    </Pressable>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <HStack space={3} justifyContent="center">
            {page > 1 ? (
              <Pressable
                onPress={prevPage}
                borderWidth="1"
                borderRadius="8"
                borderColor="#3C6255"
                backgroundColor="#3C6255"
                w="35px"
                h="35px"
                justifyContent="center"
                alignItems="center">
                <Icon name="chevron-left" size={20} color="white" />
              </Pressable>
            ) : (
              <Pressable
                onPress={prevPage}
                borderWidth="1"
                borderRadius="8"
                borderColor="#3C6255"
                bgColor="#aaaa"
                isDisabled={true}
                w="35px"
                h="35px"
                justifyContent="center"
                alignItems="center">
                <Icon name="chevron-left" size={20} color="white" />
              </Pressable>
            )}

            <Pressable
              borderWidth="1"
              borderRadius="8"
              borderColor="#3C6255"
              w="35px"
              h="35px"
              justifyContent="center"
              alignItems="center">
              <Text fontSize="16" color="#3C6255">
                {page}
              </Text>
            </Pressable>

            {page < 5 ? (
              <Pressable
                onPress={nextPage}
                // isDisabled={listMovie.length <= 1}
                borderWidth="1"
                borderRadius="8"
                borderColor="#3C6255"
                backgroundColor="#3C6255"
                w="35px"
                h="35px"
                justifyContent="center"
                alignItems="center">
                <Icon name="chevron-right" size={20} color="white" />
              </Pressable>
            ) : (
              <Pressable
                onPress={nextPage}
                // isDisabled={listMovie.length <= 1}
                borderWidth="1"
                borderRadius="8"
                borderColor="#3C6255"
                bgColor="#aaaa"
                isDisabled={true}
                w="35px"
                h="35px"
                justifyContent="center"
                alignItems="center">
                <Icon name="chevron-right" size={20} color="white" />
              </Pressable>
            )}
          </HStack>
        </Stack>
        <Footer />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ListMovie;
