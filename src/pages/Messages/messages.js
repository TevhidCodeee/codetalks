import React, { useState } from "react";
import { View, Text, FlatList } from 'react-native';
import FloatingButton from "../../component/FloatingButton/FloatingButton.js";
import ContentInputModal from "../../component/Modal/RoomsModal/RoomsModal.js";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from "../../utils/parseContentData.js";
import MessageCard from "../../component/Card/MessageCard/MessageCard.js";



export default function Messages({ route }) {
  const { roomId } = route.params;
  const [inputModalVisible, setInputModalVisible] = React.useState(false);
  const [contentList, setContentList] = React.useState([]);

  React.useEffect(() => {
    const messagesRef = database().ref(`messages/${roomId}`);
    
    const onValueChange = messagesRef.on('value', snapshot => {
      const contentData = snapshot.val();
      const parsedData = parseContentData(contentData || {});
      setContentList(parsedData);
    });
  
    return () => messagesRef.off('value', onValueChange);
  }, [roomId]);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(content) {
    handleInputToggle();
    sendContent(content);
  }

  function sendContent(content) {
    const userMail = auth().currentUser.email;
    const contentObject = {
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
    };
  
    database().ref(`messages/${roomId}`).push(contentObject);
  }

  const renderContent = ({ item }) => <MessageCard message={item} />;

  
return (
  <View style={{ flex: 1 }}>
    <FlatList
      data={contentList}
      renderItem={renderContent}
      keyExtractor={(item) => item.id}
    />
    <FloatingButton icon="plus" onPress={handleInputToggle} />
    <ContentInputModal
      visible={inputModalVisible}
      onClose={handleInputToggle}
      onSend={handleSendContent}
    />
  </View>
);
}
