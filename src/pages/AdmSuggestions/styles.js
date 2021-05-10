import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #0085FF;
    flex: 1;
    justify-content: center;
    align-items: center;
`;



export const HeaderArea = styled.View`
    background-color: #60B2FE;
    width: 360px;
    height: 60px;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const HeaderTxt = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 30px;
    color: #F8E8E8;
`;

export const SuggestionsView = styled.View`
    background-color: #60B2FE;
    width: 360px;
    padding: 10px;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    margin-top: 5px; 
    margin-bottom: 10px;    
`;
export const SuggestionsText = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 20px;
    color: #F8E8E8;
    padding: 5px;

`;




