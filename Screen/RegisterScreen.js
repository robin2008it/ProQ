/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import uuid from 'react-native-uuid';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './Components/loader';

const RegisterScreen = props => {
  let [phone, setPhone] = useState('');
  let [email, setEmail] = useState('');
  let [businessName, setBusinessName] = useState('');
  let [qrcodeUrl, setQrcodeUrl] = useState('');
  let [address, setAddress] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext('');
    console.log("in submit");
    // if (!email) {
    //   alert('Please fill Email');
    //   return;
    // }
    // if (!userAge) {
    //   alert('Please fill Age');
    //   return;
    // }
    // if (!userAddress) {
    //   alert('Please fill Address');
    //   return;
    // }
    //Show Loader
    setLoading(true);
    //var id = DeviceInfo.getUniqueID();
    var id = uuid.v1();
    console.log("id is===>"+id)
    var dataToSend = {
      "id": id,
      "uuid": id,
      "email": email,
      "businessName": businessName,
      "phone": phone,
      "address": address
    };
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
    console.log(dataToSend);
    const headers = {
      'x-api-key': 'WtfpAtDWTV53wbgPTKgYSLcObj583Pg6ksDtzYVi'
    }
    axios.put('https://0bq0a4kn5b.execute-api.us-east-2.amazonaws.com/default/saveBusiness', dataToSend, {
            headers: headers
          })
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                  setQrcodeUrl("http://demoserviceurl/?businessId="+id);
                  setIsRegistrationSuccess(true);
                      console.log("save successfull");
                      //window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    // fetch('https://0bq0a4kn5b.execute-api.us-east-2.amazonaws.com/default/saveBusiness', {
    //   method: 'PUT',
    //   body: formBody,
    //   headers: {
    //     //Header Definition
    //     'x-api-key': 'WtfpAtDWTV53wbgPTKgYSLcObj583Pg6ksDtzYVi',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status == 1) {
    //       setIsRegistrationSuccess(true);
    //       console.log('Registration Successful. Please Login to proceed');
    //     } else {
    //       setErrortext('Registration Unsuccessful');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };
  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
          <QRCode
          //QR code value
          value={qrcodeUrl}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="white"
          //Background Color of the QR Code (Optional)
          backgroundColor="black"
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Print Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      {/* <Loader loading={loading} /> */}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={Email => setEmail(Email)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Email"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
            //   ref={ref => {
            //     this._emailinput = ref;
            //   }}
              returnKeyType="next"
              //onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={Phone => setPhone(Phone)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Phone"
              placeholderTextColor="#F6F6F7"
              keyboardType="numeric"
            //   ref={ref => {
            //     this._emailinput = ref;
            //   }}
              returnKeyType="next"
              //onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={BusinessName => setBusinessName(BusinessName)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Name of the business"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   this._emailinput && this._emailinput.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={Address => setAddress(Address)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Address"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
            //   ref={ref => {
            //     this._addressinput = ref;
            //   }}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#0394D8',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});