import React from "react";
import { Text, View } from 'react-native';
import styles from './MCardStyle';
import {formatDistance,parseISO} from 'date-fns';
import {tr} from 'date-fns/locale'

export default function MessageCard({message, onPress, icon}) {

    const formattedDate = formatDistance(
        parseISO(message.date), 
        new Date(),
        { addSuffix: true, locale: tr } 
      );

    return(
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <Text style={styles.user}>{message.username}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <Text style={styles.title}>{message.text}</Text>
        </View>
    )
}