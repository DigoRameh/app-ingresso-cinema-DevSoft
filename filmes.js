import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '0a9f7e226d56b50c0105cbdeef5bf44d';
const ITEM_WIDTH = Dimensions.get('window').width / 3 - 16;

const getNowPlayingMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: { api_key: API_KEY, language: 'pt-BR' },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const MovieCover = ({ movieId, title }) => {
  const navigation = useNavigation();
  const [posterPath, setPosterPath] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: { api_key: API_KEY },
        });
        setPosterPath(`https://image.tmdb.org/t/p/w500${response.data.poster_path}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handlePress = () => {
    Alert.alert("Filme Selecionado", title);
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FilmesDetalhes',{ movieId})} style={styles.posterContainer}>
      {posterPath ? (
        <Image source={{ uri: posterPath }} style={styles.posterImage} />
      ) : (
        <Text>Carregando...</Text>
      )}
    </TouchableOpacity>
  );
};

const Filmes = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Filmes em Exibição</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            <MovieCover movieId={item.id} title={item.title} />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => Alert.alert("Home")}>
          <Image source={require('./assets/home.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => Alert.alert("Buscar")}>
          <Image source={require('./assets/busca.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => Alert.alert("Ingressos")}>
          <Image source={require('./assets/ingresso.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => Alert.alert("Perfil")}>
          <Image source={require('./assets/perfil.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  movieContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 4,
  },
  posterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    borderColor: '#ccc',
  },
  bottomBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 20,
    height: 18,
  },
});

export default Filmes;
