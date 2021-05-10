//esse componente é a tab bar do app que substitui a tab bar padrão do bottomTabsNavigator


import React from 'react';
import styled from 'styled-components/native';
import HomeIcon from '../assets/home.svg';
import ProfileIcon from '../assets/user.svg';
import MyApointmentsIcon from '../assets/calendar.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #60B2FE;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName); //função para navegar entre as telas
    }


    return (
        <TabArea>
            <TabItem onPress={() => goTo('Home')}>
                <HomeIcon style={{ opacity: state.index === 0 ? 1 : 0.8 }} width="35" height="25" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={() => goTo('MyApointments')}>
                <MyApointmentsIcon style={{ opacity: state.index === 1 ? 1 : 0.8 }} width="35" height="25" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={() => goTo('Profile')}>
                <ProfileIcon style={{ opacity: state.index === 3 ? 1 : 0.8 }} width="35" height="25" fill="#FFFFFF" />
            </TabItem>
        </TabArea>

    );
}
