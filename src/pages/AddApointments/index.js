import React, {useEffect, useState} from 'react';
import { Container, 
    ScrollView, 
    HeaderArea, 
    HeaderTxt, 
    ServicesView, 
    ServicesText,
    ServicesBtn,
    ServicesBtnTxt } from './styles';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BarberModal from '../../components/BarberModal';

export default () => {

    const [loading, setLoading] = useState(true);
    const [Services, setServices] = useState([]);
    
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceValue, setSelectedServiceValue] = useState(null);
    
    const [showModal, setShowModal] = useState(false);
    
    //função que pega dados da coleção de serviços 
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
      

      // essa função seta o serviço que foi selecionado para que ele seja mostrado no modal https://reactnative.dev/docs/modal
      const handleServiceChoose = (item) => {
          setSelectedService(item.nome);
          setSelectedServiceValue(item.valor);
          setShowModal(true);
          console.log(selectedService)
      }




    return(
        <Container>
            <HeaderArea>
                    <HeaderTxt>FAZER AGENDAMENTOS</HeaderTxt>
            </HeaderArea>
            <FlatList
                data={Services}
                renderItem={({item})=>(
                    <ServicesView>
                        <ServicesText> {item.nome}: R${item.valor}</ServicesText>
                        <ServicesBtn onPress={() => handleServiceChoose(item)}>
                            <ServicesBtnTxt>AGENDAR</ServicesBtnTxt>
                        </ServicesBtn>
                    </ServicesView>)}/>

                
                <BarberModal
                    show={showModal}
                    setShow={setShowModal}
                    service={selectedService}
                    value={selectedServiceValue}
                />

                   
        </Container>
    );
}

