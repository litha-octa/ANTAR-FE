import React, {useState} from "react";
import {View,Alert, Text, Image,Linking, StyleSheet, Dimensions, SafeAreaView,StatusBar,TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import {
  BannerLogin,
  IconPassword,
  IconUser,
  ShowOff,
  ShowOn,
} from "../../Assets/img";
import {colors, fontFam} from '../../Assets/colors'
import { BASE_URL } from "../../service";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login =({navigation, route})=>{
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
     const [show, setShow] = useState(false)

    const LoginHandler = ()=>{
      if(email === null || password === null) {
        Alert.alert('Lengkapi Username dan Password Anda')
        // navigation.navigate('Otp')
      }else{
         axios({
           method: "POST",
          //  url: `${BASE_URL}/${role}/auth`,
           url: `${BASE_URL}/login`,
           headers: {
             "Access-Control-Allow-Origin": "*",
           },
           data: {
             username: email,
             password: password,
           },
         })
           .then((res) => {
             console.log(res.data.success);
             if (res.data.success === true) {
               const storeData = async (key, value) => {
                 try {
                   await AsyncStorage.setItem(key, value);
                 } catch (e) {
                   console.log(e);
                 }
               };
               storeData("id", res.data.result.data.id.toString());
               if (
                 res.data.result.data.isVerify === 0 ||
                 res.data.result.data.isVerify === null
               ) {
                 navigation.navigate("Otp", {
                   currentPhone: res.data.result.data.phone,
                 });
               } else {
                 setEmail(null);
                 setPassword(null);
                 navigation.navigate("Home");
               }
             }
           })
           .catch((err) => {
             console.error(err);
           });
      }
    }

    


    return (
      <SafeAreaView style={{ height: "100%", backgroundColor: colors.white }}>
        <StatusBar hidden={true} />
        <ScrollView style={{ height: "100%" }}>
          <View style={s.body}>
            <Image source={BannerLogin} style={s.banner} />
            <View style={s.container}>
              <Text style={s.title}>Selamat Datang di Aplikasi Antar</Text>
              <Text style={s.title2}>
                Silahkan Masukkan Username dan Password
              </Text>
            </View>

            <View style={[s.container, { marginTop: "2%" }]}>
              <KeyboardAvoidingView>
                <Text style={s.title2}>Username</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: colors.lightGrey,
                    padding: 3,
                    marginVertical: 10,
                  }}
                >
                  <Image
                    source={IconUser}
                    style={{
                      width: 35,
                      height: 35,
                      marginHorizontal: 5,
                    }}
                  />
                  <TextInput
                    placeholder={"Masukkan Username"}
                    style={{
                      width: "75%",
                    }}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                  />
                </View>

                <Text style={s.title2}>Password</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: colors.lightGrey,
                    padding: 3,
                    marginVertical: 10,
                  }}
                >
                  <Image
                    source={IconPassword}
                    style={{
                      width: 35,
                      height: 35,
                      marginHorizontal: 5,
                    }}
                  />
                  <TextInput
                    placeholder={"Masukkan Password"}
                    style={{
                      width: "75%",
                    }}
                    secureTextEntry={show === false ? true : false}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                  />
                  <TouchableOpacity onPress={() => setShow(!show)}>
                    <Image
                      source={show === false ? ShowOn : ShowOff}
                      style={{
                        width: 35,
                        height: 35,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: "100%"}}>
                  <TouchableOpacity
                  style={{flexDirection:'row-reverse'}}
                    onPress={() =>
                      Linking.openURL(
                        "https://api.whatsapp.com/send/?phone=6287780929728&text=Hai%20Admin,%20Saya%20minta%20bantuan%20untuk%20ubah%20password%20akun%20Antar%20saya&type=phone_number"
                      )
                    }
                  >
                    <Text
                      style={{
                        fontFamily: fontFam,
                        fontSize: 18,
                        fontWeight: "bold",
                        color: colors.main,
                      }}
                    >
                      Lupa Password
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={s.btnLogin}
                  onPress={() => {
                    LoginHandler();
                    // navigation.navigate("Otp", {
                    //   currentPhone: phone
                    // });
                    // navigation.navigate("Home");
                  }}
                >
                  <Text style={s.textBtnLogin}>Login</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const s = StyleSheet.create({
  body: {
    width: windowWidth,
    height: '100%',
    backgroundColor:colors.lightGrey,
  },
  banner: {
    width: '100%',
    height: 350,
    // resizeMode: "contain",
  },
  container: {
    width: windowWidth,
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor:colors.white,
  },
  title: {
    fontFamily: fontFam,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color:colors.black,
  },
  title2: {
    fontFamily: fontFam,
    fontSize: 15,
    color:colors.grey,
  },
  btnLogin:{
    backgroundColor:colors.main,
    width:'100%',
    borderRadius:10,
    marginVertical:10,
    padding:5,
    height:40,
  },
  textBtnLogin:{
    fontFamily:fontFam,
    fontSize:15,
    color:colors.white,
    textAlign:'center',
  }
});
export default Login
