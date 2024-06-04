import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { articles } from "../../logic/mocks/articles";
const logo = require('../../../assets/SIRMEEdit.png');
import { Ionicons } from '@expo/vector-icons'; 
import { SERVER_HOST } from "../../../serverHost";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  
  const [data, setData] = useState(null);

  const articulos = async () => {
    try {
      const response = await axios.get(`${SERVER_HOST}/api/articulos/articulos`);
      
      if (response.data) {
        setData(response.data);
        return response.data;
      }
  } catch (error) {
      console.error("Error al obtener los articulos guardados:", error.message);
  }
  };

  useEffect(() => {
    articulos();
  }, []);

  const Item = ({ item }) => (
    <View className="justify-between m-2 p-3 items-center border-b border-gray-200">
      <Text className="text-lg font-semibold">{item.nombre_articulo}</Text>
      <Text className="text-sm">{item.descripcion_articulo}</Text>
      <Text className="text-lg font-semibold">${item.precioUnitario}</Text>
      <TouchableOpacity className="bg-blue-500 text-white p-2 rounded">
        <Text>Agregar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#71091e]">
      <View className=" flex-row justify-between items-center pt-7">
        <Image
          source={logo}
          resizeMode="center"
          style={{ height: 100, width: 100, left: 10}}
        />
        <TouchableOpacity
          className="mr-5">
          <Ionicons name="cart-outline" size={30} 
            color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-white">
        <Text className="text-xl font-semibold m-2">Selecciona tus artículos</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#71091e',

  },
  subContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Home;