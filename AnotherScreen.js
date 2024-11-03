import * as React from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SignUp from './SignUp'; 
import AnotherScreen from './AnotherScreen'; 

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    // Simulação de autenticação
    if (email === 'user@example.com' && password === 'password123') {
      alert('Login bem-sucedido!');
      setError('');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.login}>
      <Image style={styles.logoIcon} resizeMode="cover" source={require('./assets/Logo.png')} />
      <Text style={[styles.bemVindo, styles.login1Typo]}>Bem-Vindo</Text>
      <Text style={[styles.login1, styles.login1Typo]}>Login</Text>

      <View style={[styles.barraUsurio, styles.barraLayout]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={[styles.barraSenha, styles.barraLayout]}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.entrar}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cadastrarButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.cadastrar}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    width: 250,
    height: 195,
    marginBottom: 40,
  },
  bemVindo: {
    fontSize: 32,
    marginBottom: 10,
	fontFamily: 'RampartOne-Regular',
  },
  login1: {
    fontSize: 24,
    marginBottom: 30,
  },
  barraLayout: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderColor: "#0097b2",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#72BECB",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  entrar: {
    color: "#fff",
    fontSize: 16,
  },
  cadastrarButton: {
    backgroundColor: "#0097b2",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  cadastrar: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Login;