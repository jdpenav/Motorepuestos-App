import React, { useReducer } from "react"
import CarritoContext from "./CarritoContext"
import CarritoReducer from "./CarritoReducer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const CarritoState = (props) => {

    const inicialState = {
        carro: null 
    }

    const [estado, dispath] = useReducer(CarritoReducer, inicialState)

    const setCarro = async () => {

        const c = JSON.parse(await AsyncStorage.getItem('carrito'))       

         dispath({
            datos: {
                carro: c
            },
            acciones: 'ACTUALIZAR_CARRO',
        });

    }

    const setRepuesto = async (dat) => {
        
        const c= JSON.parse(await AsyncStorage.getItem('carrito'));                
             
        var carr
        
        if(c){
         carr =[...c , dat]
        }else{  
         carr =[dat]
        }
        
        const cr=JSON.stringify(carr)
        await AsyncStorage.setItem('carrito', cr);

        
        
        dispath({
            datos: {
                carro: carr
            },
            acciones: 'ACTUALIZAR_CARRO',
        });

    }

    const vaciarCarrito = async () => {

        await AsyncStorage.removeItem('carrito');

        dispath({
            datos: {
                carro: null,                
            },
            acciones: 'ACTUALIZAR_CARRO',
        });

    }   

    return (
        <CarritoContext.Provider value={{
            carro:estado.carro,
            setCarro,
            setRepuesto ,
            vaciarCarrito          
        }}>
            {props.children}
        </CarritoContext.Provider>
    )
}
export default CarritoState;
