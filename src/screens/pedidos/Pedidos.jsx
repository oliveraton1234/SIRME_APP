import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_HOST } from "../../../serverHost";
import { View, Text, FlatList, SafeAreaView, StyleSheet, RefreshControl } from 'react-native';

function Pedidos() {
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const pedidos = async () => {
        try {
            const response = await axios.get(`${SERVER_HOST}/api/pedidos/pedidos`);
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error al obtener los pedidos:", error.message);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        pedidos();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        pedidos();
    };

    const Item = ({ item }) => (
        <View style={styles.itemContainer}>
            <View className="mb-4">
                <Text>
                    <Text style={styles.boldText}>Nombre: </Text>
                    <Text style={styles.normalText}>{item.nombre}</Text>
                </Text>
                <Text>
                    <Text style={styles.boldText}>Correo: </Text>
                    <Text style={styles.normalText}>{item.correo}</Text>
                </Text>
            </View>

            <View className="ml-4">
                {item.articulos.map(articulo => (
                    <View key={articulo._id} style={styles.articuloDetail}>
                        <Text style={styles.articuloName}>{articulo.nombre_articulo}</Text>
                        <Text>${articulo.precioUnitario}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text className="text-2xl mt-10 font-semibold text-center mb-5">Pedidos</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item._id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay pedidos disponibles.</Text>}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nonBoldText: {
        fontSize: 18,
        fontWeight: 'normal', // Esto asegura que el texto no esté en negrita
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    normalText: {
        fontWeight: 'normal',
        fontSize: 18,
    },
    itemText: {
        fontSize: 18, // Ajusta el tamaño de la fuente según necesites
        fontWeight: 'normal', // Esto asegura que el texto no esté en negrita
    },
    articuloDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    articuloName: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    }
});

export default Pedidos;