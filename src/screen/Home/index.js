import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Image, Alert,StatusBar,BackHandler, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {
  DefaultProfile,
  DefaultProfileSquare,
  IconNotif,
  IconBantuan,
  RightRedArrowTail,
  IconBantuan2,
  IconSearch,
  RedProfile,
} from "../../Assets/img";
import {CardBantuan} from '../../component'
import {colors, fontFam} from '../../Assets/colors';
import axios from "axios";
import { BASE_URL } from "../../service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Home =({navigation, route})=>{
    const isFocused = useIsFocused();
const [code,setCode]= useState()
const [riwayat,setRiwayat] = useState(null)

const [posdaCount,setPosdaCount] = useState(20)
const [relawanCount, setRelawanCount] = useState(200)

const [id,setId] = useState()
const [role, setRole] = useState()
const [username, setUsername] = useState()
const [ava,setAva] = useState()

const getId = async () => {
  try {
    const result = await AsyncStorage.getItem("id");
    if (result !== null) {
      console.log(result)
      setId(result)
      getData(parseInt(result))
      getRiwayat()
    }
  } catch (e) {
    console.log(e);
  }
};

const data = {
  kode : '#DSDBFJDSBFS3746',
  judul: 'Bansos Untuk Gempa Cianjur',
  startDate: '22-12-2022',
  endDate: '01-01-23',
  status : 'Onprogress',
  penerima : 'Warga Miskin'
}

const getRelawanbyPosda = (id) =>{
  axios.get(`${BASE_URL}/relawan/posda/${id}`)
  .then((res)=>{
    console.log(res.data.result.data.length);
    setRelawanCount(res.data.result.data.length)
  })
  .catch((err)=>{console.log(err)})
}
const getRelawanbyKabinda = (id) => {
  axios
    .get(`${BASE_URL}/relawan/kabinda/${id}`)
    .then((res) => {
      console.log(res.data.result.data.length);
      setRelawanCount(res.data.result.data.length);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getPosdabyKabinda = (id) => {
  axios
    .get(`${BASE_URL}/posda/kabinda/${id}`)
    .then((res) => {
      console.log('POSDA COUNT',res.data.result.data.length);
      setPosdaCount(res.data.result.data.length);
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  if (isFocused) {
    const backAction = () => {
      Alert.alert("Keluar", "Apa kamu yakin ingin ingin keluar ?", [
        { text: "Ya", onPress: () => BackHandler.exitApp() },
        {
          text: "Tidak",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }
}, [navigation, isFocused]);

const getRiwayat = ()=>{
  axios.get(`${BASE_URL}/bantuan`)
  .then((res)=>{
    console.log(res.data.result.data);
    setRiwayat(res.data.result.data);
  })
  .catch((err)=>{
    console.log(err.response.data)
  })
}

const sendApi= (name)=>{
  if(role === 'kabinda' && name === 'relawan'){
    return `${BASE_URL}/relawan/kabinda/${id}`;
  }else if(role==='kabinda' && name === 'posda'){
    return `${BASE_URL}/posda/kabinda/${id}`;
  }else{
     return `${BASE_URL}relawan/posda/${id}`;
  }
}

useEffect(() => {
  if (isFocused) {
    getId()
    getRiwayat()
  }
}, [navigation, isFocused]);

const getData = ( id) => {
  axios
    .get(`${BASE_URL}/user/${id}`)
    .then((res) => {
      console.log(res.data.result.data[0]);
      setUsername(res.data.result.data[0].username);
      setRole(res.data.result.data[0].role);
      setAva(res.data.result.data[0].avatar);

      if (res.data.result.data[0].role === "posda") {
        getRelawanbyPosda(res.data.result.data[0].id);
      } else if (res.data.result.data[0].role === "kabinda") {
        getRelawanbyKabinda(res.data.result.data[0].id);
        getPosdabyKabinda(res.data.result.data[0].id);
      } else {
        null;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const CardKabinda = (props)=>{
  return (
    <TouchableOpacity
    onPress={props.onPress}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.midGrey,
        padding: 5,
        marginVertical: 5,
      }}
    >
      <Image source={RedProfile} style={{ width: 50, height: 50 }} />
      <Text
        style={{
          width: "70%",
          paddingLeft: "4%",
          textAlignVertical: "center",
          fontFamily: fontFam,
          fontSize: 18,
        }}
      >
        {props.name}
      </Text>
      <Text
        style={{
          width: "10%",
          textAlignVertical: "center",
          fontFamily: fontFam,
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        {props.count}
      </Text>
    </TouchableOpacity>
  );
}


    const Header = (props)=>{
        return (
          <View
            style={{
              backgroundColor: colors.main,
              display: "flex",
              flexDirection: "row",
              width: "100%",
              padding: 10,
            }}
          >
            <TouchableOpacity onPress={props.onProfile}>
              <Image
                source={props.img}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 10,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
            <View style={{ width: "75%", paddingHorizontal: "2%" }}>
              <Text
                style={{
                  fontFamily: fontFam,
                  fontSize: 19,
                  fontWeight: "bold",
                  color: colors.white,
                  textTransform: "capitalize",
                }}
              >
                {props.name}
              </Text>
              <Text
                style={{
                  fontFamily: fontFam,
                  fontSize: 15,
                  color: colors.white,
                  textTransform: "capitalize",
                }}
              >
                {props.role}
              </Text>
            </View>
            <TouchableOpacity onPress={props.onNotif}>
              <Image
                source={IconNotif}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </TouchableOpacity>
          </View>
        );
    }

    const LacakContainer = ({navigation,route})=>{
        const s = StyleSheet.create({
          body: {
            width: "90%",
            height: "auto",
            borderRadius: 20,
            padding: 15,
            marginHorizontal: "5%",
            backgroundColor: colors.second,
          },
          title: {
            fontFamily: fontFam,
            fontSize: 19,
            marginBottom: 5,
            fontWeight: "bold",
            color: colors.black,
          },
          title2: {
            fontFamily: fontFam,
            fontSize: 13,
            marginBottom: 10,
            color: colors.black,
          },
          input:{
            width :'100%',
            backgroundColor:colors.white,
            marginVertical:'5%',
            borderRadius:30,
            padding :8,
            display:'flex',
            flexDirection:'row',
          },
          btn: {
            width: "100%",
            height: 50,
            backgroundColor: colors.main,
            borderRadius: 20,
            padding: 5,
            justifyContent: "center",
          },
          textBtn: {
            fontFamily: fontFam,
            fontSize: 14,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
          },
        });
        const [data,setData] = useState(null)
        const [code, setCode] = useState();
        const searchByCode = () => {
          axios
            .get(`${BASE_URL}/new/${code}`)
            .then((res) => {
              console.log(res.data.result.data)
              setData(res.data.result.data[0]);
            })

            .catch((err) => console.log(err));
        };

        return (
          <View style={s.body}>
            <Text style={s.title}>Lacak bantuan</Text>
            <Text style={s.title2}>
              silahkan cari bantuan melalui judul atau kode bantuan
            </Text>
            <View style={s.input}>
                <TextInput
                  placeholder="Cari Bantuan"
                  style={{ width: "85%" }}
                  value={code}
                  onChangeText={(text) => setCode(text)}
                />
              <TouchableOpacity
                style={{
                  width: "15%",
                  backgroundColor: colors.main,
                  borderRadius: 30,
                }}
              >
                <Image
                  source={IconSearch}
                  style={{ width: 40, height: 40, alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={s.btn}
              onPress={() => {
                searchByCode()
              }}
            >
              <Text style={s.textBtn}>Cari Nomor Bantuan</Text>
            </TouchableOpacity>
            {data?.map((item)=>{
              return(
<CardBantuan
                onPress={()=>{
                  navigation.navigate('NewBantuan', {selectedCode: item.code})
                }}
                  title={data.title}
                  startDate={data.start}
                  endDate={data.finish}
                  penerima={data.penerima}
                  status={
                    data.status === 1
                      ? "Terverifikasi"
                      : "Belum Terverifikasi"
                  }
                  bgStatus={data.status === 1 ? "green" : "mustard"}
                  kode={data.code}
                />
              )
            })}
          </View>
        );
    }



return (
  <SafeAreaView style={{ backgroundColor: colors.main }}>
    <StatusBar backgroundColor={colors.main} />
    <Header
      onProfile={() => {
        navigation.navigate("Profile");
      }}
      img={ava !== 'null' || ava !== null ? { uri: ava } : DefaultProfile}
      name={username}
      role={role}
    />
    <ScrollView style={{ height: "100%" }}>
      <View style={s.body}>
        <LacakContainer />
        <View style={s.historyContainer}>
          <View style={role === "relawan" ? s.newBantuan : { display: "none" }}>
            <Image
              source={IconBantuan2}
              style={{
                width: "35%",
                height: "35%",
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
            <Text style={s.titleNewBantuan}>Antar</Text>
            <Text style={s.descNewBantuan}>Buat laporan bantuanmu</Text>
            <TouchableOpacity
              style={s.btn}
              onPress={() => navigation.navigate("Location")}
            >
              <Text style={s.textBtn}>Mulai Antar Bantuan</Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              role === "kabinda" || role === 'posda'? s.kabindaContainer : { display: "none" }
            }
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={s.historyTitle}>Pelaksana</Text>
              <Text style={s.seeMore}>Lihat Semua</Text>
            </View>
            <View style={role === 'posda' ? {display :'none'} : null}>
            <CardKabinda
              onPress={() => {
                navigation.navigate("List", { name: "Posda" , uri: sendApi('posda')});
              }}
              name={"Posda"}
              count={posdaCount}
            />
            </View>
            <CardKabinda
              onPress={() => {
                navigation.navigate("List", {
                  name: "Relawan",
                  uri: sendApi("relawan"),
                });
              }}
              name={"Relawan"}
              count={relawanCount}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: "5%",
              height:'auto',
              position:'relative',
            }}
          >
            <View style={{ width: "75%" }}>
              <Text style={s.historyTitle}>Riwayat Bantuan</Text>
              <Text
                style={[s.historyTitle, { fontSize: 12, fontWeight: "normal" }]}
              >
                Aktivitas Laporan Bantuan
              </Text>
            </View>
            <TouchableOpacity style={{ width: "25%" }}>
              <Text style={s.seeMore}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10 }}>
            {riwayat?.map((item) => {
              return (
                <CardBantuan
                onPress={()=>{
                  navigation.navigate('NewBantuan', {selectedCode: item.code})
                }}
                  title={item.title}
                  startDate={item.start}
                  endDate={item.finish}
                  penerima={item.penerima}
                  status={
                    item.status === 1
                      ? "Terverifikasi"
                      : "Belum Terverifikasi"
                  }
                  bgStatus={item.status === 1 ? "green" : "mustard"}
                  kode={item.code}
                />
              );
            })}
            <View style={{height:100}}></View>
          </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
export default Home

const s = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
    marginTop: "5%",
  },
  historyContainer: {
    backgroundColor: colors.white,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingHorizontal: 10,
    marginTop: "5%",
    paddingTop: 30,
    height:'100%',
  },
  historyTitle: {
    fontFamily: fontFam,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  seeMore: {
    fontFamily: fontFam,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.main,
  },
  newBantuan: {
    backgroundColor: colors.lightGrey,
    width: "96%",
    height:300,
    marginHorizontal: "2%",
    borderRadius: 15,
    padding: 15,
    marginBottom:20,
  },
  titleNewBantuan: {
    fontFamily: fontFam,
    fontSize: 45,
    // fontWeight:'bold',
    textAlign: "center",
    color: colors.black,
    width: "100%",
  },
  descNewBantuan: {
    fontFamily: fontFam,
    fontSize: 20,
    // fontWeight:'bold',
    textAlign: "center",
    color: colors.black,
    width: "100%",
  },
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: colors.main,
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    marginTop:20,
  },
  textBtn: {
    fontFamily: fontFam,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
});