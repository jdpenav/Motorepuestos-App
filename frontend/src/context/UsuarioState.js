import React, { useReducer } from "react"
import UsuarioContext from "./UsuarioContext"
import UsuarioReducer from "./UsuarioReducer"
import Axios from "../componentes/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const UsuarioState = (props) => {
    const inicialState = {
        usuario: null,
        token: null,
        errores: [],
        msj: "",
        sesionIniciada: false,
        tokenValidado: false
    }

    const [estado, dispath] = useReducer(UsuarioReducer, inicialState)


    const setDatos = async () => {
        var sesionIniciada = false;
        var tokenValidado = false;
        const t = (await AsyncStorage.getItem('toke_almacenado'));
        const u = JSON.parse(await AsyncStorage.getItem('usuario_almacenado'));
        if (t) {
            sesionIniciada = true;
            tokenValidado = true;
        }
        dispath({
            datos: {
                usuario: u,
                token: t,
                sesionIniciada: sesionIniciada,
                tokenValidado: tokenValidado
            },
            acciones: 'ACTUALIZAR_DATOS',
        });
    }

    const setCerrarSesion = async () => {
        await AsyncStorage.removeItem('toke_almacenado');
        await AsyncStorage.removeItem('usuario_almacenado');
        dispath({
            datos: {
                usuario: null,
                token: null,
                imagen: null,
                sesionIniciada: false,
                tokenValidado: false
            },
            acciones: 'ACTUALIZAR_DATOS',
        });
    }

    const setLogin = async (data) => {
        try {
            var textoMensaje = "";
            var usuario = null;
            var token = null;
            await Axios.post('/autenticacion/iniciosesion', {
                usuario: data.usuario,
                pass: data.contrasena
            })
                .then(async (data) => {
                    const json = data.data;

                    if (json.datos.token != undefined) {
                        usuario = json.datos.usuario;
                        token = json.datos.token;
                        imagen = json.datos.imagen;
                        telefono = json.datos.telefono;
                        dni = json.datos.dni;
                        direccion = json.datos.direccion;
                        id = json.datos.id

                        await AsyncStorage.setItem('toke_almacenado', String(token));
                        const u = JSON.stringify(usuario);
                        await AsyncStorage.setItem('usuario_almacenado', u);

                        textoMensaje = 'Bienvenido ' + usuario.nombre;
                        Alert.alert("Inicio de sesión", textoMensaje);
                        dispath({
                            datos: {
                                usuario: usuario,
                                token: token,
                                imagen: imagen,
                                telefono: telefono,
                                dni: dni,
                                direccion: direccion,
                                id: id
                            },
                            acciones: 'SET_LOGIN',
                        });
                    }
                    else {
                        Alert.alert("Error De Inicio de sesión", json.datos[0].mensaje, [{ text: "OK", onPress: () => console.log("OK Pressed") }])

                    }
                })
                .catch((error) => {
                    textoMensaje = error;
                });
        } catch (error) {
            textoMensaje = error;
            console.log(error);
            Alert.alert("Error De Inicio De Sesion", String(textoMensaje));
        }

    }

    const setUsuario = async (usuario) => {

        var u = JSON.stringify(usuario)

        await AsyncStorage.setItem("usuario_almacenado", u)

        u = JSON.parse(await AsyncStorage.getItem("usuario_almacenado"))
        dispath({
            datos: {
                usuario: u
            },
            acciones: 'ACTUALIZAR_USUARIO',
        });

    }


    return (
        <UsuarioContext.Provider value={{
            usuario: estado.usuario,
            token: estado.token,
            imagen: estado.imagen,
            msj: estado.msj,
            inicio: estado.inicio,
            sesionIniciada: estado.sesionIniciada,
            tokenValidado: estado.tokenValidado,
            id: estado.id,
            setLogin,
            setDatos,
            setCerrarSesion,
            setUsuario

        }}>
            {props.children}
        </UsuarioContext.Provider>
    )
}
export default UsuarioState;