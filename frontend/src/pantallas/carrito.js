import React,{
  useState,
  useContext,
  useEffect   
} from 'react'


import {View,
    Text,
    ImageBackground,
    ScrollView,
    Button,
    Alert
} from 'react-native'

import Estilos from '../componentes/Estilos'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../assets/default/defaultA.png'
import CarritoContext from '../context/CarritoContext';
import { FlatGrid } from 'react-native-super-grid';


const Carrito = ({navigation}) => {
    const [carrito, setCarrito] = useState([])  
    const {carro,vaciarCarrito} = useContext(CarritoContext)     

    useEffect(() => {
      
      setCarrito(carro)       

    }, [carro])
    


  return (
    <View style={Estilos.contenedorPrincipal}>
        <View style={Estilos.contenedorTitulo}>
        <Text style={Estilos.textoTitulo}>
            MotoRepuestos
        </Text>
        <Text style={Estilos.textoSubTitulo}>
            Carrito
        </Text>

        </View>
        
        <View style={Estilos.contenedorContenido}>
        

           <View>
            {
              (!carro)? <Text style={Estilos.textoSubTitulo}>Su Carrito Esta Vacio!</Text>: 
              
              <>
              {(carrito.length==1)?<Text style={{color:'orange',textAlign:"center",fontSize:18}}> {`${carrito.length} Repuesto en el Carrito`}</Text>:<Text style={{color:'orange',textAlign:"center",fontSize:18}}> {`${carrito.length} Repuestos en el Carrito`}</Text>}
                 <FlatGrid
      itemDimension={190}
      data={carrito}
      style={Estilos.gridView}      
      spacing={3}
      renderItem={({ item,index }) => (                 
        
        <View  style={[Estilos.itemContainer, { paddingHorizontal:0,borderBottomWidth:8,backgroundColor: 'silver' }]}>
          <ImageBackground
            source={{uri:"http://192.168.0.5:4005/api/img/articulos/"+item.imagen}}
            resizeMode="cover"
            style={[Estilos.imagenfondo,{height:62}]}                      
            >
          
        </ImageBackground>     
              <>
              <Text                      
              style={[Estilos.itemName,{textAlign:'center'}]}>{item.nombre}</Text>
            {(item.precio>750)? <Text style={[Estilos.itemCode,{textAlign:'center',color:'darkviolet'}]}>{item.precio}</Text> : <Text style={[Estilos.itemCode,{textAlign:'center',color:'green'}]}>{item.precio}</Text>
          }
          </>
            
         </View>
     
)}  

/>      
                </>
                
              }
           </View>
          
        </View> 
        <View style={Estilos.contenedorControles}>
               
             {(carrito!=null) ?<Button 
               onPress={()=>{
                    Alert.alert('AVISO','Confirme Para facturar!',[
                      {
                        text:'Si',
                        onPress:()=>{
                           
                          navigation.navigate('Factura')                           
                           
                           
                        }

                      },{
                        text:"No"
                      }
                    ]

                    )
                } }
                title="Facturar" />:<></>
              }
        </View>

        <View style={Estilos.contenedorControles}>
               
               <Button 
               onPress={async()=>{
                if(carrito!=null){
                 setCarrito([])
                 vaciarCarrito()
                }
                } }
                title="VACIAR"
                color="darkorange"/>

        </View>

</View>
  )
}


export default Carrito