import { View } from 'react-native'
import React from 'react'
import Inicio from './src/pantallas/inicio'
import Login from './src/pantallas/Login'
import UsuarioState from './src/context/UsuarioState'
import Tienda from './src/pantallas/tienda'
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/componentes/MenuTab'
import Pantallas from './src/componentes/Pantallas'
import CarritoState from './src/context/CarritoState'
const App = () => {
  return (
    <NavigationContainer>


      <UsuarioState>
        <CarritoState>
          <Pantallas>
            <Menu>
            </Menu>
          </Pantallas>
        </CarritoState>

      </UsuarioState>


    </NavigationContainer>
  )
}

export default App