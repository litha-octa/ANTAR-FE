import React, {useEffect, useState} from "react";
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { colors } from "../../Assets/colors";
import {MiniLogo} from '../../Assets/img'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({navigation})=>{

  const [id, setId] = useState()
  const getId = async () => {
    try {
      const result = await AsyncStorage.getItem("id");
      if (result !== null) {
        console.log(result);
        setId(result)
        navigation.replace('Home')
      }else{
        navigation.replace('Login')
      }
    } catch (e) {
      console.log(e);
    }
  };
useEffect(()=>{
 setTimeout(() => {
  getId();
  //  navigation.replace("Login");
 }, 3000);
    },[])
    return (
      <SafeAreaView>
        <StatusBar hidden={true}/>
        <View style={s.body}>
          <Image source={MiniLogo} style={s.img} />
        </View>
      </SafeAreaView>
    );
}
export default Splash

const s = StyleSheet.create({
    body:{
        backgroundColor:colors.white,
        width:'100%',
        height:'100%',
        justifyContent:'center',
    },
    img:{
        width :'40%',
        height:'40%',
        resizeMode :'contain',
        alignSelf:'center',
    }
})