//libs import
import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation';
import {
    // Views
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    // funcionality
} from 'react-native';
//local imports
import api from '../services/api';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', { params: { tech: tech.replace(/ /g, '') } });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function handleavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.spotList}>
            <Text style={styles.title}>
                Empresas que usam
                <Text style={styles.bold}> {tech}</Text>
            </Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: item.thumbnail_url.replace('localhost', '192.168.15.4') }}
                        />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}` : 'Gratuito'}</Text>
                        <TouchableOpacity onPress={() => handleavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    spotList: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold: {
        fontWeight: 'bold'
    },
    list: {
        paddingHorizontal: 20
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button: {
        flex: 1,
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 15

    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});


export default withNavigation(SpotList);