import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pantallas/Login';
import MenuTab from './MenuTab';
import Registro from '../pantallas/registro';
import Perfil from '../pantallas/perfil';
import PerfilUsuario from '../pantallas/PerfilUsuario';
import Carrito from '../pantallas/carrito';
import Repuesto from '../pantallas/repuesto';
import Factura from '../pantallas/factura';
import Reporte from '../pantallas/reporteFactura';
import FacturaDetalle from '../pantallas/facturaDetalle';
import Recuperar from '../pantallas/Recuperar';


const Stack = createNativeStackNavigator();

const Pantallas = () => {        
    
    

        return (
            
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>                
                        <Stack.Screen name="Menu" component={MenuTab} /> 
                        <Stack.Screen name="Registro" component={Registro} />
                        <Stack.Screen name="Perfiles" component={Perfil} />
                        <Stack.Screen name="Perfil" component={PerfilUsuario} />
                        <Stack.Screen name="Carrito" component={Carrito} />
                        <Stack.Screen name="Repuesto" component={Repuesto} />
                        <Stack.Screen name="Factura" component={Factura} />
                        <Stack.Screen name="Reporte" component={Reporte} />
                        <Stack.Screen name="FDetalle" component={FacturaDetalle} />
                        <Stack.Screen name="Recuperar" component={Recuperar} />
                
            </Stack.Navigator>       
            );

    

}
export default Pantallas;