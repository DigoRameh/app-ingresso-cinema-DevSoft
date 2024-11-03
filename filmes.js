import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getNowPlayingMovies } from './api';

const Filmes = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies().then((response) => {
      setMovies(response.data.results);
    }).catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <Text>Filmes em Exibição</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Filmes;
