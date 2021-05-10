//essa é a primeira tela do app que vai ser renderizada assim que o app abrir 
/*essa tela vai verificar se o usuario tem um token de login valido, caso o usuario tenha ele vai ser redirecionado 
para a tela home do app, se não ele é direcionado pra tela de login*/

import React, { useEffect } from 'react';
// esse import pra definir os estilos e colocar a logo mas vamos ter que mudar depois para usar o styled-components ou svg 
import { Container, CustomText } from './styles'; // aq são os estilos que vão ficar em um arquivo separado 
import { useNavigation } from '@react-navigation/native'; // biblioteca react navigation
import Applogo from '../../assets/logo.svg';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';


export default function App() {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);


    //essa função verifica se há um usuario logado e manda ele direto para a tela de home
    //se não houver um usuario logado ele vai pra tela de login
    //os dados do usuario ficam salvos na memoria cache do app 
    /* a função navigation.reset serve para que o usario navegue 
    pra tela especificada e não possa voltar para a tela anterior*/
    useEffect(() => {
        const checkToken = async () => {
            if (user != null && user.uid != 'IdammXSU4sQMNjaCgq4GqTL3rMX2') {
                navigation.reset({
                    routes: [{ name: 'Home' }]
                })
            } else {
                navigation.reset({
                    routes: [{ name: 'SignIn' }]
                })
            }
        }
        checkToken();

    }, []);


    return (
        <Container>
            <Applogo width="100%" height="160"></Applogo>
            <CustomText>Barbearia Ragnar</CustomText>
        </Container>
    );
}