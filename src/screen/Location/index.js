import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet} from 'react-native'
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";


const Location = ({navigation})=>{
   const [position, setPosition] = useState({
     latitude: 10,
     longitude: 10,
    //  latitudeDelta: 0.001,
    //  longitudeDelta: 0.001,
   });

   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);
   useEffect(() => {
     Geolocation.getCurrentPosition((pos) => {
      console.log(pos)
     
       setLatitude(pos.coords.latitude);
       setLongitude(pos.coords.longitude);

        if (latitude !== null && longitude !== null) {
          navigation.replace("NewBantuan", {
            selectedCode: null,
            longitude: longitude,
            latitude: latitude,
          });
        }
      }
       )
   }, []);
    return (
      <View style={{ width: "100%", height: "100%" }}>
       
        <MapView
          style={s.map}
          // provider={PROVIDER_GOOGLE}
          // initialRegion={position}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          loadingEnabled
          // scrollEnabled={true}
          // zoomEnabled={true}
          // pitchEnabled={true}
          // rotateEnabled={true}
          
        >
          <Marker
            title="Yor are here"
            description="This is a description"
            // coordinate={position}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        </MapView>
      </View>
    );
}
export default Location

const s = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    // width: "100%",
    // height: "100%",
    // flex:1,
    // paddingTop:40,
  },
});