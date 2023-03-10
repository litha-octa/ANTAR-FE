import React, { useState, useEffect } from "react";
import {
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert, 
} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { 
  FotoKTP, 
  LeftArrowTail , 
  UploadFoto, 
  BtnMinGrey,
  BtnMinRed,
  BtnPlusRed,
} from "../../Assets/img";
import {colors, fontFam} from '../../Assets/colors'
import Checkbox from "expo-checkbox";
import axios from "axios";
import { BASE_URL } from "../../service";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewBantuan = ({navigation, route})=>{
const {selectedCode, latitude,longitude} = route.params

console.log(latitude, longitude,)
const [currentData,setCurrentData] = useState()
const [editable,setEditable] = useState(true)

const getDetail = () =>{
  if(selectedCode !== null) {
  axios.get(`${BASE_URL}/new/${selectedCode}`)
  .then((res)=>{
    console.log('detail : ',res.data.result.data[0])
    setCurrentData(res.data.result.data[0])
    if(res.data.result.data[0].status === 1){
    setEditable(false)
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}else{
  setCurrentData(null)
}
}

  const [id,setId] = useState(null)
  const [code, setCode] = useState(null);
  const [nik, setNik] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [profession, setProfession] = useState(null);
  const [famMember, setFamMember] = useState(null);
  const [otherMember, setOtherMember] = useState(null);
  const [selfie,setSelfie] = useState(null)
  const [ktp,setKtp] = useState(null)

  
  const [title, setTitle] = useState(null)
  const [selectedJenis, setSelectedJenis] = useState(1);
  const [status,setStatus] = useState(0)
  const [kategori,setKategori] = useState(null)
  const [note,setNote] = useState(null)
  const [img,setImg] = useState(null)
  const [start,setStart] = useState(null)
  const [finish, setFinish] = useState(null)
  const [wilayah, setWilayah] = useState(null)

  const [jenis,setJenis]= useState(null)

  const [fullfiled, setFullfiled] = useState({
    detail : false,
    penerima : false,
    relawan : false,
    })

  const uploadKtp = async()=>{
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result);
      setKtp(result.assets[0].uri);
    }
  }

 const upPicWitSticker = async()=>{ 
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result)
      setImg(result.assets[0].uri);
    }
  }
  const SelfieHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result)
      setSelfie(result.assets[0].uri);
    }
  };



  const getJenis = ()=>{
  axios.get(`${BASE_URL}/jenis`)
  .then((res)=>{
    console.log(res.data.result.data)
    setJenis(res.data.result.data)

  })
  .catch((err)=>{console.log(err)})
  }
  useEffect(()=>{
    if(jenis === null){
      getJenis()
    }else{return}
    getDetail();
  },[])

  const DetailBantuan = () => {
    let formData = new FormData();

    code !== null
      ? formData.append("code", code)
      : null;
    title !== null 
      ? formData.append("title", title)
      : null;
    jenis !== null 
      ? formData.append("id_jenis", selectedJenis)
      : null;
    status !== null 
      ? formData.append("status", status)
      : null;
    kategori !== null 
      ? formData.append("kategori", kategori)
      : null;
    note !== null 
      ? formData.append("catatan", note)
      : null;
    img !== null ? formData.append("img", img) : null;
    start !== null 
      ? formData.append("start", start)
      : null;
    finish !== null 
      ? formData.append("finish", finish)
      : null;
    latitude !== null
    ? formData.append('latitude', latitude) : null;

    longitude !== null ? formData.append("longitude", longitude) : null;
    
    axios({
      method: "POST",
      url: `${BASE_URL}/bantuan/create`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        console.log("DETAIL BANTUAN >>>>>>", res.data);
        if(res.data.success === true){
          setFullfiled({detail : true})
        }
      })
      .catch((err) => {
        console.log(err.response.config.data);
      })
     };


       const SendPenerima= () =>{
         let formData = new FormData();

code !== null ? formData.append("code", code) : null;
         nik !== null
           ? formData.append("nik", nik)
           : null;
         name !== null
           ? formData.append("name", name)
           : null;
         phone !== null
           ? formData.append("phone", phone)
           : null;
         address !== null
           ? formData.append("address", address)
           : null;
         profession !== null
           ? formData.append("profession", profession)
           : null;
         famMember !== null
           ? formData.append("familyMember", famMember)
           : null;
         otherMember !== null
           ? formData.append("otherMember", otherMember)
           : null;
         selfie !== null ? formData.append("selfieWithId", selfie) : null;
         ktp !== null ? formData.append("ktp", ktp) : null;
        //  id !== null
        //    ? formData.append("relawan", id)
        //    : null;
         axios({
           method: "POST",
           url: `${BASE_URL}/bantuan/penerima`,
           headers: {
             "Access-Control-Allow-Origin": "*",
             "Content-Type": "multipart/form-data",
           },
           data: formData,
         })
           .then((res) => {
             console.log("DETAIL BANTUAN >>>>>>", res.data);
             if (res.data.success === true) {
                 setFullfiled({ penerima: true });
             } else {
               Alert.alert("Data tidak berhasil tersimpan");
             }
           })
           .catch((err) => {
             console.log(err.response);
           });
       };

       const SendRelawan = () =>{
        axios.post(`${BASE_URL}/bantuan/relawan`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          data:{
            code : code,
            id : id,
          }
        })
        .then((res)=>{
          console.log(res.data)
           if (res.data.success === true) {
             setFullfiled({ relawan: true });
           }
        })
        .catch((err)=>{
          console.log(err)
        })
       }



  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        const int = parseInt(value)
        console.log(int)
        setId(int)
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
getData()
  },[])
    return (
      <View style={s.body}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrowTail} style={{ width: 30, height: 25 }} />
          </TouchableOpacity>
          <Text style={s.headerText}> Isi Detail Laporan</Text>
        </View>
        <ScrollView>
          <View style={s.whiteContainer}>
            <Text style={s.itemData}>Alamat Tujuan Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={wilayah}
              onChangeText={(text) => {
                setWilayah(text);
              }}
              editable={editable}
            />
          </View>
          <View style={s.whiteContainer}>
            <Text style={s.titleWhiteCon}>Detail Penerima Bantuan</Text>

            <Text style={s.itemData}>Nama Penerima</Text>
            <TextInput
              style={s.inputText}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              editable={editable}
            />
            <Text style={s.itemData}>Alamat Sesuai KTP</Text>

            <TextInput
              style={s.inputText}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
              }}
              editable={editable}
            />
            <Text style={s.itemData}>Pekerjaan</Text>
            <TextInput
              style={s.inputText}
              value={profession}
              onChangeText={(text) => {
                setProfession(text);
              }}
              editable={editable}
            />
            <Text style={s.itemData}>No KTP</Text>
            <TextInput
              style={s.inputText}
              value={nik}
              onChangeText={(text) => {
                setNik(text);
              }}
              keyboardType="numeric"
              editable={editable}
              
            />
            <Text style={s.itemData}>No HP</Text>
            <TextInput
              style={s.inputText}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
              keyboardType="numeric"
              editable={editable}
            />
            <Text style={s.titleWhiteCon}>Foto Selfie KTP</Text>
            <Image
              source={selfie !== null ? { uri: selfie } : UploadFoto}
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 10,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity
              style={s.btnUpload}
              onPress={() => SelfieHandler()}
              disabled={!editable}
            >
              <Text style={s.textBtnUpload}>Tambah Foto</Text>
            </TouchableOpacity>
            <Text style={[s.itemData, { fontSize: 14, textAlign: "center" }]}>
              Besar file maks. 10mb dengan format .JPG, JPEG atau PNG.
            </Text>

            <Text style={s.titleWhiteCon}>Foto KTP </Text>
            <Image
              source={ktp !== null ? { uri: ktp } : FotoKTP}
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 10,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity
              style={s.btnUpload}
              onPress={() => uploadKtp()}
              disabled={!editable}
            >
              <Text style={s.textBtnUpload}>Tambah Foto</Text>
            </TouchableOpacity>
            <Text style={[s.itemData, { fontSize: 14, textAlign: "center" }]}>
              Besar file maks. 10mb dengan format .JPG, JPEG atau PNG.
            </Text>
          </View>
          <View style={s.whiteContainer}>
            <Text style={s.titleWhiteCon}>Detail Bantuan</Text>

            <Picker
              selectedValue={
                selectedJenis
              }
              style={{ height: 50, width: "50%" }}
              mode={"dialog"}
              onValueChange={(itemValue) => {
                setSelectedJenis(itemValue);
              }}
              enabled={editable}
            >
              {jenis
                ? jenis.map((item) => {
                    return (
                      <Picker.Item
                        label={item.nama}
                        value={item.id}
                        key={item.id}
                      />
                    );
                  })
                : null}
            </Picker>

            <Text style={s.itemData}>Kode Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={code}
              onChangeText={(text) => {
                setCode(text);
              }}
              editable={editable}
            />
            <Text style={s.itemData}>Judul Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
              editable={editable}
            />
            <Text style={s.itemData}>Kategori Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={kategori}
              onChangeText={(text) => {
                setKategori(text);
              }}
              editable={editable}
            />
            <Text style={s.titleWhiteCon}>Foto Depan Stiker</Text>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Text style={{ width: "30%", marginLeft: "10%" }}>
                {status === 1 ? "Terkonfirmasi" : "Non Konfirmasi"}
              </Text>
              <Checkbox
                disabled={!editable}
                style={{ marginHorizontal: 10 }}
                onValueChange={() => {
                  if (status === 0) {
                    setStatus(1);
                  } else {
                    setStatus(0);
                  }
                }}
                value={status === 1 ? true : false}
              />
            </View>
            <View style={status === 1 ? null : { display: "none" }}>
              <Image
                source={img !== null ? { uri: img } : UploadFoto}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 10,
                }}
              />

              <TouchableOpacity
                style={s.btnUpload}
                onPress={() => upPicWitSticker()}
                disabled={!editable}
              >
                <Text style={s.textBtnUpload}>Tambah Foto</Text>
              </TouchableOpacity>
              <Text style={[s.itemData, { fontSize: 14, textAlign: "center" }]}>
                Besar file maks. 10mb dengan format .JPG, JPEG atau PNG.
              </Text>
            </View>

            <View style={s.memberContainer}>
              <Text style={{ width: "55%" }}>Jumlah Anggota Keluarga : </Text>
              <TextInput
                value={famMember}
                placeholder="Jumlah Anggota Keluarga"
                onChangeText={(text) => {
                  setFamMember(text);
                }}
                editable={editable}
                keyboardType="numeric"
                style={{ fontWeight: "bold" }}
                
              />
            </View>
            <View style={s.memberContainer}>
              <Text style={{ width: "55%" }}>Jumlah Penghuni Baru : </Text>
              <TextInput
                value={otherMember}
                placeholder="Jumlah Penghuni Baru"
                onChangeText={(text) => {
                  setOtherMember(text);
                }}
                editable={editable}
                keyboardType="numeric"
                style={{ fontWeight: "bold" }}
                
              />
            </View>

            <Text style={s.titleWhiteCon}>Catatan</Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              style={s.catatanInput}
              placeholder="Ketuk Untuk Memberikan Catatan"
              value={note}
              editable={editable}
              onChangeText={(text) => {
                setNote(text);
              }}
            />
          </View>

          <TouchableOpacity
            style={s.btnSubmit}
            onPress={() => {
              SendPenerima();
              DetailBantuan();
              SendPenerima()

              if(fullfiled.detail === true &&
                fullfiled.penerima ===true &&
                fullfiled.relawan === true
                )
                {
                  navigation.navigate('Home')
                  Alert.alert('Data Berhsil Tersimpan')
                }
              

            }}
          >
            <Text style={s.textBtnSubmit}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
}
export default NewBantuan

const s = StyleSheet.create({
  body: {
    backgroundColor: colors.lightGrey,
    width: "100%",
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "3%",
    elevation: 8,
    height: 50,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  headerText: {
    fontFamily: fontFam,
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  whiteContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: "94%",
    marginHorizontal: "3%",
    padding: 15,
    marginVertical: 10,
  },
  titleWhiteCon: {
    fontFamily: fontFam,
    fontSize: 18,
    fontWeight: "bold",
    width: "100%",
    marginVertical: 15,
  },
  itemData: {
    fontFamily: fontFam,
    fontSize: 15,
    color: colors.grey,
    width: "100%",
    marginTop: 10,
  },
  inputText: {
    borderBottomColor: colors.midGrey,
    borderBottomWidth: 1,
    width: "96%",
    marginHorizontal: "2%",
    marginBottom: 10,
  },
  btnUpload: {
    backgroundColor: colors.second,
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    width: "40%",
  },
  textBtnUpload: {
    color: colors.main,
    fontFamily: fontFam,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  catatanInput: {
    padding: 10,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
  },
  btnSubmit: {
    backgroundColor: colors.main,
    width: "96%",
    marginHorizontal: "2%",
    marginVertical: 20,
    borderRadius: 15,
    padding: 10,
    height: 50,
  },
  textBtnSubmit: {
    textAlign: "center",
    fontFamily: fontFam,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  btnPlusMin: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  memberContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderColor: colors.midGrey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
});