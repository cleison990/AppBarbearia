import React from 'react';
import styled from 'styled-components';

const Button = styled.TouchableOpacity`
    width: 360px;
    height: 60px;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 87, 255, 0.6);
    border-radius: 10px;
    margin-bottom: 15px;
`;


const ButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;



export default ({ title, onPress }) => {
    return (
        <Button onPress={onPress}>
            <ButtonText>{title}</ButtonText>
        </Button>
    );
}