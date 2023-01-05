import React, { useState, useRef } from "react";
import {View, Text, Image,StatusBar, Alert,StyleSheet, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, SafeAreaView} from 'react-native'
import { TextInput } from "react-native-gesture-handler";
import { colors, fontFam } from "../../Assets/colors";
import { LeftArrowTail, MiniLogo, InsertPhoneNumber, InsertOtp, IconPhone } from "../../Assets/img";
import OTPTextInput from 'react-native-otp-textinput'

const Otp =({navigation})=>{
  const otpInput = useRef(null);
    const [phone,setPhone] = useState(null)
    const [isPhoneFulfilled, setIsPhoneFulfilled] = useState(false)
    
    const PhoneCheck = () =>{
        if(phone === null){
            Alert.alert('Masukkan Nomor Telepon !')
            return;
        }else{
            setIsPhoneFulfilled(true)
        }
    }


    const Header =(props)=>{
        return (
          
            <View style={s.header}>
              <TouchableOpacity style={{ width: "10%" }} onPress={props.goBack}>
                <Image source={LeftArrowTail} style={s.backIcon} />
              </TouchableOpacity>
              <Text style={s.textHeader}>Kembali</Text>
              <View style={{ width: "25%" }}>
                <Image source={MiniLogo} style={s.headerLogo} />
              </View>
            </View>
          
        );
    }
    return (
      <SafeAreaView>
        <StatusBar hidden ={true}/>
        <ScrollView style={{ backgroundColor: colors.white }}>
          <View style={s.body}>
            <Header
              goBack={() => {
                isPhoneFulfilled === true
                  ? (setIsPhoneFulfilled(false), setPhone(null))
                  : navigation.goBack();
              }}
            />
            <View>
              <Image
                source={
                  isPhoneFulfilled === false ? InsertPhoneNumber : InsertOtp
                }
                style={s.mainImg}
              />
              <Text style={s.title}>
                {isPhoneFulfilled === false
                  ? "Masukkan No Hp"
                  : "Verifikasi OTP"}
              </Text>
              <Text style={s.desc}>
                {isPhoneFulfilled === false
                  ? "silahkan masukan nomor ponsel anda untuk memverifikasi akun anda"
                  : `silahkan ketik kode verifikasi yang dikirim ke ${phone}`}
              </Text>
            </View>
            <View style={s.container}>
              <KeyboardAvoidingView>
                <Text
                  style={
                    isPhoneFulfilled === false
                      ? [s.desc, { textAlign: "left" }]
                      : { display: "none" }
                  }
                >
                  no.hp
                </Text>
                <View
                  style={
                    isPhoneFulfilled === false
                      ? {
                          backgroundColor: colors.lightGrey,
                          borderRadius: 10,
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          padding: "2%",
                          marginBottom: "5%",
                        }
                      : {
                          display: "none",
                        }
                  }
                >
                  <Image
                    source={IconPhone}
                    style={{
                      width: 30,
                      height: 40,
                    }}
                  />
                  <TextInput
                    placeholder="+62"
                    style={{ width: "90%" }}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <OTPTextInput
                    handleTextChange={(e) => {}}
                    containerStyle={
                      isPhoneFulfilled === true
                        ? s.textInputContainer
                        : { display: "none" }
                    }
                    textInputStyle={
                      isPhoneFulfilled === true
                        ? s.roundedTextInput
                        : { display: "none" }
                    }
                    tintColor={colors.main}
                  />
                </View>

                <TouchableOpacity
                  style={s.btnSubmit}
                  onPress={() => {
                    isPhoneFulfilled === false
                      ? PhoneCheck()
                      : navigation.navigate("Home");
                  }}
                >
                  <Text style={s.textBtnSubmit}>
                    {isPhoneFulfilled === false ? "Lanjut" : "Verifikasi"}
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
export default Otp
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const s = StyleSheet.create({
  body: {
    width: windowWidth,
    height: "100%",
    backgroundColor: colors.white,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "3%",
    paddingTop: 10,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  textHeader: {
    fontFamily: fontFam,
    fontSize: 25,
    fontWeight: "bold",
    color: colors.grey,
    width: "60%",
    paddingLeft: 10,
  },
  headerLogo: {
    width: 90,
    height: 30,
  },
  mainImg: {
    marginTop: windowHeight * 0.15,
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    width: "100%",
    fontFamily: fontFam,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.black,
  },
  desc: {
    width: "100%",
    fontFamily: fontFam,
    fontSize: 16,
    textAlign: "center",
    color: colors.grey,
    paddingHorizontal: "5%",
  },
  container: {
    width: "100%",
    marginTop: "5%",
    paddingHorizontal: "3%",
  },
  btnSubmit: {
    backgroundColor: colors.main,
    height: 40,
    borderRadius: 10,
    padding: 5,
  },
  textBtnSubmit: {
    color: colors.white,
    textAlign: "center",
    fontFamily: fontFam,
    fontSize: 17,
  },
  textInputContainer: {
    marginBottom: 20,
    width:'100%',
    alignSelf:'center'
  },
  roundedTextInput: {
    width:70,
    height:70,
    borderRadius: 10,
    backgroundColor:colors.lightGrey,
  },
});