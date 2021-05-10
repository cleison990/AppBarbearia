import React, { useState } from 'react';
import Applogo from '../../assets/logo.svg';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  CustomText,
  IputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageText
} from './styles';

import SignInput from '../../components/SignInput';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export default () => {

  const navigation = useNavigation();

  const [nomeField, setNomeField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [senhaField, setSenhaField] = useState('');
  const [telefoneField, setTelefoneField] = useState('');

  const hanleSignClick = () => { //essa função do botão cadastrar
    if (nomeField != "" && emailField != "" && emailField != "") {
      auth()
        .createUserWithEmailAndPassword(emailField, senhaField)
        .then(() => {

          firestore().collection('Users').doc(auth().currentUser.uid)
            .set({
              name: nomeField,
              email: emailField,
              telefone: telefoneField,
              CreatedAt: firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
              console.log('User added!');
            });


          Alert.alert('', 'Conta criada com sucesso! Já pode fazer Login');
          navigation.reset({
            routes: [{ name: 'SignIn' }]
          })
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('', 'Email já está sendo utilizado!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('', 'Email invalido!');
          }

          console.error(error);
        });
    } else {
      Alert.alert("", "Digite os campos")
    }

  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
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
          onChangeText={t => setEmailField(t)} />

        <SignInput
          placeholder="Digite seu nome"
          value={nomeField}
          onChangeText={t => setNomeField(t)} />

        <SignInput
          placeholder="Digite sua senha"
          password={true}
          value={senhaField}
          onChangeText={t => setSenhaField(t)}
        />
        <SignInput
          placeholder="Telefone"
          value={telefoneField}
          onChangeText={t => setTelefoneField(t)}
        />

        <CustomButton onPress={hanleSignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </IputArea>
      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageText>Já possui uma conta? clique aqui para entrar</SignMessageText>
      </SignMessageButton>
    </Container>

  );
}
