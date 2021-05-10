import React, { useContext, useEffect, useState } from 'react';
import {
    Container,
    HeaderArea,
    HeaderTxt,
    AgendamentoView,
    AgendamentoService,
    AgendamentoValue,
    AgendamentoHour,
    UserName,
    UserEmail,
    UserPhone,
    ButtonRemoveText,
    PaymentMethod
} from './styles';
import { AuthContext } from '../../auth/AuthContext';
import firestore from '@react-native-firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList, Animated, View, Alert } from 'react-native';




export default () => {


    const { user } = useContext(AuthContext); //constante que verifica qual o usuario está logado no sistema

    const [Agendamentos, setAgendamentos] = useState([]);



    useEffect(() => {

        const subscriber = firestore()
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
                <HeaderTxt>Agendamentos</HeaderTxt>
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
                                            width: 140,
                                            height: 160,
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
                            <UserName>
                                Usuário: {item.nome}
                            </UserName>
                            <UserEmail>
                                Email: {item.email}
                            </UserEmail>
                            <UserPhone>
                                Telefone: {item.telefone}
                            </UserPhone>

                            <AgendamentoService>
                                Data:{item.dia} de {item.mes} de {item.ano}
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