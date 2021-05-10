import React, { useState, useEffect } from 'react';
import {
  Container,
  HeaderArea,
  HeaderTxt,
  ServicesContainer,
  ServicesView,
  ServicesText,
  ServicesButtonView,
  RemoveButton,
  RemoveButtonText
} from './styles';
import { FlatList, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import ModalUpdateServices from '../../components/ModalUpdateServices';


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
  const [selectedService, setSelectedService] = useState('');
  const [showModal, setShowModal] = useState(false);


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

  async function handleRemove(item) {

    Alert.alert('', 'Deseja apagar esse serviço ?', [
      {
        text: 'NÃO',
        style: 'cancel',
      },
      {
        text: 'SIM',
        onPress: async () => {
          try {
            await firestore()
              .collection('Services')
              .doc(`${item.nome}`)
              .delete()
              .then(() => {
                console.log('User deleted!');
              });
          } catch (error) {
            console.log(error)
          }
        }
      }
    ])

  }

  if (loading) {
    return <ActivityIndicator />;
  }

  const handleUpdate = (item) => {
    setSelectedService(item.nome);
    setShowModal(true);
  }

  return (
    <Container>
      <HeaderArea>
        <HeaderTxt>Serviços disponíveis</HeaderTxt>
      </HeaderArea>
      <FlatList
        data={Services}
        renderItem={({ item }) => (
          <ServicesContainer>
            <ServicesView>
              <ServicesText>{item.nome}: R${item.valor}</ServicesText>
            </ServicesView>
            <ServicesButtonView>
              <RemoveButton>
                <RemoveButtonText onPress={() => handleUpdate(item)}>
                  Atualizar Valor
              </RemoveButtonText>
              </RemoveButton>
              <RemoveButton onPress={() => handleRemove(item)}>
                <RemoveButtonText>
                  Remover serviço
              </RemoveButtonText>
              </RemoveButton>
            </ServicesButtonView>
          </ServicesContainer>
        )}
      />
      <ModalUpdateServices
        show={showModal}
        setShow={setShowModal}
        service={selectedService}
      />
    </Container>
  );
}