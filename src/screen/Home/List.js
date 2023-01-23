import React, {useState, useEffect} from "react";
import {View,Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import { colors, fontFam } from "../../Assets/colors";
import { MiniLogo , LeftArrowTail} from "../../Assets/img";
import axios from "axios";
import { BASE_URL } from "../../service";
import AsyncStorage from "@react-native-async-storage/async-storage";


const List =({navigation, route})=>{
    const {name, uri} = route.params
    console.log(uri)
    const [data,setData] = useState()
    const getId = async () => {
      try {
        const result = await AsyncStorage.getItem("id");
        if (result !== null) {
          console.log(result);
            getdata(parseInt(result));
      } }catch (e) {
        console.log(e);
      }
    };


const getdata = (id) => {
  axios
    .get(uri)
    .then((res) => {
      console.log(res.data.result.data.length);
      setData(res.data.result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
    const dummy = {
        name : 'litha',
        area: 'jakarta',
    }

    useEffect(()=>{
getId()
    },[])
const Card = (props)=>{
    return (
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottomColor: colors.midGrey,
          borderBottomWidth: 2,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            width: "45%",
            textTransform: "capitalize",
            fontFamily: fontFam,
            color: colors.black,
            fontSize: 18,
            textAlign: "left",
          }}
        >
          {props.name}
        </Text>
        <Text
          style={{
            width: "50%",
            textTransform: "capitalize",
            fontFamily: fontFam,
            marginLeft: 10,
            color: colors.main,
            fontSize: 18,
            textAlign: "right",
          }}
        >
          {props.area}
        </Text>
      </TouchableOpacity>
    );
}

    return (
      <View style={s.body}>
        <ScrollView>
          <View style={s.header}>
            <TouchableOpacity style={{ width: "20%" }} onPress={()=>navigation.goBack()}>
              <Image source={LeftArrowTail} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <Text style={s.headerText}>{name}</Text>
          </View>
          <Image source={MiniLogo} style={s.topIcon} />
          <View>
            <Text style={s.title}>{`Jumlah ${name} Terdaftar`}</Text>
          </View>
          <View style={s.greyContainer}>
            {data?.map((item)=>{
              return (
                <Card
                  name={item ? item.username : dummy.name}
                  area={item ? (item.area? item.area:item.name) : dummy.area}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
}
export default List

const s = StyleSheet.create({
body :{
    backgroundColor:colors.white,
    width:'100%',
    height:'100%',
},
header:{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding:5,
            borderBottomColor:colors.midGrey,
            borderBottomWidth:2,
          },
headerText:{
    fontFamily:fontFam,
    fontSize:21,
    fontWeight:'bold',
    width :'80%',
    color:colors.black,
},
topIcon:{
    width :150,
    height:100,
    resizeMode:'contain',
    marginHorizontal:'10%',
    alignSelf:'center',
},
title:{
    fontSize:18,
    fontWeight:'bold',
    fontFamily:fontFam,
    marginHorizontal:15,
},
 greyContainer:{
backgroundColor:colors.lightGrey,
borderRadius:15,
paddingHorizontal :15,
paddingVertical:10,
width:'92%',
marginHorizontal:'4%',
marginTop:20,
}
})