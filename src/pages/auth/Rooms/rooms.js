import React, { useEffect, useState } from "react";
import {FlatList, Text, View} from 'react-native';
import FloatingButton from "../../../component/FloatingButton";
import styles from './roomsStyle';
import RoomsModal from "../../../component/Modal/RoomsModal";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from "../../../utils/parseContentData";
import RoomsCard from "../../../component/Card/RoomsCard";

export default function Rooms({navigation}){

  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState([]);
  
  useEffect(()=>{
    const user = auth().currentUser;
    if (!user) {
      console.log('Kullanıcı oturum açmamış.');
      navigation.replace('LoginPage'); 
    }
    database().ref('rooms/')
    .on('value', snapshot => {
      const contentData = snapshot.val();
      const parsedContent = parseContentData(contentData);
      setContentList(parsedContent)
    })
  },[])

  function handleInputToggle(){
    setInputModalVisible(!inputModalVisible)
  }
  
  function handleSendContent(content){
    handleInputToggle();
    sendContent(content)
  }

  function sendContent(content){
    const userMail= auth().currentUser.email;

    const contentObject={
      text:content,
      userMail:userMail.split('@')[0],
      date:new Date().toISOString(),
    }
    database().ref('rooms/').push(contentObject)
  }


  function handleCardSelect(item) {
    navigation.navigate('MessagePage', { roomId: item.id, roomName: item.text });
  }

  const renderContent = ({ item }) => (
    <RoomsCard 
      rooms={item} 
      onPress={() => handleCardSelect(item)} 
    />
  );
  

  return(
        <View style={styles.container}>
          <FlatList
          data={contentList}
          renderItem={renderContent}
          numColumns={2}
          key={`rooms-${contentList.length}`}
          />
          <FloatingButton icon="plus" onPress={handleInputToggle}/>
          <RoomsModal 
          visible={inputModalVisible} 
          onClose={handleInputToggle}
          onSend={handleSendContent}
          />
        </View>
    )
}

