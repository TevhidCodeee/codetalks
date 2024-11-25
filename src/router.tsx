import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import FlashMessage from "react-native-flash-message";
import Rooms from "./pages/auth/Rooms";
import colors from "./Styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MessagesPage from "./pages/Messages";


type RootStackParamList = {
  LoginPage: undefined;
  MessagePage: { roomName: string; messageId: string };
  SignPage:undefined;
  RoomsPage:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



export default function App(){

  const [useSession, setUseSession] = useState(false);

  useEffect(()=>{
    auth().onAuthStateChanged((user)=>{
      setUseSession(!!user)
    })
  },[])
  

  function AuthStack(){
    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoginPage" component={Login}/>
        <Stack.Screen name="SignPage" component={Sign}/>
      </Stack.Navigator>
    )
  }
  
  return(
    <NavigationContainer>
      {
        !useSession ? (
          <AuthStack/>
        ):(
          <Stack.Navigator>
            <Stack.Screen name="RoomsPage" component={Rooms} 
            options={{
              title:'Odalar', 
              headerTintColor:colors.orange, 
              headerTitleAlign: 'center', 
              headerRight: () => <Icon name="logout" size={30} color={colors.orange} style={{marginRight:10}}
              onPress={()=>auth().signOut()}
              />
            }}
            />
            <Stack.Screen 
              name="MessagePage" 
              component={MessagesPage} 
              options={({ route, navigation }) => ({
                title: route.params?.roomName || 'Mesajlar',
                headerTitleAlign: 'center', 
                headerTitleStyle: {
                  fontSize: 24, 
                  fontWeight: 'bold',
                  color: colors.orange
                },
                headerLeft: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon 
                        name="account-arrow-left-outline" 
                        size={25} 
                        color={colors.orange} 
                        style={{ marginRight: 10 }} 
                      />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: colors.orange }}>Odalar</Text>
                  </View>
                ),
              })}
          />


          </Stack.Navigator>
        )
      }
      <FlashMessage position="top"/>
    </NavigationContainer>
  )
}
