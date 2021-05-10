import React, { useState } from 'react';
import {
    Container,
    CustomText
} from './styles';
import Applogo from '../../assets/logo.svg';
import CustomButton from '../../components/CustomButtom.js';
import IconServices from '../../assets/services.svg';
import { useNavigation } from '@react-navigation/native'; //https://reactnavigation.org/docs/getting-started
import ModalAddServices from '../../components/ModalAddServices'


export default () => {

    const navigation = useNavigation(); //variavel constante para usar a navegação entre telas
    const [showModal, setShowModal] = useState(false);

    return (

        <Container>

            <Applogo width="100%" height="160"></Applogo>
            <CustomText>Barbearia Ragnar</CustomText>
            <CustomButton
                IconSvg={IconServices}
                title={"Serviços disponíveis"}
                onPress={() => navigation.navigate('AdmServicesValues')} //botão para ir para tela que mostra os valores dos serviços
            />
            <CustomButton
                IconSvg={IconServices}
                title={'Adicionar serviço'}
                onPress={() => setShowModal(true)}
            />
            <ModalAddServices
                show={showModal}
                setShow={setShowModal}
            >

            </ModalAddServices>
        </Container>
    )
}