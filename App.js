import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './src/firebase/config';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';
import { decode, encode } from 'base-64';
import { Button } from 'react-native';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
            console.log('User Data :: ', userData);
          })
          .catch(error => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  // const navigation = useNavigation();
  // const onLogoutPress = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate('Login');
  //     })
  //     .catch(error => {
  //       // An error happened.
  //     });
  // };

  if (loading) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* TODO: Check why protected route is not working */}
        {/*{user ? (*/}
        {/*  <Stack.Screen name="Home">*/}
        {/*    {props => <HomeScreen {...props} extraData={user} />}*/}
        {/*  </Stack.Screen>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    <Stack.Screen name="Login" component={LoginScreen} />*/}
        {/*    <Stack.Screen name="Registration" component={RegistrationScreen} />*/}
        {/*  </>*/}
        {/*)}*/}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Login')}
                title="Logout"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
