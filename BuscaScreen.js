import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_KEY = '0a9f7e226d56b50c0105cbdeef5bf44d';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation();

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: { api_key: API_KEY, language: 'pt-BR', page: 1 },
      });
      setSuggestions(response.data.results.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  const searchMovie = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Aviso', 'Por favor, digite o nome de um filme.');
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: { api_key: API_KEY, language: 'pt-BR', query: searchQuery },
      });

      const results = response.data.results;

      if (results.length > 0) {
        setSearchResults(results); // Exibe a lista de resultados
      } else {
        Alert.alert('Erro', 'Não encontramos o filme solicitado.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um problema na busca. Tente novamente mais tarde.');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const navigateToDetails = (movieId) => {
    navigation.navigate('FilmesDetalhes', { movieId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Busque um filme..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchMovie}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="times-circle" size={20} color="#007bff" />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.suggestionTitle}>
        {searchResults.length > 0 ? 'Resultados da Busca:' : 'Sugestões:'}
      </Text>
      <FlatList
        data={searchResults.length > 0 ? searchResults : suggestions}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Exibe os pôsteres em duas colunas
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieItem}
            onPress={() => navigateToDetails(item.id)}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.posterImage}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
            {searchResults.length > 0 && (
              <Text style={styles.releaseDate}>
                {item.release_date ? `(${item.release_date.split('-')[0]})` : '(Data desconhecida)'}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  clearButton: {
    marginLeft: -30,
    marginRight: 10,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieItem: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    maxWidth: '48%',
  },
  posterImage: {
    width: '100%',
    aspectRatio: 2 / 3, // Mantém proporção de pôster
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default SearchPage;
