import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #0085FF;
    flex: 1;
    justify-content: center;
    align-items: center;
`;


export const ScrollView = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const HeaderArea = styled.View`
    background-color: #60B2FE;
    width: 360px;
    height: 60px;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    margin-top: 20px;
`;

export const HeaderTxt = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 30px;
    color: #F8E8E8;
`;

export const ServicesContainer = styled.View`
    background-color: #60B2FE;
    padding: 12px;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    margin-top: 20px;
`;

export const ServicesView = styled.View`
    margin-bottom: 10px;
`;

export const ServicesText = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 30px;
    color: #F8E8E8;
`;

export const ServicesButtonView = styled.View`
    flex-direction: row;
    
`;

export const RemoveButton = styled.TouchableOpacity`
    background-color: rgba(0, 87, 255, 0.6);
    border-radius: 10px;
    margin-left:  20px;
    margin-right: 20px;
    padding: 8px;
`;

export const RemoveButtonText = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 16px;
    color: #F8E8E8;
`;
