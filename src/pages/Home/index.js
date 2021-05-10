//tela home do app
//a primeira tela que vai ser carregada depois de fazer login

import React from 'react';
import { Container, CustomText } from './styles';
import Applogo from '../../assets/logo.svg';
import IconPay_date from '../../assets/appointment.svg';
import CustomButton from '../../components/CustomButtom.js';
import IconServices from '../../assets/services.svg';
import { useNavigation } from '@react-navigation/native'; //https://reactnavigation.org/docs/getting-started

export default () => {

    const navigation = useNavigation(); //variavel constante para usar a navegação entre telas



    return (
        <Container>

            <Applogo width="100%" height="160"></Applogo>
            <CustomText>Barbearia Ragnar</CustomText>
            <CustomButton
                IconSvg={IconPay_date}
                title="Fazer Agendamento"
                onPress={() => navigation.navigate('AddApointments')} //botão para ir para telar de fazer agendamento
            />

            <CustomButton
                IconSvg={IconServices}
                title={"Serviços disponíveis"}
                onPress={() => navigation.navigate('ServicesValues')} //botão para ir para tela que mostra os valores dos serviços
            />
        </Container>
    )
}