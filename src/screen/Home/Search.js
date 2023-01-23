import React, {useState,useEffect} from "react";
import { Image, View, Text, TouchableOpacity,TextInput, StyleSheet } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../service";
import { colors, fontFam } from "../../Assets/colors";
import { IconNotif, RightRedArrowTail, DefaultProfileSquare, IconBantuan } from "../../Assets/img";

const Search = ({navigation,route})=>{

 //{data !== null ? 
        {/*data?.map((item)=>{
            return (
              <CardBantuan
                title={item.title}
                startDate={item.start_date}
                endDate={item.finish_date}
                penerima={item.penerima}
                status={
                  item.status === 1 ? "Terverifikasi" : "Belum Terverifikasi"
                }
                bgStatus={item.status === 1 ? "green" : "mustard"}
                kode={item.code}
              />
            );
        })
         */}
        // <Text>Bantuan Tidak Ditemukan</Text>:
        // <Text>Bantuan Tidak Ditemukan</Text>}

   const [data,setdata] = useState(null)
        const [code, setCode] = useState();
        const searchByCode = () => {
          axios
            .get(`${BASE_URL}/new/${parseInt(code)}`)
            .then((res) => {
              console.log(res.data.result.data)
              setdata(res.data.result.data[0]);
            })

            .catch((err) => console.log(err));
        };

        const CardBantuan = (props) => {
          const s = StyleSheet.create({
            row: {
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginVertical: 10,
            },
            body: {
              width: "98%",
              height: "auto",
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
              textTransform: "capitalize",
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
            <TouchableOpacity style={s.body} onPress={props.onPress}>
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
                <Image
                  source={DefaultProfileSquare}
                  style={{ width: 50, height: 50 }}
                />
                <View style={{ width: "50%", marginLeft: "5%" }}>
                  <Text style={s.title}>{props.penerima}</Text>
                  <Text style={s.title2}>Penerima bantuan</Text>
                </View>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "35%",
                    justifyContent: "center",
                    paddingTop: 10,
                  }}
                >
                  <Text style={s.detailText}>Lihat Detail</Text>
                  <Image
                    source={RightRedArrowTail}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        };

    return (
      <View>
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
        <CardBantuan
          title={data.title}
          startDate={data.start}
          endDate={data.finish}
          penerima={data.penerima}
          status={data.status === 1 ? "Terverifikasi" : "Belum Terverifikasi"}
          bgStatus={data.status === 1 ? "green" : "mustard"}
          kode={data.code}
          onPress={()=>{navigation.navigate('Search', { selectedCode : data.code})}}
        />
      </View>
    );
}
export default Search

const s = StyleSheet.create({
  body: {
    width: "100%",
    height: "auto",
    padding: 20,
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
  input: {
    width: "100%",
    backgroundColor: colors.white,
    marginVertical: "5%",
    borderRadius: 30,
    padding: 8,
    display: "flex",
    flexDirection: "row",
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