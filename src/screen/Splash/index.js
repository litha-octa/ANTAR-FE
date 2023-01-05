import React, {useEffect} from "react";
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { colors } from "../../Assets/colors";
import {Logo} from '../../Assets/img'

const Splash = ({navigation})=>{
useEffect(()=>{
 setTimeout(() => {
   navigation.replace("Login");
 }, 3000);
    },[])
    return (
      <SafeAreaView>
        <StatusBar hidden={true}/>
        <View style={s.body}>
          <Image source={Logo} style={s.img} />
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