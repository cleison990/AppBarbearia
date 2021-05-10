import React, { useEffect, useState } from 'react';
import {
    Container,
    HeaderArea,
    HeaderTxt,
    SuggestionsView,
    ButtonRemoveText,
    SuggestionsText

} from './styles';
import firestore from '@react-native-firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList, Animated, View, Alert } from 'react-native';





export default () => {


    const [Suggestions, setSuggestions] = useState([]);



    useEffect(() => {

        const subscriber = firestore()
            .collection('Suggestions')
            .orderBy('CreatedAt', 'desc')
            .onSnapshot(querySnapshot => {
                const Suggestions = [];

                querySnapshot.forEach(documentSnapshot => {
                    Suggestions.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setSuggestions(Suggestions);

            });
        return () => subscriber();
    }, []);


    async function handleRemove(item) {

        Alert.alert('', 'Deseja apagar essa sugestão? ', [
            {
                text: 'NÃO',
                style: 'cancel',
            },
            {
                text: 'SIM',
                onPress: async () => {
                    try {
                        await firestore()
                            .collection('Suggestions')
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
                <HeaderTxt>Sugestões</HeaderTxt>
            </HeaderArea>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={Suggestions}
                renderItem={({ item }) => (
                    <SuggestionsView>
                        <SuggestionsText>{item.message}</SuggestionsText>
                    </SuggestionsView>
                )}
            />

        </Container>
    );
}