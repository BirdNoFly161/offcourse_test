import { Text, View, TextInput, Button } from "react-native";
import * as Linking from 'expo-linking'
import React from "react";
import API from '../api';
import { apiURL } from "@/configs/environement";

export default function Index() {
  const [identifier, setIdentifier]= React.useState('')
  const [password, setPassword]= React.useState('')

  const onLogin= async ()=>{
    let response= await API.post('/users/login/testpayload', {identifier, password})
  }

  const onLoginGoogle= async ()=>{
    Linking.openURL(`${apiURL}/users/register/google`)
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
      onChangeText={setIdentifier}
      placeholder="Identifier"/>
      <TextInput
      onChangeText={setPassword}
      placeholder="Password"/>

<Button
  onPress={onLogin}
  title="Login"
  color="#841584"
  accessibilityLabel="login"
/>

<Button
  onPress={onLoginGoogle}
  title="Register Google"
  color="#841584"
  accessibilityLabel="login"
/>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
