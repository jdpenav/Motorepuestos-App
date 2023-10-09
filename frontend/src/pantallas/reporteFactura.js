import React,{useEffect,useContext,useState}from 'react'
import Estilos from '../componentes/Estilos'
import {View,Text,Button, Alert} from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import Axios from '../componentes/axios'
import UsuarioContext from '../context/UsuarioContext'
var factura={
    id:'',
    pedido:null,
    impuesto:0,
    total:0,
    subtotal:0,
    createdAt:null,
}

const Reporte = ({navigation}) => {
    const [facturas, setFacturas] = useState([])
    const { usuario } = useContext(UsuarioContext)
    
    useEffect(() => {
             
        Axios.get("/facturas/listar?Id="+usuario.id).then((data)=>{
            
           
           setFacturas(data.data.datos)

        }).catch((err)=>{console.log(err)})
      
    }, [])
    
  
  return (
    <View style={Estilos.contenedorPrincipal}>
        <View style={Estilos.contenedorTitulo}>
            <Text style={Estilos.textoTitulo}>MotoRepuestos</Text>
            <Text style={Estilos.textoSubTitulo}>Reportes Facturas</Text>
        </View>

        <View style={Estilos.contenedorContenido}>
            
        {
   (!facturas)? <>
   <Text style={Estilos.textoSubTitulo}>No Hay facturas Aun</Text>
   </>:
            <FlatGrid
            itemDimension={190}
            data={facturas}
            style={Estilos.gridView}      
            spacing={3}
            renderItem={({ item,index }) => (                 
                
                <View  style={{           
                    borderRadius: 15,
                    padding: 12,
                    height: 140,
                    backgroundColor:'silver',
                    textAlignVertical:'center',
                    
                }}>
          
            <Text style={[Estilos.etiquetas,{color:'darkcyan',textAlign:'center'}]}>{"Factura #"+(index+1)}</Text>
            <Text onPress={()=>{
                factura.id=item.id
                factura.pedido= JSON.parse(item.pedido)
                factura.impuesto=item.impuesto
                factura.subtotal=item.subtotal
                factura.total=item.total                
                factura.createdAt=item.createdAt.substring(0, 10)
                navigation.navigate('FDetalle')
            }} style={[Estilos.etiquetas,{textAlign:'center'}]}>Ver Detalles</Text>
         </View>
     
     ) }  

/>     
 
}
            
 
        </View>
        <View style={Estilos.contenedorControles}>
      <Button onPress={()=>{navigation.goBack()}} title='Regresar' color={'darkorange'}/>     
        
    </View>
    </View>
  )
}
export {factura}
export default Reporte