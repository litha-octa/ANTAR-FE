import React from "react";
import { View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import {colors, fontFam} from '../Assets/colors'
import { DefaultProfileSquare, IconBantuan, RightRedArrowTail } from "../Assets/img";

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

export default CardBantuan;
