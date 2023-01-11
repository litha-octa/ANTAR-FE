import React from "react";
import {View, Text, Image,StyleSheet,StatusBar, SafeAreaView} from 'react-native'

const Status =()=>{
    return (
      <SafeAreaView>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={"dark-content"}
        />

        <View>
          <Text>Berhasil</Text>
        </View>
      </SafeAreaView>
    );
}
export default Status