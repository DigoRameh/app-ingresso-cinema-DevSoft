import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; 
import LoginPage from './LoginPage'; 
import SignUp from './SignUp'; 
import Filmes from './filmes';
import FilmesDetalhesScreen from './FilmesDetalhesScreen'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Filmes">
        <Stack.Screen name="Filmes" component={Filmes} />
        <Stack.Screen name="FilmesDetalhes" component={FilmesDetalhesScreen} options={{ title: 'Detalhes do Filme' }} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

