import React,{useContext,useEffect,useState} from 'react'
import {View, Text,ScrollView,Button} from 'react-native'
import Estilos from '../componentes/Estilos'
import CarritoContext from '../context/CarritoContext'
import UsuarioContext from '../context/UsuarioContext'
import Axios from '../componentes/axios'
var total=0;
const Factura = ({navigation}) => {
    const [carrito, setCarrito] = useState([])
    const {vaciarCarrito,carro} = useContext(CarritoContext)
    const {token,usuario} = useContext(UsuarioContext)

    useEffect(() => {
      
        setCarrito(carro)
         total=0;
        carro.map((item)=>{
            
            total = total + parseInt(item.precio)
          
        })
      
    }, [])


    const facturar=async()=>{
        

          await Axios.post('/facturas/guardar',{
            pedido:JSON.stringify(carro),
            subtotal:total,
            impuesto:(total*0.15),
            total:(total + ( total * 0.15 )),
            IdUsuario:usuario.id
        },{headers: {'Authorization': 'Bearer '+token}}).then((data)=>{console.log(JSON.stringify(data.data.datos))}).catch((err)=>{console.log(err)})
        vaciarCarrito()
        navigation.navigate('Tienda');
    }
    


  return (    

    <View style={Estilos.contenedorPrincipal}>
        <View style={Estilos.contenedorTitulo}>
        <Text style={Estilos.textoTitulo}>
          MotoRepuestos
        </Text>
        <Text style={Estilos.textoSubTitulo}>
          Factura 
        </Text>       
        

        </View>


        <View style={Estilos.contenedorContenido}>
        <ScrollView>
        <Text style={[Estilos.textoSubTitulo,{marginBottom:12}]}>Su Compra</Text>
        <View style={Estilos.espacio}></View>        
        
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={Estilos.textoSubTitulo}>{'Repuesto'}</Text>
             <Text style={Estilos.textoSubTitulo}>{'Precio'}</Text>
        </View>
            
        {
            
            carrito.map((item,idx)=>(
                
                <View key={idx} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={Estilos.etiquetas} >{item.nombre }</Text>
                <Text style={Estilos.etiquetas} >{item.precio}</Text>
              </View>
                 
                 
                 

                 ))
                 
       }
           <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',borderTopWidth:1.25}}>
            <Text style={Estilos.etiquetas}>Subtotal</Text>
             <Text style={Estilos.etiquetas}>{total}</Text>
             </View>

             <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={Estilos.etiquetas}>Isv(15%)</Text>
             <Text style={Estilos.etiquetas}>{(total*0.15).toFixed(2)}</Text>
             </View>

             <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={Estilos.etiquetas}>Descuento</Text>
             <Text style={Estilos.etiquetas}>0</Text>
             </View>

             <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',borderTopWidth:2}}>
            <Text style={Estilos.etiquetas}>Total</Text>
             <Text style={Estilos.etiquetas}>{(total+(total*0.15)).toFixed(2)}</Text>
             </View>


             <View style={Estilos.contenedorControles}>
               
               <Button 
               onPress={async()=>{

                  facturar()
               
                } }
                title="Confirmar Compra"
                color="darkcyan"/>

        </View>

        <View style={Estilos.contenedorControles}>
      <Button onPress={()=>{navigation.goBack()}} title='Regresar' color={'darkorange'}/>     
        
    </View>

        </ScrollView>
        </View>
    </View>
     
  )
}

export default Factura