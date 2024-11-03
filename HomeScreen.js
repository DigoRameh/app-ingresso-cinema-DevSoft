import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>tela</Text>
      <Button
        title="Tela de login"
        onPress={() => navigation.navigate('LoginPage')}
      />
      <Button
        title="Tela filmes"
        onPress={() => navigation.navigate('Filmes')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
});

export default HomeScreen;
