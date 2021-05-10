import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Applogo from '../../assets/logo.svg';
import {
    Container,
    CustomText,
    IputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageText,
    PasswordRecoverButton,
    PasswordRecoverText
} from './styles';

import SignInput from '../../components/SignInput'; //esse é um componente que vai ser usado na tela de login e de cadastro
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';


export default () => {


    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [senhaField, setSenhaField] = useState('');

    const hanleSignClick = () => { //essa função ainda não ta pronta pq ainda é preciso criar as outras telas 
        if (emailField === 'adm@gmail.com') {
            auth()
                .signInWithEmailAndPassword(emailField, senhaField)
                .then(() => {
                    navigation.reset({
                        routes: [{ name: 'AdmHome' }]
                    })
                })
                .catch(error => {

                    if (error.code === 'auth/user-not-found') {
                        Alert.alert('', 'Email invalido!');
                    }

                    if (error.code === 'auth/wrong-password') {
                        Alert.alert('', 'Senha invalida!');


                    }

                    console.error(error);
                });
        }
        if (emailField != "" && senhaField != "" && emailField != "adm@gmail.com") {
            auth()
                .signInWithEmailAndPassword(emailField, senhaField)
                .then(() => {
                    navigation.reset({
                        routes: [{ name: 'Home' }]
                    })
                })
                .catch(error => {

                    if (error.code === 'auth/user-not-found') {
                        Alert.alert('', 'Email invalido!');
                    }

                    if (error.code === 'auth/wrong-password') {
                        Alert.alert('', 'Senha invalida!');


                    }

                    console.error(error);
                });

        } else {
            if (emailField != 'adm@gmail.com') {
                Alert.alert("", "Digite os campos")
            }
        }
    }

    const recover = () => {
        if (emailField != '') {
            auth()
                .sendPasswordResetEmail(emailField)
                .then((r) => {
                    Alert.alert('Atenção', 'Enviamos um email de recuperação de senha para o seguinte email: ' + emailField)
                })
        } else {
            Alert.alert('Digite seu email')
        }
    }


    const handleMessageButtonClick = () => { //essa é a função do botão cadastrar, que manda o app para a tela de cadastro 
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        })
    }

    return (
        <Container>
            <Applogo width="100%" height="160"></Applogo>
            <CustomText>Barbearia Ragnar</CustomText>
            <IputArea>

                <SignInput
                    placeholder="Digite seu email"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />

                <SignInput
                    placeholder="Digite sua senha"
                    value={senhaField}
                    onChangeText={t => setSenhaField(t)}
                    password={true}
                />

                <CustomButton onPress={hanleSignClick}>
                    <CustomButtonText>ENTRAR</CustomButtonText>
                </CustomButton>

            </IputArea>
            <PasswordRecoverButton onPress={recover}>
                <PasswordRecoverText>Esqueceu a senha ?</PasswordRecoverText>
            </PasswordRecoverButton>


            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageText>Ainda não possui uma conta? Cadastre-se</SignMessageText>
            </SignMessageButton>
        </Container>

    );
}


