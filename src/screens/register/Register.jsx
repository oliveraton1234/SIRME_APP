
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
const logo = require('../../../assets/SIRMEsinfondo.png');
const backgrund = require('../../../assets/SIRMEfondo.png');
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../../firebase.config';
import { SERVER_HOST } from '../../../serverHost';
import axios from "axios";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); 
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation();

const handleSignUp = () => {
    const auth = getAuth(app);
    setEmail(email.toLowerCase().trim());
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            axios.post(`${SERVER_HOST}/api/auth/registerFirebase`, {
                email: user.email, 
                username: username ,
            }).then(response => {
                console.log('Usuario registrado en MongoDB:', response.data);
                navigation.navigate('Login');
            }).catch(error => {
                console.error('Error registrando usuario en MongoDB:', error);
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error de Firebase:', errorCode, errorMessage);
        });
};


    return (
        <SafeAreaView style={styles.container}>

            <Image source={backgrund} style={styles.backGround} />
            <View style={styles.logoContainer}>
                <Image source={logo} resizeMode="resize" style={{ width: '100%', height: 300 }} />
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.loginSlide}>
                    <View style={styles.loginSlideLeft}>
                        <Text style={styles.buttonTextSlide}>REGISTRO</Text>
                    </View>
                </View>
                

                <Text style={styles.title}>Registrarme</Text>

                <Text style={styles.text}>Nombre Completo</Text>
                <TextInput 
                    style={styles.input} 
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.text}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.text}>Contraseña</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        secureTextEntry={secureTextEntry}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                    >
                        <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="grey" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        width: '80%',
    },
    loginContainer: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 40,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0 },
        bottom: 0,
    },
    input: {
        height: 40,
        marginBottom: 7,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#b80f00',
        alignItems: 'center',
        borderRadius: 100,
        height: "12%",
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 22,
        textAlign: 'center',
    },
    registerContainer: {
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        textAlign: 'center',
        color: 'black',
    },
    text: {
        color: '#999999',
        fontWeight: '500',
        marginBottom: 5
    },
    backGround: {
        flex: 1,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    loginSlide: {
        width: "100%",
        height: "13%",
        backgroundColor: '#dbd0d0',
        borderRadius: 100,
        marginBottom: 10,
        marginTop: 10,
        position: 'relative',
    },
    loginSlideLeft: {
        backgroundColor: '#b80f00',
        right: 0, // Cambiado de 'right' a 'left'
        width: "55%",
        height: "100%",
        borderRadius: 100,
        justifyContent: 'center',
        position: 'absolute',
    },
    buttonTextSlide: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: '600',
        marginVertical: 15,
        textAlign: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerTextNormal: {
        textAlign: 'center',
        color: 'black',
    },
    registerTextHighlighted: {
        color: 'red',
    },
    inputPassword: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingRight: 50,
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: 8,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center', // Centra el ícono horizontalmente dentro del botón
        zIndex: 1, // Asegura que el botón esté sobre el input
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35,
        position: 'relative',
    },
    registerText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
    },
    registerLink: {
        color: 'red',
        fontWeight: 'bold',
    },

});


export default Register;