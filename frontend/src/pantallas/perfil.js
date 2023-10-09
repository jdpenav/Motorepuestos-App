import React from 'react'
import {Image,Button} from 'react-native'
import {us} from './inicio'
import {
    View,
    Text
} from 'react-native'
import Estilos from '../componentes/Estilos'

const Perfil = ({navigation}) => {
  return (
    <View style={[Estilos.contenedorPrincipal,{backgroundColor:'gray'}]}>
   
                        
    <View style={Estilos.contenedorTitulo}>
    <Text style={Estilos.textoTitulo} >PERFIL</Text>
    <Text style={Estilos.textoSubTitulo} >{us.nombre}</Text>
    
    </View>
        <View style={Estilos.contenedorContenido}>
          
    
        <View style={{height:125}}>    
          
      
      <Image  
      
       source={{uri:"http://192.168.0.5:4005/api/img/usuarios/"+ us.imagen}} 
       resizeMode="contain"
       style={Estilos.imagenPerfil}             
       
       />

    </View>
    
  <View style={Estilos.espacio}></View>
  <View style={Estilos.espacio}></View>
  <View style={Estilos.espacio}></View>
<View style={Estilos.contenedorControles}>


 <Text style={Estilos.textoSubTitulo} >{us.nombre}</Text>
<Text style={Estilos.textoSubTitulo} >{us.correo}</Text>
 <Text style={Estilos.textoSubTitulo} >{"DNI: "+us.dni}</Text>
</View>

</View>

<View style={Estilos.contenedorControles}>
      <Button onPress={e=>navigation.goBack()} title='Regresar' color={'orange'}/>     
        
    </View>

    </View>
  )
}

export default Perfil