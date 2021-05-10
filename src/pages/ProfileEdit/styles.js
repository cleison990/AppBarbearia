import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #0085FF;
    flex: 1;
    align-items: center;
    
    
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

export const InputArea = styled.View`
    flex: 1;
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 20px;
    
`;

export const ButtonArea = styled.View`
    flex: 1;
    justify-content: flex-end;   
`;