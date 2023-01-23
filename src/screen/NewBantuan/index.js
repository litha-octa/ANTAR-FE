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
const {selectedCode} = route.params
const [currentData,setCurrentData] = useState()
const [editable,setEditable] = useState(true)

const getDetail = () =>{
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
  const [status,setStatus] = useState(currentData? parseInt(currentData.status) : 0)
  const [kategori,setKategori] = useState(null)
  const [note,setNote] = useState(null)
  const [img,setImg] = useState(null)
  const [start,setStart] = useState(null)
  const [finish, setFinish] = useState(null)
  const [wilayah, setWilayah] = useState(null)

  const [jenis,setJenis]= useState(null)

  const uploadKtp = async()=>{
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result);
      setKtp(result.assets[0].uri);
      // const source={uri: 'data:image/jpeg;base64,' + result.base64}
      // setSelfie(source);
    }
  }

 const upPicWitSticker = async()=>{ 
   // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result)
      setImg(result.assets[0].uri);
      // const source={uri: 'data:image/jpeg;base64,' + result.base64}
      // setSelfie(source);
    }
  }
  const SelfieHandler = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result)
      setSelfie(result.assets[0].uri);
      // const source={uri: 'data:image/jpeg;base64,' + result.base64}
      // setSelfie(source);
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
  },[])

  useEffect(() => {
    if (selectedCode !== null) {
      getDetail()
    } else {
      return;
    }
  }, []); 

  const DetailBantuan = () => {
    let formData = new FormData();
    code !== null || code !== currentData.code? formData.append("code", code) : null;
    title !== null || title !== currentData.title? formData.append("title", title): null;
    wilayah !== null || wilayah !== currentData.wilayah ? formData.append("wilayah", wilayah): null;
    jenis !== null || jenis !== currentData.jenis ? formData.append("jenis", selectedJenis) : null;
    status !== null || status !== currentData.status ? formData.append("status", status) : null;
    kategori !== null || kategori !== currentData.kategori ? formData.append("kategori", kategori) : null;
    note !== null || note !== currentData.catatan ? formData.append("catatan", note) : null;
    img !== null || img !== currentData.img ? formData.append("img", img) : null;
    start !== null || start !== currentData.start ? formData.append("start", start) : null;
    finish !== null || finish !== currentData.finish ? formData.append("finish", finish) : null;
    nik !== null || nik !== currentData.nik ? formData.append("nik", nik) : null;
    name !== null || name !== currentData.penerima ? formData.append("penerima", name) : null;
    phone !== null || phone !== currentData.phone ? formData.append("phone", phone) : null;
    address !== null || address !== currentData.address ? formData.append("address", address) : null;
    profession !== null || profession !== currentData.profession ? formData.append("profession", profession) : null;
    famMember !== null || famMember !== currentData.familyMember ? formData.append("familyMember", famMember) : null;
    otherMember !== null || otherMember !== currentData.otherMember ? formData.append("otherMember", otherMember) : null;
    selfie !== null || selfie !== currentData.selfie ? formData.append("selfie", selfie) : null;
    ktp !== null || ktp !== currentData.ktp ? formData.append("ktp", ktp) : null;
    id !== null || id !== currentData.relawan
      ? formData.append("relawan", id)
      : null;

    if(selectedCode===null){
axios({
  method: "POST",
  url: `${BASE_URL}/new`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  },
  data: formData,
})
  .then((res) => {
    console.log("DETAIL BANTUAN >>>>>>", res.data);
    if (res.data.success === true) {
      navigation.navigate("Home");
      Alert.alert("Data berhasil tersimpan");

    } else {
      Alert.alert("Data tidak berhasil tersimpan");
    }
  })
  .catch((err) => {
    console.log(err.response);
  });
    }else{
axios({
  method: "PATCH",
  url: `${BASE_URL}/new/${selectedCode}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  },
  data: formData,
})
  .then((res) => {
    console.log("DETAIL BANTUAN >>>>>>", res.data);
    if (res.data.success === true) {
      navigation.navigate("Home");
      Alert.alert("Data berhasil diperbaharui");

    } else {
      Alert.alert("Data tidak berhasil tersimpan");
    }
  })
  .catch((err) => {
    console.log(err.response);
  });
    }
    
  };



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
        <ScrollView>
          <View style={s.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={LeftArrowTail} style={{ width: 30, height: 25 }} />
            </TouchableOpacity>
            <Text style={s.headerText}> Isi Detail Laporan</Text>
          </View>
          <View style={s.whiteContainer}>
            <Text style={s.itemData}>Alamat Tujuan Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={wilayah}
              onChangeText={(text) => {
                setWilayah(text);
              }}
              editable={editable}
              defaultValue={currentData? currentData.wilayah : null}
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
              defaultValue={currentData ? currentData.penerima : null}
            />
            <Text style={s.itemData}>Alamat Sesuai KTP</Text>

            <TextInput
              style={s.inputText}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
              }}
              defaultValue={currentData ? currentData.address : null}
              editable={editable}
            />
            <Text style={s.itemData}>Pekerjaan</Text>
            <TextInput
              style={s.inputText}
              value={profession}
              onChangeText={(text) => {
                setProfession(text);
              }}
              defaultValue={currentData ? currentData.profession : null}
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
              defaultValue={currentData ? currentData?.nik.toString() : null}
            />
            <Text style={s.itemData}>No HP</Text>
            <TextInput
              style={s.inputText}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
              keyboardType="numeric"
              defaultValue={currentData ? currentData.phone : null}
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
              disabled={editable}
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
              disabled={editable}
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
              selectedValue={currentData ? currentData.jenis : selectedJenis}
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
              defaultValue={currentData ? currentData.code : null}
              editable={editable}
            />
            <Text style={s.itemData}>Judul Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
              defaultValue={currentData ? currentData.title : null}
              editable={editable}
            />
            <Text style={s.itemData}>Kategori Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={kategori}
              onChangeText={(text) => {
                setKategori(text);
              }}
              defaultValue={currentData ? currentData.kategori : null}
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
                disabled={editable}
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
                disabled={editable}
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
                defaultValue={
                  currentData ? currentData.familyMember.toString() : null
                }
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
                defaultValue={
                  currentData ? currentData.otherMember.toString() : null
                }
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
              defaultValue={currentData ? currentData.catatan : null}
            />
          </View>

          <TouchableOpacity
            style={s.btnSubmit}
            onPress={() => {
              DetailBantuan();
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
    elevation: 12,
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