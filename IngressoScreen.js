import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const IngressoScreen = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadTickets = async () => {
      try {
        if (!user) throw new Error('Usuário não logado');

        const storedTickets = await AsyncStorage.getItem(`tickets_${user.username}`);
        const parsedTickets = storedTickets ? JSON.parse(storedTickets) : [];
        setTickets(Array.isArray(parsedTickets) ? parsedTickets : []);
      } catch (error) {
        console.error('Erro ao carregar ingressos', error);
      }
    };

    loadTickets();
  },   []);

  if (tickets.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nenhum ingresso encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Detalhes dos Ingressos</Text>
      {tickets.map((ticket, index) => (
        <View key={index} style={styles.ticketCard}>
          <Text style={styles.detail}>🎬 Filme: {ticket.movieTitle}</Text>
          <Text style={styles.detail}>🕒 Sessão: {ticket.sessionTime}</Text>
          <Text style={styles.detail}>💺 Assentos: {Array.isArray(ticket.selectedSeats) ? ticket.selectedSeats.join(', ') : 'N/A'}</Text>
          <Text style={styles.detail}>🎟️ Ingressos Inteira: {ticket.fullTickets}</Text>
          <Text style={styles.detail}>🎫 Ingressos Meia: {ticket.halfTickets}</Text>
          <Text style={styles.detail}>💵 Total Pago: R$ {ticket.totalPrice.toFixed(2)}</Text>
          <Text style={styles.detail}>💳 Método de Pagamento: {ticket.paymentMethod}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  ticketCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});

export default IngressoScreen;
