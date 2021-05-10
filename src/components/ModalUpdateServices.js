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

const ServicesInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ServiceName = styled.Text`
    color: #FFF;
    font-size: 20px;
    
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


export default ({ show, setShow, service }) => {

    const [serviceValueField, setServiceValueField] = useState('');

    const handleCloseBtn = () => {
        setShow(false);
    }

    const handleUpdateServiceButton = async () => {
        if (serviceValueField != '') {
            try {
                await firestore()
                    .collection('Services')
                    .doc(service)
                    .update({
                        valor: serviceValueField
                    })
                    .then(() => {
                        setShow(false)
                        Alert.alert('', 'Valor Atualizado');
                        navigation.navigate('AdmServicesValues')
                    });
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('', 'Digite o novo valor')
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
                        <ServicesInfo>
                            <ServiceName>{service}</ServiceName>
                        </ServicesInfo>
                    </ModalItem>

                    <ModalItem>
                        <SignInput
                            placeholder="Digite o novo valor"
                            value={serviceValueField}
                            onChangeText={t => setServiceValueField(t)}
                        />
                    </ModalItem>
                    <FinishBtn onPress={handleUpdateServiceButton}>
                        <FinishBtnTxt>
                            Atualizar valor
                        </FinishBtnTxt>
                    </FinishBtn>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}

