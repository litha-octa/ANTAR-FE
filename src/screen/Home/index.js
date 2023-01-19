import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Image, StatusBar, SafeAreaView, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {
  DefaultProfile,
  DefaultProfileSquare,
  IconNotif,
  IconBantuan,
  RightRedArrowTail,
  IconBantuan2,
} from "../../Assets/img";
import {colors, fontFam} from '../../Assets/colors';
import axios from "axios";
import { BASE_URL } from "../../service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Home =({navigation, route})=>{
    const isFocused = useIsFocused();
const [code,setCode]= useState()
const [riwayat,setRiwayat] = useState(null)

const [id,setId] = useState()
const [role, setRole] = useState()
const [username, setUsername] = useState()

const getData = async () => {
  try {
    const result = await AsyncStorage.getItem("id");
    const result2 = await AsyncStorage.getItem("username");
    const result3 = await AsyncStorage.getItem("role");
    if (result !== null) {
      console.log(result);
      console.log(result2);
      console.log(result3);
      setId(result);
      setUsername(result2)
      setRole(result3)
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


useEffect(() => {
  if (isFocused) {
    getData();
    getRiwayat();
  }
}, [navigation, isFocused]);

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
                source={DefaultProfile}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 10,
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

    const LacakContainer = (props)=>{
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
        const [data,setdata] = useState()
        const [code, setCode] = useState();
        const searchByCode = () => {
          axios
            .get(`${BASE_URL}/bantuan/${code}`)
            .then((res) => {
              console.log(res.data.result.data)
              setdata(res.data.result.data[0]);
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
                  source={IconNotif}
                  style={{ width: 40, height: 40, alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={s.btn}
              onPress={() => {
                searchByCode();
              }}
            >
              <Text style={s.textBtn}>Cari Nomor Bantuan</Text>
            </TouchableOpacity>
          </View>
        );
    }

const CardBantuan =(props)=>{
  const s = StyleSheet.create({
    row: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      marginVertical: 10,
    },
    body: {
      width: "98%",
      height:'auto',
      marginHorizontal: "1%",
      borderWidth: 1,
      borderColor: colors.midGrey,
      borderRadius: 15,
      marginVertical: 10,
      padding: 15,
    },
    title: {
      fontFamily: fontFam,
      fontSize: 17,
      fontWeight: "bold",
      color: colors.black,
      textTransform:'capitalize',
    },
    title2: {
      fontFamily: fontFam,
      fontSize: 13,
      color: colors.grey,
    },
    statusCard: {
      width: "25%",
      padding: "2%",
      borderRadius: 15,
      height: 30,
      backgroundColor: props.bgStatus,
    },
    textStatusCard: {
      fontFamily: fontFam,
      fontSize: 12,
      color: colors.white,
    },
    detailText: {
      fontFamily: fontFam,
      fontSize: 13,
      fontWeight: "bold",
      color: colors.main,
    },
  });
return (
  <View style={s.body}>
    <View style={s.row}>
      <Image source={IconBantuan} style={{ width: 40, height: 40 }} />
      <View style={{ width: "65%", paddingHorizontal: "3%" }}>
        <Text style={s.title}>{props.title}</Text>
        <Text style={s.title2}>{props.startDate}</Text>
      </View>
      <View style={s.statusCard}>
        <Text style={s.textStatusCard}>{props.status}</Text>
      </View>
    </View>
    <View style={s.row}>
      <View style={{ width: "50%" }}>
        <Text style={s.title}>{props.endDate}</Text>
        <Text style={s.title2}>Estimasi Sampai</Text>
      </View>
      <View style={{ width: "50%" }}>
        <Text style={s.title}>{props.kode}</Text>
        <Text style={s.title2}>Kode Bantuan</Text>
      </View>
    </View>
    <View style={s.row}>
      <Image source={DefaultProfileSquare} style={{ width: 50, height: 50 }} />
      <View style={{ width: "50%", marginLeft:'5%' }}>
        <Text style={s.title}>{props.penerima}</Text>
        <Text style={s.title2}>Penerima bantuan</Text>
      </View>
      <TouchableOpacity
      style={{
        display:'flex',
        flexDirection:'row',
        width:'35%',
        justifyContent:'center',
        paddingTop:10,
      }}>
        <Text style={s.detailText}>Lihat Detail</Text>
        <Image source={RightRedArrowTail}
        style={{
        width : 20,
        height:20,
        }}/>
      </TouchableOpacity>
    </View>
  </View>
);}


return (
  <SafeAreaView style={{ backgroundColor: colors.main,}}>
    <StatusBar backgroundColor={colors.main} />
    <Header
      onProfile={() => {
        navigation.navigate("Profile");
      }}
      // onNotif={()=>{}}
      name={username}
      role={role}
    />
    <ScrollView style={{height:'100%'}}>
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
              onPress={() => navigation.navigate("NewBantuan")}
            >
              <Text style={s.textBtn}>Mulai Antar Bantuan</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: "5%",
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
                  title={item.title}
                  startDate={item.start_date}
                  endDate={item.finish_date}
                  penerima={data.penerima}
                  status={
                    item.status === "true"
                      ? "Terverifikasi"
                      : "Belum Terverifikasi"
                  }
                  bgStatus={item.status === "true" ? "green" : "mustard"}
                  kode={item.code}
                />
              );
            })}
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
    height:'auto',
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
    height:'40%',
    marginHorizontal: "2%",
    borderRadius: 15,
    padding: 15,
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