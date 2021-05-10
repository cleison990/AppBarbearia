import React, { useState } from 'react';
import styled from 'styled-components/native';
import ExpandIcon from '../assets/expandIcon.svg';
import SignInput from '../components/SignInput';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'


const Modal = styled.Modal`
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;
const ModalBody = styled.View`
    background-color: #0085FF;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 40px 20px;
`;

const CloseBtn = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalItem = styled.View`
    background-color: #0085FF;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;

`;

const FinishBtn = styled.TouchableOpacity`
    background-color: rgba(0, 87, 255, 0.6);
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
    align-items: center;


`;

const FinishBtnTxt = styled.Text`
    color: #FFF;
    font-size: 20px;
`;


export default ({ show, setShow }) => {

    const [serviceNameField, setServiceNameField] = useState('');
    const [serviceValueField, setServiceValueField] = useState('');

    const handleCloseBtn = () => {
        setShow(false);
    }

    const handleAddServiceButton = async () => {
        if (serviceValueField != '' && serviceNameField != '') {
            try {
                await firestore()
                    .collection('Services')
                    .doc(`${serviceNameField}`)
                    .set({
                        CreatedAt: firestore.Timestamp.fromDate(new Date()),
                        nome: serviceNameField,
                        valor: serviceValueField
                    })
                    .then(() => {
                        setShow(false)
                        Alert.alert('', 'Serviço adicionado!');
                        navigation.navigate('AdmHome')
                    });
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('', 'Digite os Campos')
        }
    }



    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseBtn onPress={handleCloseBtn}>
                        <ExpandIcon width="25" height="25" fill="#FFF" />
                    </CloseBtn>
                    <ModalItem>
                        <SignInput
                            placeholder="Digite o nome do serviço"
                            value={serviceNameField}
                            onChangeText={t => setServiceNameField(t)}
                        />
                        <SignInput
                            placeholder="Digite o valor do serviço"
                            value={serviceValueField}
                            onChangeText={t => setServiceValueField(t)}
                        />
                    </ModalItem>
                    <FinishBtn onPress={handleAddServiceButton}>
                        <FinishBtnTxt>
                            Adicionar serviço
                        </FinishBtnTxt>
                    </FinishBtn>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}

