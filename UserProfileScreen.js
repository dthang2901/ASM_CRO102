import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function UserProfileScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState(''); // State to hold the name
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(user => {
        if (user) {
          setUser(user);
          setEmail(user.email); // Set email from authentication
          // Fetch additional user details from Firestore
          firestore().collection('users').doc(user.uid).get()
            .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                setName(documentSnapshot.data().name); // Assuming 'name' field exists
              }
            })
            .catch(error => {
              Alert.alert('Error', 'Unable to fetch user details: ' + error.message);
            });
        } else {
          setUser(null);
          setEmail('');
          setName(''); // Clear name when user logs out or is not found
        }
      });
      return subscriber; // Unsubscribe on unmount
    }, []);
  
    const handleSignOut = () => {
      auth().signOut().then(() => {
        Alert.alert('Signed out!', 'You have been signed out successfully.');
      });
    };
  
    const handleChangePassword = () => {
      if (password.trim().length < 6) {
        Alert.alert('Password too short', 'Password should be at least 6 characters');
        return;
      }
      user.updatePassword(password)
        .then(() => {
          Alert.alert('Success', 'Password updated successfully');
          setPassword(''); // Clear password field
        })
        .catch(error => {
          Alert.alert('Failed to update password', error.message);
        });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome, {name || 'Guest'}</Text>
        <Text>Email: {email}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter new password"
          secureTextEntry
        />
        <Button title="Change Password" onPress={handleChangePassword} />
        <Button title="Sign Out" onPress={handleSignOut} color="red" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default UserProfileScreen;
