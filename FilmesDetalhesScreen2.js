import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const API_KEY = '0a9f7e226d56b50c0105cbdeef5bf44d';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailsScreen2 = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do filme...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {movieDetails && (
        <>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
            style={styles.posterImage}
          />
          <Text style={styles.title}>{movieDetails.title}</Text>
          <Text style={styles.overview}>{movieDetails.overview}</Text>
          <Text style={styles.info}>Duração: {movieDetails.runtime} minutos</Text>
          <Text style={styles.info}>Lançamento: {movieDetails.release_date}</Text>
          <Text style={styles.info}>Avaliação: {movieDetails.vote_average}/10</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default MovieDetailsScreen2;
