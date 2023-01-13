import React, { useState, useEffect } from "react";
import {
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
} from 'react-native'
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

const NewBantuan = ({navigation})=>{
  const [penerima,setPenerima]= useState({
    nik:'',
    name:'',
    address:'',
    phone:'',
    profession:'',
    famMember:0,
    otherMember:0,
    imgFaceWId:'',
    imgID:'',
  })

  const [bantuan, setBantuan] = useState({
    code: "",
    title: "",
    id_jenis: "",
    status: "",
    kategori: "",
    catatan: "",
    img: "",
    start_date:'',
    finish_date:'',
  });

  // const [famMember, setFamMember] = useState(0)
  const kode = 'BANTUAN001'
  const [check, setCheck] = useState(true)

  const [jenis,setJenis]= useState(null)
  const [selectedJenis, setSelectedJenis] = useState()

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

  const AddPenerima = () =>{
      axios({
        method: "POST",
        url: `${BASE_URL}/bantuan/penerima`,
        data: {
          code: bantuan.code,
          nik: penerima.nik,
          name: penerima.name,
          addressInId: penerima.address,
          address: penerima.address,
          phone: penerima.phone,
          profession: penerima.profession,
          familyMember: penerima.famMember,
          otherMember: penerima.otherMember,
          selfieWithId: null,
          ktp:null,
        },
      })
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{console.log(err)})
  } 
   
  const DetailBantuan = ()=>{
axios({
  method: "POST",
  url: `${BASE_URL}/bantuan/penerima`,
  data: bantuan,
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
  }

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
            <TextInput
              style={s.inputText}
              value={penerima.name}
              onChangeText={(text) => {
                setPenerima({ ...penerima, name: text });
              }}
            />
            <Text style={s.itemData}>Alamat Sesuai KTP</Text>

            <TextInput
              style={s.inputText}
              value={penerima.address}
              onChangeText={(text) => {
                setPenerima({ ...penerima, address: text });
              }}
            />
            <Text style={s.itemData}>Pekerjaan</Text>
            <TextInput
              style={s.inputText}
              value={penerima.profession}
              onChangeText={(text) => {
                setPenerima({ ...penerima, profession: text });
              }}
            />
            <Text style={s.itemData}>No KTP</Text>
            <TextInput
              style={s.inputText}
              value={penerima.nik}
              onChangeText={(text) => {
                setPenerima({ ...penerima, nik: text });
              }}
            />
            <Text style={s.itemData}>No HP</Text>
            <TextInput
              style={s.inputText}
              value={penerima.phone}
              onChange={(text) => {
                setPenerima({ ...penerima, phone: text });
              }}
              keyboardType="numeric"
            />
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

            <Picker
              selectedValue={selectedJenis}
              style={{ height: 50, width: "50%" }}
              mode={"dialog"}
              onValueChange={(itemValue) => {
                setBantuan({...bantuan, id_jenis:itemValue});
              }}
            >
              {jenis
                ? jenis.map((item) => {
                    return <Picker.Item label={item.nama} value={item.id} />;
                  })
                : null}
            </Picker>

            <Text style={s.itemData}>Kode Bantuan</Text>
            <TextInput style={s.inputText} value={bantuan.code} 
            onChangeText={(text)=>{setBantuan({...bantuan, code :text})}}
            />
            <Text style={s.itemData}>Kategori Bantuan</Text>
            <TextInput style={s.inputText} 
            value={bantuan.kategori}
                  onChangeText={(text)=>{setBantuan({...bantuan, kategori :text})}}
            />
            <Text style={s.titleWhiteCon}>Foto Depan Stiker</Text>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Text style={{ width: "30%", marginLeft: "10%" }}>
                {check === true ? "Terkonfirmasi" : "Non Konfirmasi"}
              </Text>
              <Checkbox
                style={{ marginHorizontal: 10 }}
                onValueChange={(value) => {
                  // setCheck(!check);
                  setBantuan({...bantuan, status : value})
                }}
                value={bantuan.status}
              />
            </View>
            <View style={check === true ? null : { display: "none" }}>
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

            <View
              style={s.memberContainer}
            >
              <Text style={{ width: "55%" }}>Jumlah Anggota Keluarga : </Text>
              {/* <TouchableOpacity
                onPress={() => setFamMember(famMember-1 )}
              >
                <Image
                  source={penerima.famMember < 1 ? BtnMinGrey : BtnMinRed}
                  style={s.btnPlusMin}
                />
              </TouchableOpacity> */}
              <TextInput
                value={penerima.famMember}
                placeholder="Jumlah Anggota Keluarga"
                onChangeText={(text) => {
                  setPenerima({ ...penerima, famMember: text });
                }}
                keyboardType="numeric"
                style={{ fontWeight: "bold" }}
              />
              {/* <TouchableOpacity
                onPress={() => setFamMember(famMember+1 )}
              >
                <Image source={BtnPlusRed} style={s.btnPlusMin} />
              </TouchableOpacity> */}
            </View>
            <View
              style={s.memberContainer}
            >
              <Text style={{ width: "55%" }}>Jumlah Penghuni Baru : </Text>
              {/* <TouchableOpacity
                onPress={() => setFamMember(famMember-1 )}
              >
                <Image
                  source={penerima.famMember < 1 ? BtnMinGrey : BtnMinRed}
                  style={s.btnPlusMin}
                />
              </TouchableOpacity> */}
              <TextInput
                value={penerima.otherMember}
                placeholder="Jumlah Penghuni Baru"
                onChangeText={(text) => {
                  setPenerima({ ...penerima, otherMember: text });
                }}
                keyboardType="numeric"
                style={{ fontWeight: "bold" }}
              />
              {/* <TouchableOpacity
                onPress={() => setFamMember(famMember+1 )}
              >
                <Image source={BtnPlusRed} style={s.btnPlusMin} />
              </TouchableOpacity> */}
            </View>

            <Text style={s.titleWhiteCon}>Catatan</Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              style={s.catatanInput}
              placeholder="Ketuk Untuk Memberikan Catatan"
              value={bantuan.catatan}
              onChangeText={(text)=>{setBantuan({...bantuan, catatan : text})}}
            />
          </View>

          <TouchableOpacity
            style={s.btnSubmit}
            onPress={() => {DetailBantuan(); AddPenerima()}}
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