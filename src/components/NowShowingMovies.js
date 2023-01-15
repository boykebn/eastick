/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Image, Text, Pressable} from 'native-base';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import http from '../helpers/http';

const NowShowing = () => {
  // Navigation
  const navigation = useNavigation();

  //get data Movie Now Showing
  const dispatch = useDispatch();

  const [nowShowingMovies, setNowShowingMovies] = React.useState([]);
  // console.log(nowShowingMovies[0].pictures);
  const getDataNowShowing = async () => {
    try {
      const response = await http().get('/movies/nowShowing');
      setNowShowingMovies(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getDataNowShowing();
  }, []);

  const [selectedMovie, setSelectedMovie] = React.useState(null);
  return (
    <View style={styles.wrapper}>
      <View style={styles.nowShowingWrapper}>
        <View style={styles.textNowShowingWrapper}>
          <Text style={styles.textNowShowing1}>Now Showing</Text>
          <Pressable onPress={() => navigation.navigate('ListMovie')}>
            <Text style={styles.textNowShowing2}>view all</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.listNowShowingWrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {nowShowingMovies.map(movie => {
            return (
              <View key={movie.id}>
                <Pressable
                  onPress={() => setSelectedMovie(movie.id)}
                  style={{
                    borderColor:
                      selectedMovie === movie.id ? '#DEDEDE' : 'white',
                    backgroundColor:
                      selectedMovie === movie.id ? 'white' : '#D6D8E7',
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: selectedMovie === movie.id ? 0 : 1,
                    width: 165,
                    marginRight: 16,
                    paddingHorizontal: 10,
                    borderTopStartRadius: 6,
                    borderTopEndRadius: 6,
                    borderBottomStartRadius: selectedMovie === movie.id ? 0 : 6,
                    borderBottomEndRadius: selectedMovie === movie.id ? 0 : 6,
                  }}>
                  <Image
                    source={{uri: movie?.pictures}}
                    // style={styles.imageNowShowing}
                    alt="movie pictures"
                    width="160px"
                    height="250px"
                    resizeMode="contain"
                  />
                </Pressable>
                {selectedMovie === movie.id ? (
                  <View style={styles.detailsWrapper}>
                    <Text
                      style={styles.textTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {movie?.movieTitle}
                    </Text>
                    <Text style={styles.textGenre}>{movie?.genre}</Text>
                    <Pressable
                      style={styles.btnDetails}
                      onPress={() =>
                        navigation.navigate('MovieDetail', {idMovie: movie.id})
                      }>
                      <Text style={styles.textBtnDetails}>Details</Text>
                    </Pressable>
                  </View>
                ) : (
                  false
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 480,
    backgroundColor: 'white',
    position: 'relative',
  },
  nowShowingWrapper: {
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#D6D8E7',
    height: 420,
  },
  textNowShowingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  textNowShowing1: {
    flex: 1,
    fontSize: 20,
    color: '#3C6255',
    fontWeight: 'bold',
  },
  textNowShowing2: {
    color: '#3C6255',
  },
  listNowShowingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    left: 20,
    top: 110,
  },
  imageNowShowing: {
    resizeMode: 'contain',
    width: '160px',
    height: '250px',
  },
  detailsWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 165,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
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

export default NowShowing;
