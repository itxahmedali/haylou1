import { Text, View, Button, StyleSheet, Image, TextInput, Animated, TouchableOpacity } from 'react-native'
import React, { useState, Component, useEffect } from "react";
import LinearGradient from 'react-native-linear-gradient';
import RadioForm from 'react-native-simple-radio-button';
import OTPTextView from 'react-native-otp-textinput';
import Modal from "react-native-modal";
import axiosConfig from './axiosConfig';
import Toast from 'react-native-simple-toast';
export default function SignupScreen({ navigation }) {
  state = {
    fadeAnimation: new Animated.Value(0)
  };
  useEffect(() => {
    Animated.timing(state.fadeAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }, [])
  // radio buttons
  var radio_props = [
    { label: 'Male', value: "Male" },
    { label: 'Female', value: "Female" }
  ];
  const [name, setName] = useState([])
  const [last_name, setLast_name] = useState([])
  const [gender, setGender] = useState(['Male'])
  const [date, setDate] = useState([])
  const [month, setMonth] = useState([])
  const [year, setYear] = useState([])
  const [phone_number, setPhone_number] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const [otp, setOtp] = useState([])
  // modal
  const [isModalVisible, setModalVisible] = useState(false);
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('access_token', JSON.stringify(value))
    } catch (e) {
    }
  }
  const otpModal = () => {
    setModalVisible(true);
    axiosConfig.post('/otp', { email: email }, false)
      .then(function (response) {
        console.log(response);
        if (response.data.hasOwnProperty('message') == "An OTP code sent to the registered email.") {
          Toast.show(message);
        }
        else {
          Toast.show('Incorrect credentials');
          return
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
const register = () => {
  axiosConfig.post('/register', { name: name, last_name: last_name, gender: gender, password: password, date: date, month: month, year: year, phone_number: phone_number, type: 'user', otp: otp, email: email }, false)
    .then(function (response) {
      console.log(response);
      if(response.data.hasOwnProperty('access_token')){
        setModalVisible(false);
        storeData(response.data.access_token)
        Toast.show('Register Successful');
        navigation.navigate('Menu')
      }
      else{
        setModalVisible(false);
        Toast.show("Can't register");
        return
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <LinearGradient
      style={style.background}
      colors={['#ff0065', '#ffb58a']}>
      <TextInput
        onChangeText={((e) => { setName(e) })}
        placeholder='First Name'
        style={style.inputField}
      />
      <TextInput
        onChangeText={((e) => { setLast_name(e) })}
        placeholder='Last Name'
        style={style.inputField}
      />

      <View style={style.radioButtonBox}>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#2196f3'}
          buttonSize={20}
          buttonOuterSize={20}
          buttonOuterColor={'#2196f3'}
          animation={true}
          labelStyle={{ marginRight: 10 }}
          onPress={(value) => { setGender(value) }}
        />
      </View>
      <View style={style.dateBox}>
        <TextInput
          onChangeText={((e) => { setDate(e) })}
          placeholder='Date'
          style={style.dateinputField}
        />
        <TextInput
          onChangeText={((e) => { setMonth(e) })}
          placeholder='Month'
          style={style.dateinputField}
        />
        <TextInput
          onChangeText={((e) => { setYear(e) })}
          placeholder='Year'
          style={style.dateinputField}
        />
      </View>
      <TextInput
        onChangeText={((e) => { setPhone_number(e) })}
        placeholder='Phone Number'
        style={style.inputField}
      />
      <TextInput
        onChangeText={((e) => { setEmail(e) })}
        placeholder='Email Address'
        style={style.inputField}
      />
      <TextInput
        onChangeText={((e) => { setPassword(e) })}
        placeholder='Password'
        style={style.inputField}
        secureTextEntry={true}
      />
      <TouchableOpacity style={style.signupButton}
        onPress={otpModal}>
        <Text style={style.signupButtonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={style.signinLabel}>Already have an account? <Text style={style.signinLabelHighlighted}>Sign In</Text>  </Text>
      </TouchableOpacity>
    </LinearGradient>
    <Modal isVisible={isModalVisible}
      backdropColor={"black"}
      transparent={true}
      backdropOpacity={0.6}>
      <View style={style.container}>
        <OTPTextView
          containerStyle={style.textInputContainer}
          handleTextChange={(e) => setOtp(e)}
          inputCount={4}
          keyboardType="numeric"
        />
        <Button title="Register" onPress={register} />
      </View>
    </Modal>
  </View>

);
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 5,
    color: "#fff"
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100
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
  signupButton: {
    alignItems: "center",
    backgroundColor: "#ff0065",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 20,
  },
  signupButtonText: {
    color: "#fff"
  },
  signinLabel: {
    color: "#fff"
  },
  signinLabelHighlighted: {
    color: "#ff0065",
    fontWeight: "600"
  },
  radioButtonBox: {
    marginTop: 20,
  },
  dateBox: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  dateinputField: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    width: "25%",
    marginTop: 20,
    padding: 10,
    color: "#fff",
    marginHorizontal: "3.5%"
  }
})
