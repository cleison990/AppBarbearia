import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  ScrollView,
  HeaderArea,
  HeaderTxt,
  AgendamentoView,
  AgendamentoService,
  AgendamentoValue,
  ButtonRemoveText,
  AgendamentoHour,
  PaymentMethod
} from './styles';
import { FlatList, Animated, Text, View, Alert } from 'react-native';
import { AuthContext } from '../../auth/AuthContext';
import firestore from '@react-native-firebase/firestore';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export default () => {


  const { user } = useContext(AuthContext); //constante que verifica qual o usuario está logado no sistema

  const [loading, setLoading] = useState(true);
  const [Agendamentos, setAgendamentos] = useState([]);



  //função que pega dados da coleção de Agendamentos do usuario logado 
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Agendamentos')
      .orderBy('CreatedAt', 'desc')
      .onSnapshot(querySnapshot => {
        const Agendamentos = [];

        querySnapshot.forEach(documentSnapshot => {
          Agendamentos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setAgendamentos(Agendamentos);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  async function handleRemove(item) {

    Alert.alert('', 'Deseja apagar esse agendamento? ', [
      {
        text: 'NÃO',
        style: 'cancel',
      },
      {
        text: 'SIM',
        onPress: async () => {
          try {
            await firestore()
              .collection('Users')
              .doc(user.uid)
              .collection('Agendamentos')
              .doc(`${item.dia}-${item.mes}-${item.ano}`)
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




  return (
    <Container>
      <HeaderArea>
        <HeaderTxt>Meus Agendamentos</HeaderTxt>
      </HeaderArea>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Agendamentos}
        renderItem={({ item }) => (
          <Swipeable
            overshootRight={false}
            renderRightActions={() => (
              <Animated.View
                style={{
                  justifyContent: 'center'
                }}
              >
                <View>
                  <RectButton
                    style={{
                      width: 100,
                      height: 85,
                      backgroundColor: 'rgba(0, 87, 255, 0.2)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      position: 'relative',
                      right: 15,
                      paddingLeft: 10,

                    }}
                    onPress={() => handleRemove(item)}
                  >
                    <ButtonRemoveText>
                      Apagar
                    </ButtonRemoveText>

                  </RectButton>
                </View>
              </Animated.View>
            )}

          >
            <AgendamentoView>
              <AgendamentoService>
                Data: {item.nome} {item.dia} de {item.mes} de {item.ano}
              </AgendamentoService>
              <AgendamentoHour>
                Horário: {item.hora}
              </AgendamentoHour>
              <AgendamentoValue>
                Serviço: {item.servico} R${item.valor}
              </AgendamentoValue>
              <PaymentMethod>
                Pagamento: {item.pagamento}
              </PaymentMethod>
            </AgendamentoView>
          </Swipeable>
        )}
      />
    </Container>
  );
}