import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../RegistrationScreen/styles';
import { firebase } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(props) {
  console.log(props);
  const navigation = useNavigation();
  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        // An error happened.
      });
  };

  return (
    <View>
      <Text>Home Screen</Text>

      <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
        <Text style={styles.buttonTitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
