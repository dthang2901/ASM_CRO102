import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './components/screen/LoginScreen';
import SignUpScreen from './components/screen/SignUpScreen';
import EntriesListScreen from './components/screen/EntriesListScreen';
import UserProfileScreen from './components/screen/UserProfileScreen';
import store from './components/redux/store';
import { Provider } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'EntriesList') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'UserProfile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'HealthTracker') {
          iconName = focused ? 'analytics' : 'analytics-outline';
        }

        return <Icon name={iconName ?? ''} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="EntriesList" component={EntriesListScreen} options={{ title: 'Entries' }} />
      <Tab.Screen name="HealthTracker" component={SignUpScreen} options={{ title: 'HealthTracker' }} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
