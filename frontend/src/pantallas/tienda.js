import {Image, Alert, StyleSheet, Text, View, Button, ImageBackground, TextInput, InputAccessoryView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Estilos from '../componentes/Estilos';
import Axios from '../componentes/axios';
import { FlatGrid } from 'react-native-super-grid';
import SelectDropdown from 'react-native-select-dropdown'
import { token } from './Login';
import {carx} from './carrito';
import UsuarioContext from '../context/UsuarioContext';
import CarritoContext from '../context/CarritoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

var cart ={
  nombre:"",
  precio:0,
  imagen:'',
  codigo:'',
  descripcion:''
}

const Tienda = ({navigation}) => {

  const { token ,sesionIniciada} = React.useContext(UsuarioContext)
  const {carro , setRepuesto} = React.useContext(CarritoContext) 
  const [items, setItems] = React.useState([])
  const [buscar, setBuscar] = React.useState('')
  const [carrito, setCarrito] = useState([])
  

const enviarRepuesto =(item)=>{  
                   
    const repuesto={
      nombre:item.nombre,
      codigo:item.codigo,
      precio:item.precio,
      imagen:item.imagen  
    } 
   
    setRepuesto(repuesto)
      
    


}

  const listarArticulos =async()=>{
    if (buscar == "") {

    await  Axios.get('articulos/listar', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(data => {
          const json = data.data       
          setItems(json.datos)
        })
    } else {
         await Axios.get('articulos/buscar?nombre=' + buscar, { headers: { 'Authorization': 'Bearer ' + token } })
        .then(data => {
          const json = data.data         
          setItems(json.datos)
        })}

  }

  useEffect(() => {    

   listarArticulos()
    
  }, [buscar])

 
  
  return (
    <View style={Estilos.contenedorPrincipal}>

      <View style={Estilos.contenedorTitulo}>

        <Text style={Estilos.textoTitulo}>MotoRepuestos</Text>
        <Text style={Estilos.textoSubTitulo}>Tienda</Text>

      </View>
      <View style={Estilos.espacio}></View>
      


      <View style={{ width: '90%'}}>
        <TextInput placeholder='Buscar Repuesto' onChangeText={(nm) =>{ 
          setBuscar(nm)
        }} style={Estilos.entrada} value={buscar} />       
      
       
      <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
        {(buscar.length<1)?<></>:<Text onPress={()=>{setBuscar('')}} style={{marginRight:15,marginTop:5,fontSize:28,color:'white'}}>❌</Text>  }
        <Text onPress={()=>{navigation.navigate('Carrito')}} style={{fontSize:33,color:'white'}}>🛒</Text>  
        <Text onPress={()=>{navigation.navigate('Reporte')}} style={{marginLeft:10,fontSize:35,color:'white'}}>📃</Text>    
      </View>
      </View>
      
      
      

      <View style={Estilos.espacio} ></View>

   { 
    (items.length==0)? <Text style={Estilos.textoSubTitulo}>No Hay Resultados Para Su Busqueda</Text> :
   
     <FlatGrid
     itemDimension={200}
     data={items}
     style={Estilos.gridView}     
     //fixed
     spacing={7}
     renderItem={({ item }) => (
       <View style={[Estilos.itemContainer, {borderBottomWidth:8, backgroundColor: '#34495e' }]}>
            
              <ImageBackground
              source={{ uri:"http://192.168.0.5:4005/api/img/articulos/"+ item.imagen }}
              resizeMode="cover"
              style={Estilos.imagenfondo}
              >

              </ImageBackground> 
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}> 
              
              <View style={{}}>
            <Text onPress={()=>{
              
              navigation.navigate('Repuesto')
              cart.nombre=item.nombre
              cart.precio=item.precio
              cart.imagen=item.imagen
              cart.codigo=item.codigo
              cart.descripcion=item.descripcion
              
            }} style={Estilos.itemName}>{item.nombre}</Text>
           
            <Text style={Estilos.itemCode}>{item.precio + ' Lps'}</Text>
            </View>
            <View style={{marginTop:8,width:"25%"}} >
            <Text onPress={ () => {
              
              
              Alert.alert('TIENDA', 'Agregar al carrito', [{ text: 'Si', onPress: () => { 
                
                
                
                
                enviarRepuesto(item);
                
                
                
                
              } }, { text: 'No' }])
              
            }} style={{fontWeight:'bold',fontSize:30, color: 'orange', textAlign: 'center', width: '65%', borderRadius: 12, borderWidth: 3 }}>+</Text>
               </View>
            </View>
          </View>
        )}
        />

    }

    </View>

  )
}
export {cart}
export default Tienda
