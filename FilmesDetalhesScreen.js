import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '0a9f7e226d56b50c0105cbdeef5bf44d';
const BASE_URL = 'https://api.themoviedb.org/3';

// Função para gerar horários de sessão aleatórios por dia
const generateSessionTimes = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sessionDays = {};

  daysOfWeek.forEach(day => {
    const sessionCount = Math.floor(Math.random() * 4) + 2; // Entre 2 e 5 horários por dia
    const times = [];

    while (times.length < sessionCount) {
      const hour = Math.floor(Math.random() * 12) + 9; // Horários entre 9h e 20h
      const minute = Math.random() > 0.5 ? '00' : '30';
      const sessionTime = `${hour}:${minute}`;

      // Verifica se o horário já existe
      if (!times.includes(sessionTime)) {
        times.push(sessionTime);
      }
    }

    sessionDays[day] = times.sort((a, b) => {
      const [hourA, minuteA] = a.split(':').map(Number);
      const [hourB, minuteB] = b.split(':').map(Number);

      if (hourA !== hourB) {
        return hourA - hourB; // Ordena pela hora
      }
      return minuteA - minuteB; // Se as horas forem iguais, ordena pelos minutos
    });
  });

  return sessionDays;
};

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState('');
  const [sessionTimes, setSessionTimes] = useState({});

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

    // Atualiza o dia da semana atual com o nome em inglês
    const currentDate = new Date();
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentDay(dayName);  // Exemplo: 'Monday', 'Tuesday', etc.

    // Verifica se os horários já foram armazenados no AsyncStorage para esse filme
    const getStoredSessionTimes = async () => {
      try {
        const storedSessions = await AsyncStorage.getItem(`sessionTimes_${movieId}`);
        if (storedSessions) {
          setSessionTimes(JSON.parse(storedSessions));  // Carrega os horários de sessão armazenados para o filme
        } else {
          const generatedSessions = generateSessionTimes();
          setSessionTimes(generatedSessions);
          await AsyncStorage.setItem(`sessionTimes_${movieId}`, JSON.stringify(generatedSessions)); // Armazena os horários para o filme
        }
      } catch (error) {
        console.error("Erro ao acessar o AsyncStorage:", error);
      }
    };

    getStoredSessionTimes();
  }, [movieId]);

  // Função para verificar se o horário já passou
  const isPastSession = (sessionTime) => {
    const [sessionHour, sessionMinute] = sessionTime.split(':').map(Number);
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Comparando hora e minuto para ver se a sessão já passou
    if (sessionHour < currentHour || (sessionHour === currentHour && sessionMinute <= currentMinute)) {
      return true;
    }
    return false;
  };

  // Função que será chamada ao clicar em um horário
  const handleSessionClick = (sessionTime) => {
    if (isPastSession(sessionTime)) {
      Alert.alert("Este horário já passou", "Escolha outro horário disponível.");
    } else {
      Alert.alert("Sessão escolhida", `Você escolheu a sessão de ${sessionTime}`);
      // Passando o nome do filme, poster e horário para a próxima tela
      navigation.navigate('SeatSelection', { 
        sessionTime, 
        movieId, 
        movieTitle: movieDetails.title,  // Passa o título do filme
        moviePoster: movieDetails.poster_path // Passa o poster do filme
      });
    }
  };

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

          <View style={styles.sessionsContainer}>
            <Text style={styles.sessionTitle}>Horários de Sessão ({currentDay})</Text>
            {sessionTimes[currentDay]?.length > 0 ? (
              sessionTimes[currentDay].map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.sessionButton, isPastSession(time) && styles.pastSession]}
                  onPress={() => handleSessionClick(time)}
                  disabled={isPastSession(time)}
                >
                  <Text style={styles.sessionText}>{time}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noSessions}>Não há sessões disponíveis para hoje.</Text>
            )}
          </View>
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
  sessionsContainer: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sessionButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  pastSession: {
    backgroundColor: '#d3d3d3',
  },
  sessionText: {
    color: '#fff',
    fontSize: 16,
  },
  noSessions: {
    color: 'red',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default MovieDetailsScreen;
