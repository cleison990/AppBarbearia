import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import ExpandIcon from '../assets/expandIcon.svg';
import NextIcon from '../assets/next.svg';
import PrevIcon from '../assets/prev.svg';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../auth/AuthContext';
import { Alert, FlatList } from 'react-native';


const Modal = styled.Modal`
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;
const ModalBody = styled.View`
    background-color: #60B2FE;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 40px 20px;
`;

const CloseBtn = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalItem = styled.View`
    background-color: rgba(0, 87, 255, 0.8);
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;

`;

const ServicesInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ServiceName = styled.Text`
    color: #FFF;
    font-size: 20px;
    
`;

const ServiceValue = styled.Text`
    color: #FFF;
    font-size: 20px;
    
`;

const FinishBtn = styled.TouchableOpacity`
    background-color: rgba(0, 87, 255, 0.6);
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
    align-items: center;


`;

const FinishBtnTxt = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

const DateInfo = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const DatePrev = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-end;
    justify-content: flex-end;
`;

const DateNext = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;

`;

const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

const DateTitle = styled.Text`
    color: #FFF;
    font-size: 15px;
`;

const DateList = styled.ScrollView`

`;

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const DateItemWeek = styled.Text`
    color: #FFF;
    font-size: 15px;
`;

const DateItemNumber = styled.Text`
    color: #FFF;
    font-size: 15px;
`;

const TimeList = styled.View``;

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-right: 5px;
`;

const TimeItemTxt = styled.Text`
    font-size: 16px;
    color: #FFF;
`;

const PaymentTitle = styled.Text`
    font-size: 16px;
    color: #FFF;
    padding: 5px;
    text-align: center;
`;

const PaymentMethods = styled.View`
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-right: 5px;

`;

const PaymentItemText = styled.Text`
    font-size: 16px;
    color: #FFF;
`;

const PaymentItem = styled.TouchableOpacity`
    width: 100px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-right: 5px;


`;

const month = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];



export default ({ show, setShow, service, value }) => {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);
    const [PaymentMethodsList, setPaymentMethodsList] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);


    useEffect(() => {
        let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        let newListDays = [];

        for (let i = 1; i <= daysInMonth; i++) {
            let d = new Date(selectedYear, selectedMonth, i);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? '0' + month : month;
            day = day <= 10 ? '0' + day : day;
            let selDate = `${year}-${month}-${day}`;



            newListDays.push({
                status: true,
                weekDay: days[d.getDay()],
                number: i,
            });
        }

        setListDays(newListDays);
        setSelectedDay(0);
        setSelectedHour(0);

    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        if (selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? '0' + month : month;
            day = day <= 10 ? '0' + day : day;
            let selDate = `${year}-${month}-${day}`;

        }
    }, [selectedDay])

    useEffect(() => {
        const subscriber = firestore()
            .collection('horarios')
            .onSnapshot(querySnapshot => {
                const listHours = [];

                querySnapshot.forEach(documentSnapshot => {
                    listHours.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });


                setListHours(listHours);

            });
        return () => subscriber();
    }, []);

    useEffect(() => {
        const subscribe = firestore()
            .collection('PaymentMethods')
            .onSnapshot(querySnapshot => {
                const PaymentMethodsList = [];

                querySnapshot.forEach(documentSnapshot => {
                    PaymentMethodsList.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });


                setPaymentMethodsList(PaymentMethodsList);

            });
        return () => subscribe();
    }, []);

    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
        setSelectedDay(today.getHours());

    }, [])



    const handleCloseBtn = () => {
        setShow(false);
    }

    const DatePrevClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const DateNextClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const [userData, setUserData] = useState();
    const getUser = async () => {
        await firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    }

    useEffect(() => {
        getUser();
    }, [])


    const handleFinishBtn = () => {
        if (selectedDay > 0) {
            firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Agendamentos')
                .doc(`${selectedDay}-${month[selectedMonth]}-${selectedYear}`)
                .set({
                    CreatedAt: firestore.Timestamp.fromDate(new Date()),
                    servico: service,
                    valor: value,
                    dia: selectedDay,
                    mes: month[selectedMonth],
                    ano: selectedYear,
                    hora: selectedHour,
                    pagamento: selectedPaymentMethod
                })
                .then(() => {

                });

            firestore()
                .collection('Agendamentos')
                .doc(`${selectedDay}-${month[selectedMonth]}-${selectedYear}`)
                .set({
                    CreatedAt: firestore.Timestamp.fromDate(new Date()),
                    nome: userData ? userData.name : 'Username',
                    email: userData ? userData.email : 'UserEmail',
                    telefone: userData ? userData.telefone : 'UserTelefone',
                    servico: service,
                    valor: value,
                    dia: selectedDay,
                    mes: month[selectedMonth],
                    ano: selectedYear,
                    hora: selectedHour,
                    pagamento: selectedPaymentMethod
                })
                .then(() => {
                    Alert.alert('', 'Agendamento feito!');
                    navigation.navigate('MyApointments')


                });
        } else {
            console.log('erro')
        }

    }


    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseBtn onPress={handleCloseBtn}>
                        <ExpandIcon width="25" height="25" fill="#FFF" />
                    </CloseBtn>
                    {service != null &&
                        <ModalItem>
                            <ServicesInfo>
                                <ServiceName>{service}</ServiceName>
                                <ServiceValue>R${value}</ServiceValue>
                            </ServicesInfo>
                        </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrev onPress={DatePrevClick}>
                                <PrevIcon width="20" height="20" fill="#FFF" />
                            </DatePrev>
                            <DateTitleArea>
                                <DateTitle>{month[selectedMonth]} {selectedYear}</DateTitle>
                            </DateTitleArea>
                            <DateNext onPress={DateNextClick}>
                                <NextIcon width="20" height="20" fill="#FFF" />
                            </DateNext>
                        </DateInfo>
                        <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                listDays.map((item, key) => (
                                    <DateItem
                                        key={key}
                                        onPress={() => setSelectedDay(item.number)}
                                        style={{
                                            backgroundColor: item.number === selectedDay ? "#60B2FE" : "rgba(0, 87, 255, 0.1)"
                                        }}
                                    >
                                        <DateItemWeek>{item.weekDay}</DateItemWeek>
                                        <DateItemNumber>{item.number}</DateItemNumber>
                                    </DateItem>
                                ))
                            }
                        </DateList>
                    </ModalItem>

                    <ModalItem>


                        <TimeList horizontal={true} showsHorizontalScrollIndicator={false}>
                            <FlatList
                                data={listHours}
                                renderItem={({ item }) => (
                                    <TimeItem

                                        onPress={() => setSelectedHour(item.hora)}
                                        style={{
                                            backgroundColor: item.hora === selectedHour ? "#60B2FE" : "rgba(0, 87, 255, 0.1)"
                                        }}
                                    >
                                        <TimeItemTxt>{item.hora}</TimeItemTxt>

                                    </TimeItem>
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />


                        </TimeList>

                    </ModalItem>
                    <ModalItem>
                        <PaymentTitle>
                            Selecionar Forma de Pagamento
                        </PaymentTitle>
                        <PaymentMethods>
                            <FlatList
                                data={PaymentMethodsList}
                                renderItem={({ item }) => (
                                    <PaymentItem

                                        onPress={() => setSelectedPaymentMethod(item.paymentmethod)}
                                        style={{
                                            backgroundColor: item.paymentmethod === selectedPaymentMethod ? "#60B2FE" : "rgba(0, 87, 255, 0.1)"
                                        }}
                                    >
                                        <PaymentItemText>{item.paymentmethod}</PaymentItemText>

                                    </PaymentItem>
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </PaymentMethods>
                    </ModalItem>



                    <FinishBtn onPress={handleFinishBtn}>
                        <FinishBtnTxt>
                            Finalizar Agendamento
                        </FinishBtnTxt>
                    </FinishBtn>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}

