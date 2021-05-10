import React from 'react';
import { Container, 
    CustomButton, 
    CustomButtonText, 
    CustomButton2, 
    CustomButtonText2, 
    CustomButton3, 
    CustomButtonText3,
    HeaderArea,
    HeaderTxt,
} from './styles';
import PerfilIcon from '../../assets/avatar_funcionario.svg';

export default () => {
    return(
        <Container>
            <HeaderArea>
                <HeaderTxt>FUNCIONÁRIOS</HeaderTxt>
            </HeaderArea>
            <CustomButton>
            <PerfilIcon/><CustomButtonText>EXEMPLO1</CustomButtonText>
            </CustomButton>
            <CustomButton2>
            <PerfilIcon/><CustomButtonText2>EXEMPLO2</CustomButtonText2>
            </CustomButton2>
            <CustomButton3>
            <PerfilIcon/><CustomButtonText3>EXEMPLO3</CustomButtonText3>
            </CustomButton3>
        </Container>
    );
}