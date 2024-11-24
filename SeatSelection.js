import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';

const SeatSelectionScreen = ({ route, navigation }) => {
  const { movieTitle, sessionTime } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (row, col) => {
    const seat = `${row}${col}`;
    setSelectedSeats(prevSelectedSeats => {
      // Verificar se o assento já está selecionado
      if (prevSelectedSeats.includes(seat)) {
        // Se estiver, remove apenas o assento clicado
        return prevSelectedSeats.filter(selectedSeat => selectedSeat !== seat);
      } else {
        // Se não estiver, adiciona o assento à lista
        return [...prevSelectedSeats, seat];
      }
    });
  };

  // Função para prosseguir para o pagamento
  const handleProceedToPayment = () => {
    if (selectedSeats.length > 0) {
      navigation.navigate('PaymentScreen', { selectedSeats, movieTitle, sessionTime });
    } else {
      Alert.alert('Selecione pelo menos um assento para prosseguir!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.movieTitle}>{movieTitle}</Text>
        <Text style={styles.sessionTime}>Sessão: {sessionTime}</Text>
      </View>

      <View style={styles.seatingChart}>
        <View style={styles.seatsContainer}>
          {/* Mapa de assentos invertido (de F a A) */}
          {['F', 'E', 'D', 'C', 'B', 'A'].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <Text style={styles.rowLabel}>{row}</Text> {/* Letras na lateral */}
              {Array.from({ length: 7 }, (_, colIndex) => {
                const seatId = `${row}${colIndex + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[styles.seat, isSelected && styles.selectedSeat]}
                    onPress={() => toggleSeatSelection(row, colIndex + 1)}
                  >
                    <Text style={styles.seatText}>{colIndex + 1}</Text> {/* Texto dentro do TouchableOpacity */}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Tela abaixo do mapa de assentos */}
        <View style={styles.screenContainer}>
          <Text style={styles.screen}></Text>
          <Text style={styles.screenLabel}>TELA</Text> {/* Texto TELA na parte inferior */}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.summaryText}>
          {selectedSeats.length} Assento(s) Selecionado(s)
        </Text>
        <TouchableOpacity
          style={[styles.proceedButton, selectedSeats.length === 0 && styles.disabledButton]}
          onPress={handleProceedToPayment}
          disabled={selectedSeats.length === 0}
        >
          <Text style={styles.proceedButtonText}>Prosseguir para Pagamento</Text> {/* Texto dentro do botão */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sessionTime: {
    fontSize: 16,
    color: '#666',
  },
  seatingChart: {
    marginBottom: 20,
  },
  seatsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 16,
    marginRight: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  seat: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3498db',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2980b9',
  },
  selectedSeat: {
    backgroundColor: '#f39c12',
  },
  seatText: {
    color: '#fff',
    fontSize: 14,
  },
  screenContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  screen: {
    backgroundColor: '#34495e',
    height: 10,
    width: '70%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  screenLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  proceedButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeatSelectionScreen;
