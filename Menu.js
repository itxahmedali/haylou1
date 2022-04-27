import React, { useState, Component, useEffect, useCallback, useFocusEffect } from "react";
import { Text, View, Button, SafeAreaView, LinearGradient, ScrollView, StyleSheet, Image, TextInput, Animated, TouchableOpacity } from 'react-native'
import axiosConfig from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
export default function Menu({ navigation }) {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('...');
  const [token, Settoken] = useState([]);
  const [location, setLocation] = useState([]);
  const [users, setUsers] = useState([]);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
        setLocation({ lat: currentLatitude, lng: currentLongitude })
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    const getItemFromStorage = async () => {
      try {
        await AsyncStorage.getItem('access_token', (error, result) => {
          setTimeout(() => {
            axiosConfig.post('/dashboard_filter', { location }, {
              headers: {
                "Authorization": `Bearer ${result}`
              }
            }).then((res) => {
              setUsers(res?.data)
            }).catch((error) => {
              console.log(error);
            });
          }, 100);
        });
      } catch (error) {
      }
    }
    setTimeout(() => {
      getItemFromStorage()
      requestLocationPermission();
    }, 100);
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
  return (
    <SafeAreaView contentContainerStyle={style.container}>
      <ScrollView contentContainerStyle={style.scrollContainer}>
        <Text style={style.headingtext}>Users</Text>
        {
          users.map((res) => {
            if (res.image != null) {
              return (
                <View key={res.id} style={style.imageBox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile', { itemId: res.id })}>
                    <Image
                      source={{ uri: res.image }}
                      style={style.image} />
                    <Text style={style.text}>{res.name} {res.last_name}</Text>
                    {(() => {
                      if (res.gender == 'men') {
                        return (
                          <Text style={style.sectext}>Men</Text>
                        )
                      }
                      else{
                        return (
                          <Text style={style.sectext}>Women</Text>
                        )
                      }
                    })()}
                    <Text style={style.sectext}>{res.date}/{res.month}/{res.year}</Text>
                    <Text style={style.sectext}>{res.mother_tongue ? res.mother_tongue : "null"}</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  headingtext:{
    color:'#fff',
    fontSize:30,
    marginTop:30
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5
  },
  sectext: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 5
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100
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
    backgroundColor: "#000"
  },
  imageBox: {
    marginVertical: 20,
    borderWidth:1,
    borderColor:"#ff0065",
    // backgroundColor: "#ff0065",
    borderRadius: 20,
    padding: 10,
    width: 300,
    justifyContent: "center",
    alignItems: "center"
  }
})