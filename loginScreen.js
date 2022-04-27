import { Text, View, Button, StyleSheet, Image, TextInput, Animated, TouchableOpacity } from 'react-native'
import React, { useState, Component, useEffect } from "react";
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import axiosConfig from './axiosConfig'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginScreen({ navigation }) {
  state = {
    fadeAnimation: new Animated.Value(0)
  };
  const [email, setEMail] = useState('');
  const [password, setPassword] = useState('');
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('access_token', value)
    } catch (e) {
    }
  }
  // const getItemFromStorage = async () => {
  //   try {
  //        await AsyncStorage.getItem('access_token', (error, result) => {
  //          if (result) {
  //          }else{
  //          }
  //        });
  //      } catch (error) {
  //        console.log(error);
  //      }
  // }
  const removeItemFromStorage = async ()=> {
    try {
      await AsyncStorage.getItem('access_token', (error, result) => {
        if (result) {
          console.log(result);
        }else{
        }
      });
        return true;
    }
    catch(exception) {
        return false;
    }
}
  function handleClick() {
    axiosConfig.post('/login', {email:email, password:password, type:"user"},false)
    .then(function (response) {
      if(response.data.hasOwnProperty('access_token')){
        storeData(response.data.access_token)
        Toast.show('Login Successful');
        navigation.navigate('Menu')
        // getItemFromStorage()
      }
      else{
        Toast.show('Incorrect credentials');
        return
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(()=>{
    Animated.timing(state.fadeAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
    removeItemFromStorage()
  },[])
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        style={style.background}
        colors={['#ff0065', '#ffb58a']}>
          <Animated.View
          
          style={            {
              opacity: state.fadeAnimation
            }}
        >

        <Image
          style={style.image}
          source={{ uri: "https://www.zdnet.com/a/img/resize/0af0cf760ccba7cb031299eb45c6052169a098f9/2019/04/17/ffe4ae08-b887-4910-98a0-4bbc2d318c80/fitbit-ionic-lifestyle-gymclass-2625.jpg?width=1200&height=675&fit=crop&auto=webp" }} />
          </Animated.View>
        <TextInput
          style={style.inputField}
          placeholder="Email Address"
          onChangeText={((e)=> setEMail(e))}
          />
        <TextInput
          style={style.inputField}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={((e)=> setPassword(e))}
          />
        <TouchableOpacity
          style={style.Loginbutton}
          onPress={() => handleClick()}
          >
          <Text style={style.LoginbuttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          >
          <Text style={style.signinLabel}>New Here? <Text style={style.signinLabelHighlighted}>Sign Up</Text>  </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
const style = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  inputField: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
    padding: 10,
    color: "#fff"
  },
  Loginbutton: {
    alignItems: "center",
    backgroundColor: "#ff0065",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 20,
  },
  LoginbuttonText: {
    color: '#fff'
  },
  signinLabel: {
    color: "#fff"
  },
  signinLabelHighlighted: {
    color: "#ff0065",
    fontWeight: "600"
  }
})