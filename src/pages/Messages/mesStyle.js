import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD580', // Arka plan rengi
        justifyContent: 'center', // İçeriği ortala
        alignItems: 'center', // Yatayda ortala
      },
      messageBox: {
        backgroundColor: '#FFA500', // Turuncu kutu
        padding: 15, // İçerik boşluğu
        borderRadius: 10, // Kenarları yuvarlat
        borderWidth: 2, // Çizgi kalınlığı
        borderColor: '#FFFFFF', // Beyaz çizgi
        borderStyle: 'dotted', // Kesik çizgiler
      },
      messageText: {
        fontSize: 16,
        color: '#FFFFFF', // Beyaz yazı
        fontWeight: 'bold',
      },
})