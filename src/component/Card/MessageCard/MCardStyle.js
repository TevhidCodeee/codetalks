import { StyleSheet } from "react-native";
import colors from "../../../Styles/colors";

export default StyleSheet.create({
    container:{
        backgroundColor:colors.orange,
        padding:10,
        margin:10,
        borderRadius:10,
        shadowColor:"black",
        shadowOpacity: 0.25,
        color:"white"

    },
   
    inner_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center"
    },
    title:{
        color:"white"
    },
    user:{
        color:"white"
    },
    date:{
        color:"white"
    },
})