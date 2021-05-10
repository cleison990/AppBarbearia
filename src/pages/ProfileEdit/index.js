import React, { useState, useContext } from 'react';
import {
    Container,
    HeaderArea,
    HeaderTxt,
    InputArea,
    ButtonArea
} from './styles';
import SignInput from '../../components/SignInput';
import ProfileButton from '../../components/ProfileButton';
import { useNavigation } from '@react-navigation/native';
import { Alert, KeyboardAvoidingViewBase } from 'react-native';
import { AuthContext } from '../../auth/AuthContext';
import firestore from '@react-native-firebase/firestore';



export default () => {

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [phoneField, setPhoneField] = useState('');

    const navigation = useNavigation();

    const { user } = useContext(AuthContext);

    async function handleUpdate() {
        if (nameField != '' && emailField != '' && phoneField != '') {
            try {
                await firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .update({
                        name: nameField,
                        email: emailField,
                        telefone: phoneField
                    })
                    .then(() => {
                        navigation.navigate('Profile')

                        Alert.alert('', 'Dados atualizados')

                    });
            } catch (error) {
                console.log(error)
            }

        } else {
            Alert.alert('', 'Digite os campos')
        }
    }

    return (
        <Container>

            <HeaderArea>
                <HeaderTxt>Editar perfil</HeaderTxt>
            </HeaderArea>
            <InputArea>

                <SignInput
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)}
                />
                <SignInput
                    placeholder="Digite seu email"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput
                    placeholder="Digite seu telefone"
                    value={phoneField}
                    onChangeText={t => setPhoneField(t)}
                />
            </InputArea>
            <ButtonArea>
                <ProfileButton
                    title={'Confirmar'}
                    onPress={handleUpdate}
                />
                <ProfileButton
                    title={'Cancelar'}
                    onPress={() => navigation.navigate('Profile')}
                />
            </ButtonArea>
        </Container>
    );
}
