import React, { useState } from "react";
import {View, Text, SafeAreaView,StatusBar,StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native'
import { LeftArrowTail, DefaultProfileSquare } from "../../Assets/img";
import {colors, fontFam} from '../../Assets/colors'

const Profile =({navigation})=>{
const [username,setUsername] = useState(null)
const [phone, setPhone] = useState(null)
const [pass, setPass] = useState(null)

    return (
      <SafeAreaView style={{ backgroundColor: colors.white }}>
        <StatusBar hidden={true} />
        <ScrollView>
          <View style={s.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Image source={LeftArrowTail} style={s.headerIcon} />
            </TouchableOpacity>
            <Text style={s.headerText}>Profile</Text>
          </View>
          <View style={s.body}>
            <View style={s.container}>
              <Text style={s.titleContainer}>Foto Profile</Text>
              <Image source={DefaultProfileSquare} style={s.profilPic} />
              <TouchableOpacity style={s.btnUpload}>
                <Text style={s.textBtnUpload}>Tambah Foto</Text>
              </TouchableOpacity>
              <Text style={s.desc}>
                Besar file maks. 10mb dengan format .JPG, JPEG atau PNG.
              </Text>
            </View>
            <View style={s.container}>
              <KeyboardAvoidingView>
                <Text style={s.titleContainer}>Edit Profile</Text>
                <Text style={s.inputTitle}>Nama Profile</Text>
                <TextInput
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  style={{ width: "100%" }}
                />
                <Text style={s.inputTitle}>No HP</Text>
                <TextInput
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  keyboardType="numeric"
                  style={{ width: "100%" }}
                />
                <Text style={s.titleContainer}>Keamanan </Text>
                <Text style={s.inputTitle}>Password</Text>
                <TextInput
                  value={pass}
                  onChangeText={(text) => setPass(text)}
                  style={{ width: "100%" }}
                />
              </KeyboardAvoidingView>
            </View>
            <TouchableOpacity style={s.btnUpdate}>
              <Text style={s.textBtnUpdate}>
                {username !== null || phone !== null || pass !== null
                  ? "Simpan"
                  : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
export default Profile

const s = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.white,
    elevation: 8,
    padding: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontFamily: fontFam,
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
    marginLeft: "5%",
    width: "80%",
  },
  body: {
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: colors.lightGrey,
    width: "94%",
    borderRadius: 15,
    margin: "3%",
    padding: "2%",
  },
  profilPic: {
    width: 130,
    height: 130,
    alignSelf: "center",
  },
  titleContainer: {
    fontFamily: fontFam,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btnUpload: {
    backgroundColor: colors.second,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textBtnUpload: {
    fontFamily: fontFam,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.main,
  },
  desc: {
    fontFamily: fontFam,
    fontSize: 14,
    color: colors.grey,
    width: "100%",
    paddingHorizontal: "5%",
    textAlign: "center",
  },
  inputTitle: {
    color: colors.grey,
    fontFamily: fontFam,
  },
  btnUpdate: {
    backgroundColor: colors.main,
    width: "94%",
    marginHorizontal: "3%",
    padding: 10,
    borderRadius: 20,
  },
  textBtnUpdate:{
    fontFamily:fontFam,
    fontSize:17,
    color:colors.white,
    textAlign:'center'
  }
});