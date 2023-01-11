import React, { useState, useEffect } from "react";
import {View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { FotoKTP, LeftArrowTail , UploadFoto} from "../../Assets/img";
import {colors, fontFam} from '../../Assets/colors'
import RNPickerSelect from "react-native-picker-select";
import Checkbox from "expo-checkbox";
import axios from "axios";
import { BASE_URL } from "../../service";

const NewBantuan = ({navigation})=>{
  const [check, setCheck] = useState(true)
  const [jenis,setJenis]= useState()
  const getJenis = ()=>{
  axios.get(`${BASE_URL}/jenis`)
  .then((res)=>{
    console.log(res.data.result.data)
    setJenis(res.data.result.data)

  })
  .catch((err)=>{console.log(err)})
  }
  useEffect(()=>{
getJenis()
  },[])
    return (
      <View style={s.body}>
        <ScrollView>
          <View style={s.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={LeftArrowTail} style={{ width: 30, height: 25 }} />
            </TouchableOpacity>
            <Text style={s.headerText}> Isi Detail Laporan</Text>
          </View>
          <View style={s.whiteContainer}>
            <Text style={s.titleWhiteCon}>Detail Penerima Bantuan</Text>

            <Text style={s.itemData}>Nama Penerima</Text>
            <TextInput style={s.inputText} />
            <Text style={s.itemData}>Alamat Sesuai KTP</Text>
            <TextInput style={s.inputText} />
            <Text style={s.itemData}>Pekerjaan</Text>
            <TextInput style={s.inputText} />
            <Text style={s.itemData}>No KTP</Text>
            <TextInput style={s.inputText} />
            <Text style={s.itemData}>No HP</Text>
            <TextInput style={s.inputText} />
            <Text style={s.titleWhiteCon}>Foto Selfie KTP</Text>
            <Image
              source={UploadFoto}
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity style={s.btnUpload}>
              <Text style={s.textBtnUpload}>Tambah Foto</Text>
            </TouchableOpacity>
            <Text style={[s.itemData, { fontSize: 14, textAlign: "center" }]}>
              Besar file maks. 10mb dengan format .JPG, JPEG atau PNG.
            </Text>

            <Text style={s.titleWhiteCon}>Foto KTP </Text>
            <Image
              source={FotoKTP}
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity style={s.btnUpload}>
              <Text style={s.textBtnUpload}>Tambah Foto</Text>
            </TouchableOpacity>
            <Text style={[s.itemData, { fontSize: 14, textAlign: "center" }]}>
              Besar file maks. 10mb dengan format .JPG, JPEG atau PNG.
            </Text>
          </View>
          <View style={s.whiteContainer}>
            <Text style={s.titleWhiteCon}>Detail Bantuan</Text>
            <RNPickerSelect
              placeholder={{ label: "Jenis Bantuan", value: null }}
              onValueChange={(value) => console.log(value)}
              items={jenis}
            />
            <RNPickerSelect
              placeholder={{ label: "Judul Bantuan", value: null }}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "JavaScript", value: "JavaScript" },
                { label: "TypeScript", value: "TypeScript" },
                { label: "Python", value: "Python" },
                { label: "Java", value: "Java" },
                { label: "C++", value: "C++" },
                { label: "C", value: "C" },
              ]}
            />

            <Text style={s.itemData}>Kode Bantuan</Text>
            <TextInput style={s.inputText} />
            <Text style={s.itemData}>Kategori Bantuan</Text>
            <TextInput style={s.inputText} />
            <Text style={s.titleWhiteCon}>Foto Depan Stiker</Text>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Text style={{ width: "30%", marginLeft: "10%" }}>
                {check === true ? "Terkonfirmasi" : "Non Konfirmasi"}
              </Text>
              <Checkbox
                style={{ marginHorizontal: 10 }}
                onValueChange={() => {
                  setCheck(!check);
                }}
                value={check}
              />
            </View>
            <View style={check=== true?null:{display:'none'}}>
              <Image
                source={UploadFoto}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 10,
                }}
              />

              <TouchableOpacity style={s.btnUpload}>
                <Text style={s.textBtnUpload}>Tambah Foto</Text>
              </TouchableOpacity>
              <Text style={[s.itemData, { fontSize: 14, textAlign: "center" }]}>
                Besar file maks. 10mb dengan format .JPG, JPEG atau PNG.
              </Text>
            </View>
            <Text style={s.titleWhiteCon}>Catatan</Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              style={s.catatanInput}
              placeholder="Ketuk Untuk Memberikan Catatan"
            />
          </View>

          <TouchableOpacity
            style={s.btnSubmit}
            onPress={() => navigation.navigate("Status")}
          >
            <Text style={s.textBtnSubmit}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
}
export default NewBantuan

const s =StyleSheet.create({
    body:{
        backgroundColor:colors.lightGrey,
        width :'100%',
        height:'100%',
    },
header:{
    display:'flex',
    flexDirection:'row',
    width :'100%',
    paddingHorizontal:'3%',
    elevation:12,
    height:50,
    paddingTop:10,
    backgroundColor:colors.white,
},
headerText:{
    fontFamily:fontFam,
    color:colors.black,
    fontWeight:'bold',
    fontSize:16,
},
whiteContainer:{
    backgroundColor:colors.white,
    borderRadius:15,
    width:'94%',
    marginHorizontal:'3%',
    padding :15,
    marginVertical:10,
},
titleWhiteCon:{
    fontFamily:fontFam,
    fontSize:18,
    fontWeight:'bold',
    width:'100%',
    marginVertical:15,
},
itemData:{
    fontFamily:fontFam,
    fontSize:15,
    color:colors.grey,
    width:'100%',
    marginTop:10,
},
inputText:{
    borderBottomColor:colors.midGrey,
    borderBottomWidth:1,
    width:'96%',
    marginHorizontal:'2%',
    marginBottom:10,
},
btnUpload:{
    backgroundColor:colors.second,
    padding:10,
    borderRadius:20,
    alignSelf:'center',
    width:'40%',
},
textBtnUpload:{
    color:colors.main,
    fontFamily:fontFam,
    fontWeight:'bold',
    fontSize:16,
    textAlign:'center',
},
catatanInput:{
    padding :10,
    backgroundColor:colors.lightGrey,
    borderRadius:15,
},
btnSubmit:{
    backgroundColor:colors.main,
    width :'96%',
    marginHorizontal:'2%',
    marginVertical:20,
    borderRadius:15,
    padding :10,
    height:50,
},
textBtnSubmit:{
    textAlign:'center',
    fontFamily:fontFam,
    fontSize:18,
    fontWeight:'bold',
    color:colors.white,
}

})