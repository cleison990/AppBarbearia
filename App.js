//aq são todos os imports que precisam ser feitos pro app funcionar

import React from 'react'; //import do react
import { NavigationContainer } from '@react-navigation/native';
//esse import é da biblioteca react navigation que a principal que a gente vai usar pra navegar entre as telas do app 
import { createStackNavigator } from '@react-navigation/stack';
//esse import é uma dependencia da bibliotaca react navigation é um dos tipos de navegação entre telas
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//esse import tambem é uma dependecia da biblioteca react navigation é o outro tipo de navegação entre as telas

import PreLoad from './src/pages/PreLoad';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import ProfileEdit from './src/pages/ProfileEdit';
import MyApointments from './src/pages/MyApointments';
import ServicesValues from './src/pages/ServicesValues';
import AddApointments from './src/pages/AddApointments';
import Suport from './src/pages/Suport';


import AdmHome from './src/pages/AdmHome';
import AdmAppointments from './src/pages/AdmAppointments';
import AdmProfile from './src/pages/AdmProfile';
import AdmServicesValues from './src/pages/AdmServicesValues';
import AdmSuggestions from './src/pages/AdmSuggestions';
// esses são os imports das telas do app

import CustomTabBar from './src/components/CustomTabBar';
import AdmCustomTabBar from './src/components/AdmCustomTabBar';
import { AuthProvider } from './src/auth/AuthContext';





const Stack = createStackNavigator(); // essa é a variavel que cria o componente que vai renderizar nossas telas
const Tab = createBottomTabNavigator();
const Admtab = createBottomTabNavigator();


function AdmTabs() {
  return (
    <Tab.Navigator tabBar={props => <AdmCustomTabBar {...props} />}>
      <Tab.Screen name="AdmHome" component={AdmHome} />
      <Tab.Screen name="AdmAppointments" component={AdmAppointments} />
      <Tab.Screen name="AdmSuggestions" component={AdmSuggestions} />
      <Tab.Screen name="AdmProfile" component={AdmProfile} />
    </Tab.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyApointments" component={MyApointments} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="ServicesValues" component={ServicesValues} />
    </Tab.Navigator>
  )
}




export default function App() {



  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PreLoad" // essa função define qual vai ser a primeira tela a ser renderizada
          screenOptions={{
            headerShown: false // essa função serve para não mostrar o rodapé das telas
          }
          }>
          <Stack.Screen name="PreLoad" component={PreLoad} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="ServicesValues" component={ServicesValues} />
          <Stack.Screen name="AddApointments" component={AddApointments} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          <Stack.Screen name="Suport" component={Suport} />
          <Stack.Screen name="AdmHome" component={AdmTabs} />
          <Stack.Screen name="AdmServicesValues" component={AdmServicesValues} />

          {//aq são as telas que vão ser renderizadas
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}