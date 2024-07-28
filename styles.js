import { StyleSheet } from 'react-native';

const colors = {
  primary: '#4CAF50', // Green shade
  accent: '#2196F3', // Blue shade
  lightGray: '#f2f2f2',
  darkGray: '#333',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.lightGray,
  },
  input: {
    width: '100%',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200, // Adjust based on your logo's aspect ratio
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    color: '#4CAF50', // You can use your theme color here
    marginTop: 20,
  }
});
