import React from 'react';
import styled from 'styled-components';

const ProfileArea = styled.View`
    background-color: rgba(255, 255, 255, 0.2);
    width: 360px;
    height: 50px;
    align-items: center;
    border-radius: 10px;
    justify-content: flex-start;
    margin-top: 15px;
    flex-direction: row;
    padding-left: 10px;
    
    
`;



const ProfileTxt = styled.Text`
    font-family: Saira ExtraCondensed;
    font-size: 25px;
    color: #F8E8E8;
    padding-left: 10px;
`;









export default ({ title, IconSvg }) => {

    return (
        <ProfileArea>
            <IconSvg width={25} height={25} fill={'#fff'} />
            <ProfileTxt>{title}</ProfileTxt>
        </ProfileArea>
    );
}