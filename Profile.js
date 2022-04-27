import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import axiosConfig from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function Profile({ route, navigation }) {
  const { itemId } = route.params;
  const [user, setUser] = useState([])
  const getItemFromStorage = async () => {
    try {
      await AsyncStorage.getItem('access_token', (error, result) => {
          console.log(itemId);
          axiosConfig.get(`/user_view/${itemId}`, {
          headers: {
            "Authorization": `Bearer ${result}`
          }
        }).then((res)=>{
          setUser(res.data.user_details)
          console.log(res);
        })
      });
    } catch (error) {
    }
  }
  useEffect(()=>{
    getItemFromStorage()
  },[])
  return (
    <SafeAreaView contentContainerStyle={style.container}>
      <ScrollView contentContainerStyle={style.scrollContainer}>
      {(() => {
              if (user.login_status == '1'){
                  return (
                    <View style={style.onlineDot}></View>
                  )
              }
              return null;
            })()}
      <Text style={style.headingtext}>User Profile</Text>
      <Image
      source={{ uri: user.image }}
      style={style.image}/>
      <Text style={style.subHeading}>Personal Details</Text>
      <View style={style.boxContainer}>
      <Text style={style.text}>Name: {user.name} {user.last_name}</Text>
      <Text style={style.text}>Age: {user.age} Years Old</Text>
      </View>
      <View style={style.boxContainer}>
      <Text style={style.text}>Gender: {user.gender}</Text>
      <Text style={style.text}>Height: {user.height}</Text>
      </View>
      <View style={style.boxContainer}>
      <Text style={style.text}>Date of birth: {user.day}/{user.month}/{user.year}</Text>
      <Text style={style.text}>Email: {user.email}</Text>
      </View>
      <View style={style.boxContainer}>
      <Text style={style.text}>Phone #: {user.phone_number}</Text>
      <Text style={style.text}>Horoscope: {user.horoscope}</Text>
      </View>
      <View style={style.boxContainer}>
      <Text style={style.text}>Physical Status: {user.physical_status}</Text>
      <Text style={style.text}>Marital Status: {user.marital_status}</Text>
      </View>
      <View style={style.boxContainer}>
      <Text style={style.text}>Occupation: {user.employed_in}</Text>
      <Text style={style.text}>Annual Income: ${user.annual_income}</Text>
      </View>
      <View style={style.boxContainer}>
      <Text style={style.text}>Mother Tongue: {user.mother_tongue}</Text>
      <Text style={style.text}>Country: {user.country_living_in}</Text>
      </View>
      <Text style={style.subHeading}>About Me</Text>
      <View style={style.boxContainer}>
      <Text style={style.text}>About Me: {user.about_me}</Text>
      <Text style={style.text}>About Family: {user.about_family}</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  headingtext:{
    color:'#fff',
    fontSize:30
  },
  subHeading:{
    color:'#fff',
    fontSize:20
  },
  text:{
    color:'#fff',
    marginVertical:5
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginVertical:20
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  scrollContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#000",
    paddingVertical:10,
    position:"relative"
  },
  boxContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:"100%",
    flexWrap:"wrap",
    paddingHorizontal:20,
    paddingVertical:8
  },
  onlineDot:{
    position:'absolute',
    top:20,
    right:10,
    backgroundColor:"#00FF00",
    width:10,
    height:10,
    borderRadius:100
  }
})