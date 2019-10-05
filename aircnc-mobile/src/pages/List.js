//lib imports
import React, { useState, useEffect, useMemo } from 'react';
import socketio from 'socket.io-client';
import {
    //Views
    SafeAreaView,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    //funcionality
    AsyncStorage,
    Dimensions
} from 'react-native';
//local imports
import SpotList from '../components/SpotList';
import logo from '../assets/logo.png'

export default function List() {
    const [techs, setTechs] = useState([]);
    const [i, setI] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('id').then(user_id => {
            const socket = socketio('http://192.168.15.4:3000', {
                query: { user_id }
            });
            socket.on('booking_response', booking => alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'aceita' : 'rejeitada'}`))
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(el => {
            const techsArray = el.split(',').map(tech => tech.trim());

            setTechs(techsArray);//
        });
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <ScrollView style={styles.page} key={i}>
                <Image
                    style={styles.logo}
                    source={logo} />
                <TouchableOpacity style={styles.buttonReload} onPress={() => {setI(i+1)}}>
                    <Text style={styles.textButton}>Reload</Text>
                </TouchableOpacity>

                {techs.map(el => <SpotList key={el} tech={el} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
    buttonReload: {
        backgroundColor: '#f0f0f0',
        margin:5,
        width:100,
        borderRadius:5,
        alignSelf:'flex-end'
    },
    textButton:{
        textAlign:'center'
    }
});