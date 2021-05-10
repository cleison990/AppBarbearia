import React from 'react';
import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`

    background-color: #0085FF;
    flex: 1;
    justify-content: center;
    align-items: center;

`;

export const CustomText = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 30px;
    color: #F8E8E8;
`;

export const IputArea = styled.View`
    
    width: 80%;
    height: 30px;
    margin-top: 0px;
    

`;


export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: rgba(0, 87, 255, 0.6)
    border-radius: 10px;
    justify-content: center;
    align-items: center;

`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;    
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 400px;
    margin-bottom: 20px;
`;
export const SignMessageText = styled.Text`
    font-size: 16px;
    color: #FBF8F8;
    margin-left: 5px;
`;





/*
IputArea, 
CustomButton, 
CustomButtonText, 
SignMessageButton, 
SignMessageText, 
SignMessageTextBold


*/