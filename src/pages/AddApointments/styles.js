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

export const ServicesView = styled.View`
    background-color: #60B2FE;
    width: 360px;
    height: 60px;
    border-radius: 10px;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ServicesText = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 25px;
    color: #F8E8E8;
    margin-right: 15px;
`;

export const ServicesBtn = styled.TouchableOpacity`
    width: 75px;
    height: 60px;
    background-color: rgba(0, 87, 255, 0.6)
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    justify-content: center;
    align-items: center;
    

`;

export const ServicesBtnTxt = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 15px;
    color: #FFF;
`;



