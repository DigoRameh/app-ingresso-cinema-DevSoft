import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthContext';
import { useNavigation, CommonActions } from '@react-navigation/native'; // Importar CommonActions para resetar a navegação

const PerfilPage = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout(); // Chama o método de logout do contexto

    // Reseta a navegação e remove o histórico
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }], // Redefine a pilha para começar na tela de login
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Nome: {user.name}</Text>
          <Text style={styles.userText}>Email: {user.email}</Text>
        </View>
      ) : (
        <Text style={styles.userText}>Nenhuma informação de usuário disponível.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3d3d3d',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 30,
  },
  userText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PerfilPage;
