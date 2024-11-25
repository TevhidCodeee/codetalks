import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../Styles/colors";


const device = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 15,
        width: '48%', 
        marginHorizontal: 4, 
        marginVertical: 8,
        height: device.height / 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#f7f7f7"
      },
      title: {
        textAlign:"center",
        color:colors.orange,
        fontSize:25,
        fontWeight:"bold"
      },
    })