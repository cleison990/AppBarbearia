import React from 'react';
import styled from 'styled-components';


export const Container = styled.SafeAreaView`
    background-color: #0085FF;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    
`;

export const HeaderArea = styled.View`
    background-color: #60B2FE;
    width: 360px;
    height: 60px;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    margin-top: 15px;
`;

export const HeaderTxt = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 30px;
    color: #F8E8E8;
`;

export const SupportArea = styled.View`
    flex: 1;
    padding-top: 20px;
    

`;


export const InputArea = styled.View`
    
    width: 360px;
    height: 200px;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding-left: 20px;
    margin-bottom: 15px;
`;

export const Input = styled.TextInput`
    font-size: 16px;
    margin-left: 10px;

`;

