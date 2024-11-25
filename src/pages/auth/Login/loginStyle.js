import { StyleSheet } from "react-native";
import colors from "../../../Styles/colors";

export default StyleSheet.create({
    container:{
        flex:1,
         backgroundColor:colors.orange
    },
    title:{
        flex:1/2,
        justifyContent:"center",
        top:200,
        left:140,
        fontSize:25,
        color:"#fff"
    }
})