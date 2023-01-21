import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Splash,
    Login,
    Otp,
    Home,
    Profile,
    NewBantuan,
    Status,
    StatusVerify,
    List,
} from '../screen'

const Stack = createStackNavigator();

const Router =({navigation})=>{
    return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewBantuan"
          component={NewBantuan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Status"
          component={Status}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StatusVerify"
          component={StatusVerify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
}

export default Router