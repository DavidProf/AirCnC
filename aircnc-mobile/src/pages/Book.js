import React, { useState } from 'react';
import {
    // views
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    // funcionality
    AsyncStorage,
} from 'react-native';
//local imports
import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('id');

        await api.post(`/spots/${id}/bookings`,{
            date
        }, {
            headers:{
                user_id
            }
        });

        Alert.alert('solicitação de reserva enviada');

        handleCancel();
    }

    function handleCancel(){
        navigation.navigate('List'); 
    }
    return (
        <SafeAreaView style={styles.page}>
            <Text style={styles.label}>Data de interesse *</Text>
            <TextInput
                value={date}
                onChangeText={setDate}
                style={styles.input}
                placeholder='qual data você quer reservar'
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={false}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.textButton}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button,styles.cancelButton]}>
                <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page:{
        margin:30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop:30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4

    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});