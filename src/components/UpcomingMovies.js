import React from 'react';
import {View, Text, ScrollView, Image, Pressable} from 'native-base';
import {StyleSheet} from 'react-native';
import Month from './Month';
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';

const UpcomingMovies = () => {
  // Navigation
  const navigation = useNavigation();

  //get data Up Coming Movies
  const [upcomingMovie, setUpComingMovie] = React.useState([]);
  // console.log(upcomingMovie);
  const getDataUpcoming = async () => {
    try {
      const response = await http().get('/movies/upcoming');
      setUpComingMovie(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getDataUpcoming();
  }, []);
  return (
    <>
      <View style={styles.ucomingMoviesWrapper}>
        <View style={styles.textUpcomingMoviesWrapper}>
          <Text style={styles.textUpcomingMovies1}>Upcoming Movies</Text>
          <Pressable onPress={() => navigation.navigate('ListMovie')}>
            <Text style={styles.textUpcomingMovies2}>view all</Text>
          </Pressable>
        </View>
        <Month />
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {upcomingMovie.map(movie => {
              return (
                <View key={movie.id}>
                  <View style={styles.upcomingMovie}>
                    <Image
                      source={{uri: movie?.pictures}}
                      // style={styles.imageUpcomingMovie}
                      alt="upcoming pictures"
                      width="160px"
                      height="250px"
                      resizeMode="contain"
                    />
                    <View style={styles.detailsWrapper}>
                      <Text style={styles.textTitle}>{movie?.movieTitle}</Text>
                      <Text style={styles.textGenre}>{movie?.genre}</Text>
                      <Pressable
                        style={styles.btnDetails}
                        onPress={() =>
                          navigation.navigate('MovieDetail', {
                            idMovie: movie?.id,
                          })
                        }>
                        <Text style={styles.textBtnDetails}>Details</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ucomingMoviesWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  textUpcomingMoviesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  textUpcomingMovies1: {
    flex: 1,
    fontSize: 20,
    color: '#3C6255',
    fontWeight: 'bold',
  },
  textUpcomingMovies2: {
    color: '#3C6255',
  },
  upcomingMovie: {
    borderColor: '#DEDEDE',
    borderWidth: 1,
    width: 165,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 16,
    marginTop: 30,
  },
  imageUpcomingMovie: {
    resizeMode: 'contain',
    width: '100%',
  },
  detailsWrapper: {
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textGenre: {
    textAlign: 'center',
  },
  btnDetails: {
    borderColor: '#61876E',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 15,
  },
  textBtnDetails: {
    color: '#61876E',
  },
});

export default UpcomingMovies;
