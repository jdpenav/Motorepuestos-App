import { ScrollView, Text, View, Button, ImageBackground, TextInput, Alert, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Estilos from '../componentes/Estilos';
import * as ImagePicker from 'expo-image-picker';
import yz from '../../assets/Yz.jpg'
import UsuarioContext from '../context/UsuarioContext';
import Axios from '../componentes/axios';
import axios from 'axios';



const Login = ({ navigation }) => {

    const { token, usuario, setUsuario, setCerrarSesion } = useContext(UsuarioContext);
    
    const [nombre, setNombre] = useState(usuario.nombre);
    const [correo, setCorreo] = useState(usuario.correo);
    const [telefono, setTelefono] = useState(usuario.telefono);
    const [direccion, setDireccion] = useState(usuario.direccion);
    const [validarUsuario, setValidarUsuario] = useState(false);
    const [validarContrasena, setValidarContrasena] = useState(false);
    const [modificar, setModificar] = useState(false);

    const titulo = 'Perfil  De Usuario';
    const [imagen, setImagen] = useState(usuario.imagen)
    const [image, setImage] = useState('');

    const CerrarSesion = () => {

        Alert.alert("ADVERTENCIA", "Confirme Para Cerrar Sesion!", [{

            text: "Si", onPress: () => {

                setCerrarSesion();
                navigation.navigate('Inicio')

            }
        },
        {
            text: "NO"
        }
        ])

    }

    const EditarDatos = () => {

        Alert.alert("ADVERTENCIA", "Confirme Para Actualizar Sus Datos!", [{
            text: "Si", onPress: async () => {

                if (nombre.length >= 3) {
                    if (telefono.length == 8) {
                        if (image) {

                            var filename = image.split('/').pop();
                            var formData = new FormData();

                            formData.append("img", {
                                name: filename,
                                type: `image/jpeg`,
                                uri: image,

                            })

                            await axios.post('http://192.168.0.5:4005/api/usuarios/imagen?login=' + usuario.login, formData, {
                                headers: { 'Content-Type': 'multipart/form-data' },
                            }).then().catch((err) => { alert(err) })
                        }

                        await axios.put('http://192.168.0.5:4005/api/usuarios/editar?login=' + usuario.login,
                            {
                                nombre: nombre,
                                direccion: direccion,
                                telefono: telefono,
                            }, { headers: { 'Authorization': 'Bearer ' + token } }
                        ).then(() => { }).catch((err) => { alert(err) })

                        var u = null

                        if (!image) {
                            u = {
                                id: usuario.id,
                                nombre: nombre,
                                correo: usuario.correo,
                                login: usuario.login,
                                direccion: direccion,
                                imagen: usuario.imagen,
                                telefono: telefono,
                                dni: usuario.dni
                            }

                        }
                        else {
                            u = {
                                id: usuario.id,
                                nombre: nombre,
                                correo: usuario.correo,
                                login: usuario.login,
                                direccion: direccion,
                                imagen: image,
                                telefono: telefono,
                                dni: usuario.dni
                            }
                        }

                        setUsuario(u)
                        navigation.navigate('Inicio')
                    } else {
                        Alert.alert("ERROR", "El Telefono No Es valido")
                    }

                } else {
                    Alert.alert("ERROR", "El nombre Es Muy Corto")


                }


            }
        },
        {
            text: "NO"
        }
        ])

    }


    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });



        if (!result.canceled) {

            setImage(result.assets[0].uri);
        }


    }


    const eliminarCuenta = async () => {

        Alert.alert("ADVERTENCIA", "Confirme Para Eliminar Su Cuenta!", [{
            text: "Si", onPress: async () => {
                Axios.delete('/usuarios/eliminar?Id=' + usuario.id, { headers: { 'Authorization': 'Bearer ' + token } }).then((data) => { alert(JSON.stringify(data.data)) }).catch((err) => { console.log(err) })
                setCerrarSesion();
                navigation.navigate("Inicio")

            }

        }
            , {
            text: "No",
        }

        ])
    }


    return (
        <ScrollView>


            <View style={Estilos.contenedorTitulo}>
                <Text style={Estilos.textoTitulo}>{titulo}</Text>
                <Text style={Estilos.textoSubTitulo}>{usuario.login.toUpperCase()}</Text>
            </View>
            <View style={Estilos.espacio}></View>
            <View >
                <View style={{ height: 125 }}>

                    {(!image) ?
                        (!imagen) ? (<></>) : (
                            <Image

                                source={{ uri: "http://192.168.0.5:4005/api/img/usuarios/" + usuario.imagen }}
                                resizeMode="contain"
                                style={Estilos.imagenPerfil}

                            />)
                        :
                        <Image
                            source={{ uri: image }}
                            resizeMode="contain"
                            style={Estilos.imagenPerfil}

                        />
                    }
                </View>
                <View style={Estilos.espacio}></View>
                <View style={Estilos.espacio}></View>
                <View style={Estilos.espacio}></View>
                <Text onPress={() => pickImage()} style={{ fontSize: 25, marginLeft: "28%", heigth: 12, width: "45%", textAlign: 'center', color: 'orange', backgroundColor: 'black' }} >Editar Imagen</Text>
                <Text style={Estilos.textoSubTitulo}>{usuario.correo}</Text>
                <Text style={Estilos.textoSubTitulo}>{"DNI: " + usuario.dni}</Text>
                <View style={Estilos.espacio}></View>
            </View>

            <View style={Estilos.contenedorControles}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Nombre</Text>
                <TextInput onChangeText={

                    (nm) => {
                        if (nm.length < 25) {
                            setNombre(nm)
                        }

                    }


                } style={[Estilos.entrada, { textAlign: 'center' }]} value={nombre} />

            </View>


            <View style={Estilos.contenedorControles}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Telefono</Text>
                <TextInput onChangeText={

                    (nm) => {

                        if (nm.length < 9) {

                            setTelefono(nm.replace(/[^0-9]/g, ''))

                        }

                    }
                } style={[Estilos.entrada, { textAlign: 'center' }]} value={telefono} />

            </View>

            <View style={Estilos.contenedorControles}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Direccion</Text>
                <TextInput onChangeText={nm => setDireccion(nm)} style={[Estilos.entrada, { textAlign: 'center' }]} value={direccion} />

            </View>

            <View style={Estilos.contenedorControles}>
                <Button onPress={EditarDatos} title='Editar Datos' color={'darkcyan'} />

            </View>

            <View style={Estilos.contenedorControles}>
                <Button onPress={CerrarSesion} title='Cerrar Sesion' color={'orange'} />

            </View>

            <View style={Estilos.contenedorControles}>
                <Button onPress={eliminarCuenta} title='Eliminar Mi Cuenta' color={'crimson'} />

            </View>


        </ScrollView>

    )

};
const styles = StyleSheet.create({
    sombraControles: {
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    touch: {
        alignItems: "center",
        margin: 10,
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 30,
    },
    entradas: {
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
        fontSize: 20,
        fontWeight: "400",
        color: "#495057",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ced4da",
        borderRadius: 15,
    },
    imagen: {
        width: 180,
        height: 180,
        resizeMode: "contain",
        borderWidth: 3,
        borderColor: "#dedede",
        borderRadius: 90,
    },
    contenedorImagen: {
        alignItems: 'center'
    },
    texto: {
        color: "black",
        textDecorationColor: "yellow",
        textShadowColor: "red",
        textShadowRadius: 1,
        marginLeft: 10,
        marginRight: 10,
    }
});

export default Login;