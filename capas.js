import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import axios from 'axios';

const MovieCover = ({ movieId }) => {
  const [posterPath, setPosterPath] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: { api_key: '0a9f7e226d56b50c0105cbdeef5bf44d' }
        });
        setPosterPath(`https://image.tmdb.org/t/p/w500${response.data.poster_path}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <View>
      {posterPath ? (
        <Image source={{ uri: posterPath }} style={{ width: 200, height: 300 }} />
      ) : (
        <Text>Carregando imagem...</Text>
      )}
    </View>
  );
};

export default MovieCover;
