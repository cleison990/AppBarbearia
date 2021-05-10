import React, { useState, useContext } from 'react';
import {
    Container,
    HeaderArea,
    HeaderTxt,
    InputArea,
    Input,
    SupportArea,

} from './styles';
import ProfileButton from '../../components/ProfileButton';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../auth/AuthContext';


export default () => {

    const [message, setMessage] = useState('');
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const handleSubmit = () => {
        if (message != '') {
            firestore()
                .collection('Suggestions')
                .add({
                    CreatedAt: firestore.Timestamp.fromDate(new Date()),
                    message: message,
                })
                .then(() => {
                    Alert.alert('', 'Obrigado por nos enviar suas sugestões');
                    navigation.navigate('Profile')


                });
        } else {
            Alert.alert('', 'Digite sua mensagem')
        }

    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTxt>Enviar sugestões</HeaderTxt>
            </HeaderArea>
            <SupportArea>
                <InputArea>
                    <Input
                        placeholder={'Digite aqui sua mensagem'}
                        placeholderTextColor='#FFF'
                        value={message}
                        onChangeText={t => setMessage(t)}
                    />
                </InputArea>
                <ProfileButton
                    title={'Enviar'}
                    onPress={handleSubmit}
                />
                <ProfileButton
                    title={'Descartar'}
                    onPress={() => navigation.navigate('Profile')}
                />
            </SupportArea>
        </Container>

    );
}