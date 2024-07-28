import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles/styles';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password should be at least 6 characters long.',
      );
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      await firestore().collection('users').doc(user.uid).set({
        name,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert(
        'Registered successfully!',
        'User has been successfully registered.',
      );
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Sign up failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../image/logo.jpg')} style={styles.logo} />
      <Text style={styles.appName}>Manager App</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
