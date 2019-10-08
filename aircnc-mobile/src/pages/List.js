//lib imports
import React, { useState, useEffect } from 'react';
import {
    //Views
    SafeAreaView,
    ScrollView,
    // Text,
    Image,
    StyleSheet,
    //funcionality
    AsyncStorage
} from 'react-native';
//local imports
import SpotList from '../components/SpotList';
import logo from '../assets/logo.png'

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(el => {
            const techsArray = el.split(',').map(tech => tech.trim());

            setTechs(techsArray);

            // alert('Bem-vindo');
        });
    }, [])

    return (
        <SafeAreaView style={styles.page}>
            <ScrollView style={styles.page}>
                <Image
                    style={styles.logo}
                    source={logo} />

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
    }
});