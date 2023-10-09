import React,{useState} from 'react'
import {View,Text,ScrollView,Button} from 'react-native'
import Estilos from '../componentes/Estilos'
import { factura } from './reporteFactura'

const FacturaDetalle = ({navigation}) => {
  const [factu,setFactu] = useState([])


  React.useEffect(() => {    
    setFactu(factura.pedido)
    
  }, [])
  

  return (
    <View style={Estilos.contenedorPrincipal}>
    <View style={Estilos.contenedorTitulo}>
    <Text style={Estilos.textoTitulo}>MotoRepuestos</Text>
     <Text style={Estilos.textoSubTitulo}>{"Factura #"+factura.id}</Text>       
     </View>    
        
        <View style={Estilos.contenedorContenido}>


    <ScrollView>      
        <Text style={[Estilos.textoSubTitulo,{marginBottom:12}]}>Su Compra</Text>
        <Text style={Estilos.etiquetas}>Realizada En {factura.createdAt}</Text>
        <View style={Estilos.espacio}></View>        
        
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={Estilos.textoSubTitulo}>{'Repuesto'}</Text>
             <Text style={Estilos.textoSubTitulo}>{'Precio'}</Text>
        </View>
            
        {
            
            factu.map((item,idx)=>(
                
                <View key={idx} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={Estilos.etiquetas} >{item.nombre }</Text>
                <Text style={Estilos.etiquetas} >{item.precio}</Text>
              </View>
                 

                 ))
             
       }
           <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',borderTopWidth:1.25}}>
            <Text style={Estilos.etiquetas}>Subtotal</Text>
             <Text style={Estilos.etiquetas}>{factura.subtotal}</Text>
             </View>

             <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={Estilos.etiquetas}>Isv(15%)</Text>
             <Text style={Estilos.etiquetas}>{factura.impuesto}</Text>
             </View>

             <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={Estilos.etiquetas}>Descuento</Text>
             <Text style={Estilos.etiquetas}>0</Text>
             </View>

             <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',borderTopWidth:2}}>
            <Text style={Estilos.etiquetas}>Total</Text>
             <Text style={Estilos.etiquetas}> {factura.total}</Text>
             </View>

             
         <View style={Estilos.espacio}></View>
        <View style={Estilos.contenedorControles}>
      <Button onPress={()=>{navigation.goBack()}} title='Regresar' color={'darkorange'}/>     
        
    </View>

        </ScrollView>

    </View>
    </View>
  )
}

export default FacturaDetalle