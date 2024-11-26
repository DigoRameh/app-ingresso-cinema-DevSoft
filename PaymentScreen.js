import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const PaymentScreen = ({ route, navigation }) => {
  const { selectedSeats, movieTitle, sessionTime } = route.params;
  const { user } = useAuth();

  const ticketPrice = 20.0;
  const halfTicketPrice = ticketPrice / 2;

  const [fullTickets, setFullTickets] = useState(0);
  const [halfTickets, setHalfTickets] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('débito');
  const [cardDetails, setCardDetails] = useState({
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
  });

  const totalPrice = fullTickets * ticketPrice + halfTickets * halfTicketPrice;

  const saveTickets = async (newTicket) => {
    try {
      if (!user) throw new Error('Usuário não logado');

      const storedTickets = await AsyncStorage.getItem(`tickets_${user.username}`);
      let tickets = storedTickets ? JSON.parse(storedTickets) : [];

      if (!Array.isArray(tickets)) {
        tickets = [];
      }

      tickets.push(newTicket);

      await AsyncStorage.setItem(`tickets_${user.username}`, JSON.stringify(tickets));
      console.log('Ingressos salvos com sucesso');
    } catch (error) {
      console.error('Erro ao salvar ingressos', error);
    }
  };

  const handlePayment = async () => {
    if (fullTickets + halfTickets === selectedSeats.length) {
      if (
        cardDetails.holderName &&
        cardDetails.cardNumber &&
        cardDetails.expiryDate &&
        cardDetails.securityCode
      ) {
        const newTicket = {
          fullTickets,
          halfTickets,
          movieTitle,
          sessionTime,
          selectedSeats,
          totalPrice,
          paymentMethod,
        };

        Alert.alert(
          'Compra Concluída',
          `Seu pagamento de R$ ${totalPrice.toFixed(
            2
          )} foi processado com sucesso por ${paymentMethod}!`,
          [{
            text: 'OK',
            onPress: async () => {
              await saveTickets(newTicket);
              navigation.navigate('TabNavigator', { screen: 'Filmes' });
            }
          }]
        );
      } else {
        Alert.alert('Erro', 'Por favor, preencha todas as informações do cartão.');
      }
    } else {
      Alert.alert('Erro', 'Você precisa selecionar ingressos para todos os assentos.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAddTicket = (type) => {
    if (fullTickets + halfTickets < selectedSeats.length) {
      if (type === 'full') setFullTickets(fullTickets + 1);
      if (type === 'half') setHalfTickets(halfTickets + 1);
    } else {
      Alert.alert('Limite atingido', 'Você já selecionou ingressos para todos os assentos.');
    }
  };

  const handleRemoveTicket = (type) => {
    if (type === 'full' && fullTickets > 0) setFullTickets(fullTickets - 1);
    if (type === 'half' && halfTickets > 0) setHalfTickets(halfTickets - 1);
  };

  const handleChangeCardDetail = (key, value) => {
    setCardDetails({ ...cardDetails, [key]: value });
  };

  const handleCardNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16); // Remove qualquer caractere não numérico e limita a 16 dígitos
    setCardDetails({ ...cardDetails, cardNumber: cleaned });
  };

  const handleExpiryDateChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4); // Remove qualquer caractere não numérico e limita a 4 dígitos
    if (cleaned.length >= 2) {
      setCardDetails({
        ...cardDetails,
        expiryDate: `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`,
      });
    } else {
      setCardDetails({ ...cardDetails, expiryDate: cleaned });
    }
  };

  const handleSecurityCodeChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 3); // Limita a 3 dígitos
    setCardDetails({ ...cardDetails, securityCode: cleaned });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.header}>Pagamento</Text>

        <View style={styles.details}>
          <Text style={styles.detailText}>Filme: {movieTitle}</Text>
          <Text style={styles.detailText}>Sessão: {sessionTime}</Text>
          <Text style={styles.detailText}>Assentos: {selectedSeats.join(', ')}</Text>
        </View>

        <View style={styles.ticketSelector}>
          <Text style={styles.ticketLabel}>Tipo de Ingressos</Text>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketType}>Inteira: R$ {ticketPrice.toFixed(2)}</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={[styles.counterButton, styles.minusButton]}
                onPress={() => handleRemoveTicket('full')}
              >
                <Ionicons name="remove" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{fullTickets}</Text>
              <TouchableOpacity
                style={[styles.counterButton, styles.plusButton]}
                onPress={() => handleAddTicket('full')}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ticketRow}>
            <Text style={styles.ticketType}>Meia: R$ {halfTicketPrice.toFixed(2)}</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={[styles.counterButton, styles.minusButton]}
                onPress={() => handleRemoveTicket('half')}
              >
                <Ionicons name="remove" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{halfTickets}</Text>
              <TouchableOpacity
                style={[styles.counterButton, styles.plusButton]}
                onPress={() => handleAddTicket('half')}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.totalPrice}>Total: R$ {totalPrice.toFixed(2)}</Text>

        <View style={styles.paymentMethodContainer}>
          <TouchableOpacity
            style={[
              styles.paymentMethodButton,
              paymentMethod === 'débito' && styles.selectedPaymentMethod,
            ]}
            onPress={() => setPaymentMethod('débito')}
          >
            <Text
              style={[
                styles.paymentMethodText,
                paymentMethod === 'débito' && styles.selectedText,
              ]}
            >
              Débito
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentMethodButton,
              paymentMethod === 'crédito' && styles.selectedPaymentMethod,
            ]}
            onPress={() => setPaymentMethod('crédito')}
          >
            <Text
              style={[
                styles.paymentMethodText,
                paymentMethod === 'crédito' && styles.selectedText,
              ]}
            >
              Crédito
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.inputRow}>
            <Ionicons name="person" size={24} color="#A5A5A5" />
            <TextInput
              style={styles.input}
              placeholder="Nome do titular"
              value={cardDetails.holderName}
              onChangeText={(text) => handleChangeCardDetail('holderName', text)}
              placeholderTextColor="#A5A5A5"
            />
          </View>
          <View style={styles.inputRow}>
            <Ionicons name="card" size={24} color="#A5A5A5" />
            <TextInput
              style={styles.input}
              placeholder="Número do cartão"
              keyboardType="numeric"
              value={cardDetails.cardNumber}
              onChangeText={handleCardNumberChange}
              maxLength={16}
              placeholderTextColor="#A5A5A5"
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="calendar" size={24} color="#A5A5A5" />
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              keyboardType="numeric"
              value={cardDetails.expiryDate}
              onChangeText={handleExpiryDateChange}
              maxLength={5} // MM/AA tem 5 caracteres
              placeholderTextColor="#A5A5A5"
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="lock-closed" size={24} color="#A5A5A5" />
            <TextInput
              style={styles.input}
              placeholder="Código de segurança"
              keyboardType="numeric"
              value={cardDetails.securityCode}
              onChangeText={handleSecurityCodeChange}
              maxLength={3}
              placeholderTextColor="#A5A5A5"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.actionButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handlePayment}>
            <Text style={styles.actionButtonText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  details: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  ticketSelector: {
    marginBottom: 20,
  },
  ticketLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ticketType: {
    fontSize: 16,
    fontWeight: '600',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
  },
  counterValue: {
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  minusButton: {
    backgroundColor: '#DC3545',
  },
  plusButton: {
    backgroundColor: '#28A745',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentMethodButton: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  selectedPaymentMethod: {
    backgroundColor: '#007BFF',
  },
  paymentMethodText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'white',
  },
  cardDetails: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10, // Ajuste para mover os botões para cima
  },
  actionButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: '45%',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#DC3545',
    borderRadius: 30,
  },
});

export default PaymentScreen;
