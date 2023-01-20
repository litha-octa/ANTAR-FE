import React, {useRef, useState, useEffect} from "react";
import {Video} from 'expo';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { IconSuccess , MiniLogo} from "../../Assets/img";
import { colors, fontFam } from "../../Assets/colors";

const StatusVerify = ({navigation, route}) => {
    useEffect(() => {
      setTimeout(() => {
        navigation.replace("Home");
      }, 3000);
    }, []);
const {verified} = route.params
// View>
//              {/* style={s.containerLoading}> */}
//           <Video
//             ref={video}
//             // style={styles.video}
//             source={require('../../Assets/loader.mp4')}
//             useNativeControls
//             resizeMode="contain"
//             isLooping
//             onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//           />
//         </View>
 const [status, setStatus] = useState({}); 
const video = useRef(null);
    return (
      <View>
        <View style={s.statusContainer}>
          <Image source={IconSuccess} style={s.imgStatus} />
          <Text style={[s.textStatus, { fontWeight: "bold", fontSize: 20 }]}>
            Berhasil
          </Text>
          <Text style={[s.textStatus, { color: colors.grey }]}>
            Akun Anda Telah Berhasil Diverifikasi
          </Text>
          <TouchableOpacity style={s.btnToHome} onPress={()=>{navigation.navigate('Home')}}>
            <Text style={s.textBtnHome}>Verifikasi</Text>
          </TouchableOpacity>
          <Image source={MiniLogo}  style={s.btmIcon}/>
        </View>
      </View>
    );
}
export default StatusVerify

const s = StyleSheet.create({
    statusContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:colors.white,
    },
    imgStatus:{
        width:'45%',
        height:'30%',
        marginTop:'40%',
        resizeMode:'contain',
        alignSelf:'center'
    },
    textStatus:{
        fontFamily:fontFam,
        fontSize:17,
        color:colors.black,
        textAlign:'center',
        marginVertical:10,
    },
    btnToHome:{
        width:'94%',
        marginHorizontal:'3%',
        backgroundColor:colors.main,
        borderRadius:20,
        padding :10,
        height:50,
        marginTop:20,
        justifyContent:'center'
    },
    textBtnHome:{
        color:colors.white,
        fontFamily:fontFam,
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center',
    },
    btmIcon:{
        width :'25%',
        height:'5%',
        resizeMode:'contain',
        position:'absolute',
        bottom:15,
        alignSelf:'center',
    }
})