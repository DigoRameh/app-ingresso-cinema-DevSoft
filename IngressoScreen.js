import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useAuth } from './AuthContext';

const IngressoScreen = ({ navigation }) => {
  const { user, tickets } = useAuth();

  useEffect(() => {
    if (!user) {
      Alert.alert('Você precisa estar logado para ver seus ingressos!');
      navigation.navigate('LoginPage'); // Redireciona para Login se não estiver logado
    }
  }, [user, navigation]);

  if (!user) {
    return null; // Não renderiza nada se não houver usuário logado
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Ingressos Comprados</Text>
      
      {tickets.length === 0 ? (
        <Text style={styles.noTicketsText}>Você não comprou nenhum ingresso ainda.</Text>
      ) : (
        tickets.map((ticket, index) => (
          <View key={index} style={styles.ticketCard}>
            <Text style={styles.ticketText}>Filme: {ticket.movieTitle}</Text>
            <Text style={styles.ticketText}>Sessão: {ticket.sessionTime}</Text>
          </View>
        ))
      )}

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noTicketsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  ticketCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ticketText: {
    fontSize: 16,
  },
});

export default IngressoScreen;
