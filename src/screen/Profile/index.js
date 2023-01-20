import React, { useEffect, useState } from "react";
import {View, Text, SafeAreaView,StatusBar,StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Alert} from 'react-native'
import { LeftArrowTail, DefaultProfileSquare } from "../../Assets/img";
import {colors, fontFam} from '../../Assets/colors'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../service";
import * as ImagePicker from "expo-image-picker";

const Profile =({navigation})=>{
const [username,setUsername] = useState(null)
const [phone, setPhone] = useState(null)
const [pass, setPass] = useState(null)
const [ava,setAva] = useState(null)
 const [id,setId] = useState()

const [current,setCurrent] = useState({ 
  username : '',
  phone :'',
  avatar:'',
  isVerify : '',
  role:'',
})
 const getId = async () =>{
  try {
    const result = await AsyncStorage.getItem("id");
  if(result !== null ){
   setId(parseInt(result))
   getData(result)
  }
  }catch(e){
    console.log(e)
  }
}

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setAva(result.assets[0].uri);
  }
};


const getData = (x) => {
  axios.get (`${BASE_URL}/user/${x}`)
  .then((res)=>{
    console.log(res.data.result.data[0])
    setCurrent(res.data.result.data[0])
    let data = res.data.result.data[0]
    setCurrent({
      ...current,
      username: data.username,
      phone: data.phone,
      isVerify: data.isVerify,
      role: data.role,
      avatar: data.avatar,
    });
    // setCurrent({...current, phone : data.phone })
    // setCurrent({...current, isVerify : data.isVerify })
    // setCurrent({ ...current, role: data.role });
    // setCurrent({ ...current, avatar: data.avatar });
  })
  .catch((err)=>{
    console.log(err)
  })
}

const updateHandler = () =>{
  let formData = new FormData()
  username !== null && username !== current.username ? formData.append('username', username) : null;
  phone !== null && phone !== current.phone
    ? formData.append("phone", phone)
    : null;
  phone !== null && phone !== current.phone ? formData.append('isVerify', 0):null
ava !== current.avatar && ava !== null? formData.append('avatar', ava) : null

// axios.patch(`${BASE_URL}/user/update/${id}`, {
//   headers: { "Access-Control-Allow-Origin": "*" },
//   data:formData,
// })
 var config = {
       method: 'PATCH',
       body: formData,
       redirect: 'follow',
     };
     fetch(`${BASE_URL}/user/update/${id}`, config)
.then((res)=>{
  if(res.ok === true){
    Alert.alert('Update Berhasil')
    navigation.navigate('Home')
  }
})
.catch((err)=>console.error(err.response.data))
}

useEffect(()=>{
getId()
},[])

    return (
      <SafeAreaView style={{ backgroundColor: colors.white }}>
        <StatusBar hidden={true} />
        <ScrollView>
          <View style={s.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={LeftArrowTail} style={s.headerIcon} />
            </TouchableOpacity>
            <Text style={s.headerText}>Profile</Text>
          </View>
          <View style={s.body}>
            <View style={s.container}>
              <Text style={s.titleContainer}>Foto Profile</Text>
              <Image
                source={DefaultProfileSquare}
                style={
                  current.avatar !== null ? { display: "none" } : s.profilPic
                }
              />
              <Image
                source={current.avatar ? { uri: current.avatar } : { uri: ava }}
                style={
                  current.avatar === null ? { display: "none" } : s.profilPic
                }
              />
              <TouchableOpacity
                style={s.btnUpload}
                onPress={() => {
                  pickImage();
                }}
              >
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
                  defaultValue={current?.username}
                  onChangeText={(text) => setUsername(text)}
                  style={{ width: "100%", textTransform: "capitalize" }}
                />
                <Text style={s.inputTitle}>No HP</Text>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    value={phone}
                    defaultValue={current?.phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                    style={{ width: "70%" }}
                  />
                  <View
                    style={
                      current.isVerify === 1
                        ? {
                            width: "30%",
                            backgroundColor: "green",
                            borderRadius: 15,
                          }
                        : {
                            width: "30%",
                            backgroundColor: colors.mustard,
                            borderRadius: 15,
                          }
                    }
                  >
                    <Text style={{ color: colors.white, textAlign: "center" }}>
                      {current.isVerify === 1
                        ? "Terverifikasi"
                        : "Tidak Terverifikasi"}
                    </Text>
                  </View>
                </View>
                <Text style={s.inputTitle}>Peran</Text>
                <TextInput
                  value={current?.role}
                  editable={false}
                  style={{ width: "100%", textTransform: "capitalize" }}
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
            <TouchableOpacity
              style={s.btnUpdate}
              onPress={() => {
                updateHandler();
              }}
            >
              <Text style={s.textBtnUpdate}>
                {username !== null ||
                username !== current.username ||
                phone !== null ||
                phone !== current.phone ||
                ava !== null ||
                ava !== current.avatar
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