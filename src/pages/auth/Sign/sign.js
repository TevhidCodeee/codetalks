import React, { useState } from "react";
import { Text, View } from 'react-native';
import styles from './signStyle';
import { Formik } from "formik";
import Input from "../../../component/Input/Input";
import Button from "../../../component/Button";
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import authErrorMessagesParser from "../../../utils/authErrorMessagesParser";

const initialFormValues={
    usermail:"",
    password:"",
    repassword:""
}

export default function Sign({navigation}){

    const[loading, setLoading] = useState(false)

    function handleLogin(){
        navigation.goBack();
    }

    async function handleFormSubmit(formValues){
        if(formValues.password!==formValues.repassword){
            showMessage({
                message:"Şifreler Uyuşmuyor",
                type:"info"
            })
            return;
        }
        try {
            setLoading(true)
            await auth().createUserWithEmailAndPassword(
                 formValues.usermail,
                 formValues.password);
            showMessage({
                message:"Kullanıcı Oluşturuldu",
                type:"success"
            });
            navigation.navigate("LoginPage")
            setLoading(false)
            
        } catch (error) {
            setLoading(true)
            showMessage({
                message:authErrorMessagesParser(error.code),
                type:"danger"
            })
            setLoading(false)
        }
    }


    return(
        <View style={styles.container}>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                {({values, handleChange, handleSubmit})=>(
                    <>
                        <Text style={styles.title}>codetalks</Text>
                        <Input value={values.usermail} onType={handleChange('usermail')} placeholder="e-postanızı giriniz"/>
                        <Input value={values.password} onType={handleChange('password')} placeholder="şifrenizi giriniz"/>
                        <Input value={values.repassword} onType={handleChange('repassword')} placeholder="şifrenizi tekrar giriniz"/>
                        <Button text="Kayıt Ol" theme="primary" loading={loading} onPress={handleSubmit}/>
                    </>
                )}
            </Formik>
            <Button text="Geri" theme="secondary" onPress={handleLogin}/>
        </View>
    )
}

