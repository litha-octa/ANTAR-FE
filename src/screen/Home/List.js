import React from "react";
import {View,Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import { colors, fontFam } from "../../Assets/colors";
import { MiniLogo , LeftArrowTail} from "../../Assets/img";

const List =({navigation, route})=>{
    const {name} = route.params

    const dummy = {
        name : 'litha',
        area: 'jakarta',
    }

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
            <View style={{ width: "20%" }}>
              <Image source={LeftArrowTail} style={{ width: 40, height: 40 }} />
            </View>
            <Text style={s.headerText}>{name}</Text>
          </View>
          <Image source={MiniLogo} style={s.topIcon} />
          <View>
            <Text style={s.title}>{`Jumlah ${name} Terdaftar`}</Text>
          </View>
          <View style={s.greyContainer}>
            <Card name={dummy.name} area={dummy.area} />
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