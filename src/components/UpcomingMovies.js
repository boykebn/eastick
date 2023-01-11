import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import Month from './Month';
import {useNavigation} from '@react-navigation/native';

const UpcomingMovies = () => {
  // Navigation
  const navigation = useNavigation();
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
            <View style={styles.upcomingMovie}>
              <Image
                source={require('../assets/images/tenet.png')}
                style={styles.imageUpcomingMovie}
              />
              <View style={styles.detailsWrapper}>
                <Text style={styles.textTitle}>Tenet</Text>
                <Text style={styles.textGenre}>Action, Adventure, Sci-fi</Text>
                <Pressable style={styles.btnDetails}>
                  <Text style={styles.textBtnDetails}>Details</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.upcomingMovie}>
              <Image
                source={require('../assets/images/tenet.png')}
                style={styles.imageUpcomingMovie}
              />
              <View style={styles.detailsWrapper}>
                <Text style={styles.textTitle}>Tenet</Text>
                <Text style={styles.textGenre}>Action, Adventure, Sci-fi</Text>
                <Pressable style={styles.btnDetails}>
                  <Text style={styles.textBtnDetails}>Details</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.upcomingMovie}>
              <Image
                source={require('../assets/images/tenet.png')}
                style={styles.imageUpcomingMovie}
              />
              <View style={styles.detailsWrapper}>
                <Text style={styles.textTitle}>Tenet</Text>
                <Text style={styles.textGenre}>Action, Adventure, Sci-fi</Text>
                <Pressable style={styles.btnDetails}>
                  <Text style={styles.textBtnDetails}>Details</Text>
                </Pressable>
              </View>
            </View>
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
