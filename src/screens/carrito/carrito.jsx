import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cargarArticulos, agregarArticulo, eliminarArticulo } from '../../logic/Redux/reducers/articleReducer';
import { View, Text, Button, ScrollView, SafeAreaView } from 'react-native';
import { SERVER_HOST } from '../../../serverHost';
import axios from 'axios';

function Carrito() {
    const dispatch = useDispatch();
    const articulos = useSelector(state => state.articulo.articulos);
    const user = useSelector(state => state.auth.user)

    const handleAgregarArticulo = () => {
        const nuevoArticulo = { id: articulos.length + 1, nombre: 'Nuevo Artículo', precio: 100 };
        dispatch(agregarArticulo(nuevoArticulo));
    };

    const handleEliminarArticulo = (id) => {
        dispatch(eliminarArticulo(id));
    };

    useEffect(() => {
        console.log(user);
    });

    const handleRealizarPedido = async () => {
        try {
            const body = {
                nombre: user.username,
                correo: user.email, 
                articulos: articulos.map(articulo => articulo._id)
            };
            const response = await axios.post(`${SERVER_HOST}/api/pedidos/pedidos`, body);
            console.log('Pedido creado:', response.data);
            // Aquí podrías limpiar el carrito o manejar estados post-compra
        } catch (error) {
            console.error('Error al realizar el pedido:', error.message);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <Text className="text-2xl mt-10 font-semibold text-center">Carrito de Compras</Text>
            <View style={{ padding: 20 }}>
                {articulos.map(articulo => (
                    <View key={articulo._id} style={{ marginTop: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
                        <Text className=" text-lg font-semibold">{articulo.nombre_articulo} - ${articulo.precioUnitario}</Text>
                        <Text className=" ml-3 font-light mb-4">{ articulo.descripcion_articulo }</Text>
                        <Button title="Eliminar" onPress={() => handleEliminarArticulo(articulo._id)} />
                    </View>
                ))}
            </View>
            <View className="my-2">
                <Button color={"#198754"}  title="Realizar Pedido" onPress={handleRealizarPedido} />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

export default Carrito;
