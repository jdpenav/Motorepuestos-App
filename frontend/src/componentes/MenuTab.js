import React from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicio from '../pantallas/inicio';
import Login from '../pantallas/Login';
import Tienda from '../pantallas/tienda';
import PerfilUsuario from '../pantallas/PerfilUsuario'
import UsuarioContext from '../context/UsuarioContext';
import CarritoContext from '../context/CarritoContext';
import {Text} from 'react-native'


const Tab = createBottomTabNavigator();

const MenuTab = ()=>{
    const {setDatos,sesionIniciada} = React.useContext(UsuarioContext)
    const {setCarro} = React.useContext(CarritoContext)

    React.useEffect(() => {
      setDatos();      
      setCarro();
    }, [])
    
    
    return (
        (sesionIniciada)? 
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarIcon:()=>{},tabBarHideOnKeyboard: true,
                tabBarHideOnKeyboard:true,                
                tabBarActiveBackgroundColor:"orange",
                tabBarLabelStyle:{color:"darkcyan",fontSize:22,fontWeight:"bold"},
                tabBarStyle: {backgroundColor:'lightgray'},
                tabBarItemStyle:{color:'red'},
            }
            }
        >
            <>
                <Tab.Screen  name="Inicio" component={Inicio} />
                <Tab.Screen name="Tienda" component={Tienda} />              
                
                
            </>
        </Tab.Navigator>
         :
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarIcon:()=>{},
                tabBarHideOnKeyboard:true,
                tabBarActiveBackgroundColor:"orange",
                tabBarLabelStyle:{color:"darkcyan",fontSize:22,fontWeight:"bold"},
                tabBarStyle: {backgroundColor:'lightgray'},
                tabBarItemStyle:{color:'red'},
            }}
        >
            <>
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Inicio" component={Inicio} />                                
                
                
            </>
        </Tab.Navigator>
    );
};

export default MenuTab;