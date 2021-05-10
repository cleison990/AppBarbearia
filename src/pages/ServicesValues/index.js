import React, { useState, useEffect } from 'react';
import {
  Container,
  HeaderArea,
  HeaderTxt,
  ServicesView,
  ServicesText,
} from './styles';
import { FlatList, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export default () => {

  /*const [valuesData, setValuesData] = useState();

  const getValues = async() => {
      await firestore()
      .collection('Services')
      .doc('valores')
      .get()
      .then((documentSnapshot) => {
          if( documentSnapshot.exists) {
              console.log('Valores Data', documentSnapshot.data());
              setValuesData(documentSnapshot.data());
          }
      })
  }

  useEffect(() => {
      getValues();
  }, [])*/


  const [loading, setLoading] = useState(true);
  const [Services, setServices] = useState([]);


  //função que pega dados da coleção de Services 
  useEffect(() => {
    const subscriber = firestore()
      .collection('Services')
      .onSnapshot(querySnapshot => {
        const Services = [];

        querySnapshot.forEach(documentSnapshot => {
          Services.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setServices(Services);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <HeaderArea>
        <HeaderTxt>Serviços disponíveis</HeaderTxt>
      </HeaderArea>
      <FlatList
        data={Services}
        renderItem={({ item }) => (
          <ServicesView>
            <ServicesText>{item.nome}: R${item.valor}</ServicesText>
          </ServicesView>
        )}
      />
    </Container>
  );
}