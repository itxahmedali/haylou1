import { Text, View, Button, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useState, Component, useEffect } from "react";
import LinearGradient from 'react-native-linear-gradient';

export default function Homescreen({ navigation }) {
  state = {
    fadeAnimation: new Animated.Value(0)
  };
  useEffect(()=>{
    Animated.timing(state.fadeAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  },[])
  return (
    <View >
        <LinearGradient
          style={styles.background}
          colors={['#ff0065', '#ffb58a']}>
         <Animated.View
          style={[
            styles.background,
            {
              opacity: state.fadeAnimation
            }
          ]}
        >
          <Text style={styles.mainHeading}>Haylou Fitband</Text>
          <Image 
          source={{ uri: 'https://cdn.mos.cms.futurecdn.net/YTnCQNS3yRre7AS8JvpNdm-1200-80.jpg'}}
          style={styles.image}
         />
         <Text style={styles.heading}>Track Data with this personal assistant.</Text>
         <View style={styles.butonBox}>
         <TouchableOpacity
            style={styles.Loginbutton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.LoginbuttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Signupbutton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.SignupbuttonText}>Signup</Text>
          </TouchableOpacity>
         </View>
        </Animated.View>
        </LinearGradient>
        
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width:150,
    height:150,
    borderRadius:100
  },
  mainHeading:{
    color:"#fff",
    fontSize:40,
    marginBottom:30
  },
  heading:{
    fontSize:20,
    color:'#fff',
    width:"70%",
    textAlign:'center',
    marginTop:30,
    fontWeight:'400'
  },
  butonBox:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
    width:'100%',
    flexDirection: "row",

  },
  Loginbutton:{
    alignItems: "center",
    backgroundColor: "#ff0065",
    paddingHorizontal:50,
    paddingVertical:10,
    borderRadius:30,
    marginHorizontal:10,
  },
  Signupbutton:{
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal:50,
    paddingVertical:10,
    borderRadius:30,
    marginHorizontal:10,
  },
  LoginbuttonText:{
    color:'#fff'
  },
  SignupbuttonText:{
    color:'#ff0065'
  }

})