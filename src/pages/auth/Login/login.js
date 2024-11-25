import React, { useState } from "react";
import { Text, View } from 'react-native';
import styles from './loginStyle';
import Input from "../../../component/Input/Input";
import Button from "../../../component/Button/Button";
import { Formik } from "formik";
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import authErrorMessagesParser from "../../../utils/authErrorMessagesParser";

const initialFormValues={
    usermail:"",
    password:""
}

export default function Login({navigation}){

    const[loading,setLoading] = useState(false);

    function handleSignUp(){
            navigation.navigate("SignPage");    
    }

    async function handleFormSubmit(formValues){
       try {
        setLoading(true)
        await auth().signInWithEmailAndPassword(
            formValues.usermail, 
            formValues.password);
        console.log("giriş")
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
                        <Button theme="primary" text="Giriş Yap" loading={loading} onPress={handleSubmit}/>
                    </>
                )}
            </Formik>
            <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp}/>
        </View>
    )
}

