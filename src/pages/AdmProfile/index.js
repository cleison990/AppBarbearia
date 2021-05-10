import React, { useEffect, useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    ProfileView,
    HeaderArea,
    HeaderTxt,
    ConfigView,
} from './styles';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../auth/AuthContext';

import ProfileField from '../../components/ProfileField';

import ProfileIcon from '../../assets/profile.svg';
import EmailIcon from '../../assets/email.svg';
import PhoneIcon from '../../assets/phone.svg';

import ProfileButton from '../../components/ProfileButton';


export default () => {


    const { user } = useContext(AuthContext); //constante que verifica qual o usuario está logado no sistema
    const navigation = useNavigation();
    const [userData, setUserData] = useState();



    //essa função pega os dados da coleção Users do usuario logado
    const getUser = async () => {
        await firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    }

    useEffect(() => {
        getUser();
    }, [])





    //função para fazer signout e navegar para a tela de login 
    //https://rnfirebase.io/ documentação do firebase no react-native
    const SignOut = () => {
        auth()
            .signOut()
            .then(() =>
                navigation.reset({
                    routes: [{ name: 'SignIn' }]
                })
            );
    }






    return (
        <Container>
            <HeaderArea>
                <HeaderTxt>Adm Perfil</HeaderTxt>
            </HeaderArea>
            <ProfileView>
                <ProfileField
                    IconSvg={ProfileIcon}
                    title={userData ? userData.name : 'Username'}
                />
                <ProfileField
                    IconSvg={EmailIcon}
                    title={userData ? userData.email : 'UserEmail'}
                />
                <ProfileField
                    IconSvg={PhoneIcon}
                    title={userData ? userData.telefone : 'UserPhone'}
                />
            </ProfileView>
            <ConfigView>
                <ProfileButton
                    title={'Editar perfil'}
                    onPress={() => navigation.navigate('ProfileEdit')}
                />
                <ProfileButton
                    title={'Sair do AppBarber'}
                    onPress={SignOut}
                />
            </ConfigView>
        </Container>

    )
}