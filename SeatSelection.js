import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SeatSelectionScreen = ({ route, navigation }) => {
  const { movieTitle, sessionTime } = route.params;
  
  // Estado para armazenar os assentos reservados
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Carregar os assentos reservados ao montar o componente
  useEffect(() => {
    const loadReservedSeats = async () => {
      try {
        // Tenta carregar os assentos reservados para a sessão atual
        const storedReservedSeats = await AsyncStorage.getItem(`reservedSeats_${sessionTime}`);
        if (storedReservedSeats) {
          setReservedSeats(JSON.parse(storedReservedSeats));
        }
      } catch (error) {
        console.error("Erro ao carregar os assentos reservados", error);
      }
    };

    loadReservedSeats();
  }, [sessionTime]);

  // Função para salvar os assentos reservados no AsyncStorage
  const saveReservedSeats = async (newReservedSeats) => {
    try {
      await AsyncStorage.setItem(`reservedSeats_${sessionTime}`, JSON.stringify(newReservedSeats));
      setReservedSeats(newReservedSeats); // Atualiza o estado local com os novos assentos reservados
    } catch (error) {
      console.error("Erro ao salvar os assentos reservados", error);
    }
  };

  const toggleSeatSelection = (row, col) => {
    const seat = `${row}${col}`;
    
    // Verifique se o assento já está reservado
    if (reservedSeats.includes(seat)) {
      Alert.alert('Esse assento já foi reservado!');
      return;
    }

    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter(selectedSeat => selectedSeat !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const handleProceedToPayment = async () => {
    if (selectedSeats.length > 0) {
      // Salvar os assentos reservados no AsyncStorage após a seleção
      const updatedReservedSeats = [...reservedSeats, ...selectedSeats];
      await saveReservedSeats(updatedReservedSeats);
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
          {['F', 'E', 'D', 'C', 'B', 'A'].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <Text style={styles.rowLabel}>{row}</Text>
              {Array.from({ length: 7 }, (_, colIndex) => {
                const seatId = `${row}${colIndex + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                const isReserved = reservedSeats.includes(seatId); // Verifica se o assento está reservado
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[styles.seat, isSelected && styles.selectedSeat, isReserved && styles.reservedSeat]} // Adiciona estilo para assentos reservados
                    onPress={() => !isReserved && toggleSeatSelection(row, colIndex + 1)} // Impede a seleção de assentos reservados
                    disabled={isReserved} // Desabilita a seleção de assentos reservados
                  >
                    <Text style={styles.seatText}>{colIndex + 1}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.screenContainer}>
          <View style={styles.screen} />
          <Text style={styles.screenLabel}>TELA</Text>
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
          <Text style={styles.proceedButtonText}>Prosseguir para Pagamento</Text>
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
  reservedSeat: {
    backgroundColor: '#e74c3c', // Cor para assentos reservados
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
