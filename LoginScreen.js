import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';  // Importing Firebase auth module
import styles from '../styles/styles'; // Assuming styles are defined as per the above

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Logged in!", "You have been successfully logged in.");
      navigation.navigate('Home'); // Navigate after successful login
    } catch (error) {
      Alert.alert("Login failed!", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../image/logo.jpg')} style={styles.logo} />
      <Text style={styles.appName}>Manager App</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign Up</Text>
    </View>
  );
};

export default LoginScreen;
