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
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewBantuan = ({navigation})=>{
  const [penerima,setPenerima]= useState({
    nik:'',
    name:'',
    address:'',
    phone:'',
    profession:'',
    famMember:'',
    otherMember:'',
    imgFaceWId:'',
    imgID:'',
  })

  const [id,setId] = useState(null)
  const [code, setCode] = useState(null);
  const [nik, setNik] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [profession, setProfession] = useState(null);
  const [famMember, setFamMember] = useState(null);
  const [otherMember, setOtherMember] = useState(null);
  

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

  const [title, setTitle] = useState(null)
  const [selectedJenis, setSelectedJenis] = useState(1);
  const [status,setStatus] = useState(false)
  const [kategori,setKategori] = useState(null)
  const [note,setNote] = useState(null)
  const [img,setImg] = useState(null)
  const [start,setStart] = useState(null)
  const [finish, setFinish] = useState(null)


  const [jenis,setJenis]= useState(null)

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

  const handlerPenerima = () =>{
    let formData = new FormData();
    formData.append("code",code)
    formData.append("nik", nik)
    formData.append("name", name)
    formData.append("phone", phone)
    formData.append("addressInId", address)
    formData.append("address", address)
    formData.append("profession", profession)
    formData.append("familyMember", famMember)
    formData.append("otherMember", otherMember)
    // formData.append('selfieWithId', 'test');
    // formData.append('ktp', 'tess')
         
    // var config = {
    //    method: 'POST',
    //    body: formData,
    //    redirect: 'follow',
    //  };    
        // axios({
        //   method: "POST",
        //   url: `${BASE_URL}/bantuan/penerima`,
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Content-Type": "multipart/form-data",
        //     "Accept": "*/*",
        //   },
        //   withCredentials:false,
        //   data: formData,
        // })

        axios.post(`${BASE_URL}/bantuan/penerima`,formData)
          .then((res) => {
            console.log("PENERIMA BANTUAN >>>>>>>", res);
            console.log(BASE_URL);
          })
          .catch((error) => {
            console.log(error);
            console.error(error.response.data);
          });
  } 
const relawanHandler = (x) =>{
  axios({
    method: "POST",
    url: `${BASE_URL}/bantuan/relawan`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8",
      'Accept': '*/*'
    },
    data: {
      code: code,
      id: x,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.response.data);
    });
      }



   
  const DetailBantuan = ()=>{
    let formData = new FormData();
    formData.append("code", code);
    formData.append("title", title);
    formData.append("id_jenis", selectedJenis);
    formData.append("status", status);
    formData.append("kategori", kategori);
    formData.append("catatan", note);
    formData.append("img", img);
    formData.append("start_date", start);
    formData.append("finish_date", finish);
    // var config = {
    //    method: 'POST',
    //    body: formData,
    //    redirect: 'follow',
    //  }; 
// axios({
//   method: "POST",
//   url: `${BASE_URL}/bantuan/create`,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "multipart/form-data",
//     Accept: "*/*",
//   },
//   data: formData,
// })

axios.post(`${BASE_URL}/bantuan/create`,formData)
  .then((res) => {
    console.log("DETAIL BANTUAN >>>>>>", res);
  })
  .catch((err) => {
    console.log(err.response.config.adapter.data)
  });
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        const int = parseInt(value)
        setId(int)
        DetailBantuan()
        // handlerPenerima()
        relawanHandler(int)
      }
    } catch (e) {
      console.log(e);
    }
  };
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
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <Text style={s.itemData}>Alamat Sesuai KTP</Text>

            <TextInput
              style={s.inputText}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
              }}
            />
            <Text style={s.itemData}>Pekerjaan</Text>
            <TextInput
              style={s.inputText}
              value={profession}
              onChangeText={(text) => {
                setProfession(text);
              }}
            />
            <Text style={s.itemData}>No KTP</Text>
            <TextInput
              style={s.inputText}
              value={nik}
              onChangeText={(text) => {
                setNik(text);
              }}
              keyboardType="numeric"
            />
            <Text style={s.itemData}>No HP</Text>
            <TextInput
              style={s.inputText}
              value={phone}
              onChange={(text) => {
                setPhone(text);
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
                setSelectedJenis(itemValue);
              }}
            >
              {jenis
                ? jenis.map((item) => {
                    return <Picker.Item label={item.nama} value={item.id} key={item.id}/>;
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
            />
            <Text style={s.itemData}>Judul Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
            <Text style={s.itemData}>Kategori Bantuan</Text>
            <TextInput
              style={s.inputText}
              value={kategori}
              onChangeText={(text) => {
                setKategori(text);
              }}
            />
            <Text style={s.titleWhiteCon}>Foto Depan Stiker</Text>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Text style={{ width: "30%", marginLeft: "10%" }}>
                {status === true ? "Terkonfirmasi" : "Non Konfirmasi"}
              </Text>
              <Checkbox
                style={{ marginHorizontal: 10 }}
                onValueChange={() => {
                  setStatus(!status);
                }}
                value={status}
              />
              {/* <TextInput 
              placeholder="status"
              onChangeText={(text)=>setStatus(text)} value={status}/> */}
            </View>
            <View style={status === true ? null : { display: "none" }}>
              <Image
                source={img!== null ? {uri:img}  : UploadFoto}
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

            <View style={s.memberContainer}>
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
                value={famMember}
                placeholder="Jumlah Anggota Keluarga"
                onChangeText={(text) => {
                  setFamMember(text);
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
            <View style={s.memberContainer}>
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
                value={otherMember}
                placeholder="Jumlah Penghuni Baru"
                onChangeText={(text) => {
                  setOtherMember(text);
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
              value={note}
              onChangeText={(text) => {
                setNote(text);
              }}
            />
          </View>

          <TouchableOpacity
            style={s.btnSubmit}
            onPress={() => {
              getData();
              // handlerPenerima();
              // DetailBantuan()
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