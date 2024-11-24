import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './AuthContext';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import Filmes from './Filmes';
import FilmesDetalhesScreen from './FilmesDetalhesScreen';
import FilmesDetalhesScreen2 from './FilmesDetalhesScreen2';
import ProfileScreen from './ProfileScreen'; 
import SearchPage from './BuscaScreen'; 
import SeatSelectionScreen from './SeatSelection';
import PaymentScreen from './PaymentScreen';
// import IngressoScreen from './IngressoScreen'; 
import Icon from 'react-native-vector-icons/FontAwesome'; // Usando FontAwesome


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Filmes"
        component={Filmes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Busca"
        component={SearchPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ingressos"
        component={Filmes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ticket" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="FilmesDetalhes" component={FilmesDetalhesScreen} />
          <Stack.Screen name="FilmesDetalhes2" component={FilmesDetalhesScreen2} />
          <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
