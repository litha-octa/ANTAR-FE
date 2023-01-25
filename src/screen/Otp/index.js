import React, { useState, useRef, useEffect } from "react";
import {View, Text, Image,StatusBar, Alert,StyleSheet, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, SafeAreaView} from 'react-native'
import { TextInput } from "react-native-gesture-handler";
import { colors, fontFam } from "../../Assets/colors";
import { LeftArrowTail, MiniLogo, InsertPhoneNumber, InsertOtp, IconPhone } from "../../Assets/img";
import OTPTextInput from 'react-native-otp-textinput'
import { BASE_URL, API_OTP, TOKEN_OTP } from "../../service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Otp =({navigation, route})=>{
  const otpInput = useRef(null);
  

  const {currentPhone,role} = route.params
  const [id, setId] = useState()
    const [phone,setPhone] = useState(currentPhone?currentPhone:null)
    const first = phone.charAt(0);
    const formatedPhone = phone.replace(first, "62");
    //  console.log(formatedPhone);
    const [isPhoneFulfilled, setIsPhoneFulfilled] = useState(false)
    const [toOtp,setToOtp] = useState(false)
    const [otp,setOtp]=useState(null)
    const [otpByUser, setOtpByUser] = useState()
    
    const PhoneCheck = () =>{
        if(phone === null){
            Alert.alert('Masukkan Nomor Telepon !')
            return;
        }else{
            setIsPhoneFulfilled(true)
        }
    }
    useEffect(()=>{
      PhoneCheck()
      getData()
    },[])

    const getOtp = ()=>{
         axios({
           method: "POST",
           url: `${API_OTP}`,
           headers: {
             "Access-Control-Allow-Origin": "*",
             'Authorization':`${TOKEN_OTP}`,
           },
           data: {
             phone_no: formatedPhone.toString(),
           },
         })
         .then((res)=>{
          console.log(res.data)
          setOtp(res.data.otp);
          
         })
         .catch((err)=>{
          console.log(err)
         })
    }

const getData = async () => {
  try {
    const result =  await AsyncStorage.getItem('id');
    if(result !== null){
      console.log(result)
      setId(result)
    }
  } catch (e) {
    console.log(e)
  }
};

    const Verifing = ()=>{
      if(otp.toString()!==otpByUser){
        Alert.alert('Kode OTP Salah')
      }else{

        let formData = new FormData()
         formData.append('phone', phone);
         formData.append("isVerify", 1);

        // axios.patch(
        //   `${BASE_URL}/user/update/${parseInt(id)}`,
        //   {headers:{
        //     "Access-Control-Allow-Origin": "*",
        //   },
        //   data:formData
        // })

         var config = {
           method: "PATCH",
           body: formData,
           redirect: "follow",
         };

         fetch(`${BASE_URL}/user/update/${parseInt(id)}`, config)
           .then((res) => {
            if(res.ok=== true){
              console.log(res.ok)
              navigation.navigate("StatusVerify", {verified : res.ok.toString()})
            }
           })
           .catch((err) => {
             console.error(err);
           });
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
        <StatusBar hidden={true} />
        <ScrollView style={{ backgroundColor: colors.white }}>
          <View style={s.body}>
            <Header
              goBack={() => {
                toOtp === true ? setToOtp(false) : navigation.goBack();
              }}
            />
            <View>
              <Image
                source={toOtp === false ? InsertPhoneNumber : InsertOtp}
                style={s.mainImg}
              />
              <Text style={s.title}>
                {toOtp === false ? "Masukkan No Hp" : "Verifikasi OTP"}
              </Text>
              <Text style={s.desc}>
                {toOtp === false
                  ? "silahkan masukan nomor ponsel anda untuk memverifikasi akun anda"
                  : `silahkan ketik kode verifikasi yang dikirim ke ${phone}`}
              </Text>
            </View>
            <View style={s.container}>
              <KeyboardAvoidingView>
                <Text
                  style={
                    toOtp === false
                      ? [s.desc, { textAlign: "left" }]
                      : { display: "none" }
                  }
                >
                  no.hp
                </Text>
                <View
                  style={
                    toOtp === false
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
                    // defaultValue={currentPhone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <OTPTextInput
                    inputCount={6}
                    handleTextChange={(text)=>{setOtpByUser(text);}}
                    containerStyle={
                      toOtp === true
                        ? s.textInputContainer
                        : { display: "none" }
                    }
                    textInputStyle={
                      toOtp === true ? s.roundedTextInput : { display: "none" }
                    }
                    tintColor={colors.main}
                  />
                </View>

                <TouchableOpacity
                  style={s.btnSubmit}
                  onPress={() => {
                    toOtp === false
                      ? (setToOtp(true), getOtp())
                      : 
                      Verifing()
                      // navigation.navigate('Home')
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
    width:50,
    height:50,
    borderRadius: 10,
    backgroundColor:colors.lightGrey,
  },
});