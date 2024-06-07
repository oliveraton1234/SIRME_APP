import { createSlice } from '@reduxjs/toolkit';

export const articuloSlice = createSlice({
    name: 'articulo',
    initialState: {
        articulos: [],  // Este es el estado inicial, una lista vacía de artículos
    },
    reducers: {
        cargarArticulos: (state, action) => {
            state.articulos = action.payload;  // Carga un array de artículos
        },
        agregarArticulo: (state, action) => {
            state.articulos.push(action.payload);  // Agrega un nuevo artículo al estado
        },
        actualizarArticulo: (state, action) => {
            const index = state.articulos.findIndex(articulo => articulo.id === action.payload.id);
            if (index !== -1) {
                state.articulos[index] = action.payload;  // Actualiza el artículo por id
            }
        },
        eliminarArticulo: (state, action) => {
            state.articulos = state.articulos.filter(articulo => articulo._id.toString() !== action.payload.toString());  // Asegúrate de que los tipos de datos coincidan
        }        
    },
});

export const { cargarArticulos, agregarArticulo, actualizarArticulo, eliminarArticulo } = articuloSlice.actions;

export default articuloSlice.reducer;