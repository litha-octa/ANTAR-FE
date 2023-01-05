import React, {useState} from "react";
import {View,Alert, Text, Image, StyleSheet, Dimensions, SafeAreaView,StatusBar,TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import {
  BannerLogin,
  IconPassword,
  IconUser,
  ShowOff,
  ShowOn,
} from "../../Assets/img";
import {colors, fontFam} from '../../Assets/colors'
import { BASE_URL } from "../../service";

const Login =({navigation})=>{
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const LoginHandler = ()=>{
      if(email === null || password === null) {
        // Alert.alert('Lengkapi Username dan Password Anda')
        navigation.navigate('Otp')
      }else{
         axios({
           method: "POST",
           url: `${BASE_URL}/login`,
           headers: {
             "Access-Control-Allow-Origin": "*",
           },
           data: {
             username: email,
             password: password,
           },
         })
         .then((res)=>{
          console.log(res)
         })
         .catch((err)=>{
          console.log(err)
         })
      }
    }

    const Input = (props)=>{
        const [show, setShow] = useState(false)
        return (
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
              source={props.leftImg}
              style={{
                width: 35,
                height: 35,
                marginHorizontal: 5,
              }}
            />
            <TextInput
              placeholder={props.placeholder}
              style={{
                width: "75%",
              }}
              secureTextEntry={props.password && show === false ? true : false}
              value={props.value}
              onChangeText={props.onChangeText}
            />
            <TouchableOpacity onPress={()=>setShow(!show)}>
              <Image
                source={show === false ? ShowOn : ShowOff}
                style={props.rightImg?{
                  width: 35,
                  height: 35,
                }:{display:'none'}}
              />
            </TouchableOpacity>
          </View>
        );
    }


    return (
      <SafeAreaView style={{height:windowHeight, backgroundColor:colors.white}}>
        <StatusBar hidden={true} />
        <ScrollView>
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
                <Input
                  leftImg={IconUser}
                  placeholder="Masukkan Username"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
                <Text style={s.title2}>Password</Text>
                <Input
                  leftImg={IconPassword}
                  placeholder="Masukkan Password"
                  rightImg
                  password
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                />
                <TouchableOpacity
                  style={s.btnLogin}
                  onPress={() => {
                    LoginHandler()
                    // navigation.navigate("Otp");
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
    height: 'auto',
    backgroundColor:colors.lightGrey,
  },
  banner: {
    width: windowWidth,
    height: windowHeight * 0.5,
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
