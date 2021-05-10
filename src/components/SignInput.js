//componente textInput que é usado na tela de login e de cadastro


import React from 'react';
import styled from 'styled-components/native';


const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.5);
    flex-direction: row;
    border-radius: 10px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin-left: 10px;

`;

export default ({placeholder, value, onChangeText, password}) => {
    return(
        <InputArea>
        <Input
        placeholder={placeholder}
        placeholderTextColor='#FFF'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
        />
        </InputArea>
    )

}
