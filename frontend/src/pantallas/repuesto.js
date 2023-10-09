import React from 'react'
import Estilos from '../componentes/Estilos'
import {
    View,
    Text,
    Image,
    Button,
    Alert,
    ScrollView
} from 'react-native'
import {cart} from './tienda'
import icon from '../../assets/default/defaultA.png'
import CarritoContext from '../context/CarritoContext'

const Repuesto = ({navigation}) => {
  const {setRepuesto} = React.useContext(CarritoContext)
  return (
    

    <View style={Estilos.contenedorPrincipal}>
        <View style={Estilos.contenedorTitulo}>
        <Text style={Estilos.textoTitulo}>Repuesto</Text>
        <Text style={Estilos.textoSubTitulo}>{cart.nombre}</Text>        
        </View>
        
        <View style={Estilos.contenedorContenido}>
       
        <Text style={Estilos.textoSubTitulo}>{cart.descripcion}</Text>  
        <Text></Text>

        <ScrollView style={{height:125}}>    
        
       
       <Image  
      
      source={{uri:"http://192.168.0.5:4005/api/img/articulos/"+cart.imagen}} 
      resizeMode="contain"
      style={[Estilos.imagenPerfil,{marginLeft:'5%'}]} 
      
      />
       <Text></Text>
       <Text style={Estilos.textoSubTitulo}>{"Codigo: "+cart.codigo}</Text>
       <Text></Text>
       <Text style={Estilos.textoSubTitulo}>{"Articulo: "+cart.nombre}</Text>
       <Text></Text>
       <Text style={Estilos.textoSubTitulo}>{"Precio: "+cart.precio + " Lps"}</Text>
 
        </ScrollView>
          
        
        </View>
        <View style={Estilos.contenedorControles}>
      <Button onPress={()=>{
        Alert.alert('TIENDA', 'Agregar al carrito', [{ text: 'Si', onPress: (() => { 
          
          setRepuesto(cart)          
          navigation.navigate("Tienda")
            
          }) }, { text: 'No' }])
        }} title='Agregar Al Carrito' color={'darkcyan'}/>     
        
    </View>

    <View style={Estilos.contenedorControles}>
      <Button onPress={()=>{navigation.goBack()}} title='Regresar' color={'darkorange'}/>     
        
    </View>

    </View>
  )
}

export default Repuesto