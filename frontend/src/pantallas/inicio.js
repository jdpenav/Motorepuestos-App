import {TouchableOpacity,FlatList,Image, ScrollView,StyleSheet, Alert,Text,View, Button ,ImageBackground,TextInput, InputAccessoryView } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import Estilos from '../componentes/Estilos';
import Axios from '../componentes/axios';
import { FlatGrid } from 'react-native-super-grid';
import SelectDropdown from 'react-native-select-dropdown'
import icon from '../../assets/Yz.jpg'
import UsuarioContext from '../context/UsuarioContext';
import NumericInput from 'react-native-numeric-input'

var us={
  nombre:'',
  imagen:'',
  user:'',
  correo:'',
  dni:''

}

const Inicio = ({navigation}) => {   

  const {usuario,token,sesionIniciada} = useContext(UsuarioContext)
  const [users, setUsers] = useState([])
  const [imagenn, setImagen] =useState('')
  const [mensaje, setMensaje] =useState('')
  const [titulo, setTitulo] =useState('')
  const [valoracion, setValoracion] =useState(0)
  const [comentarios, setComentarios] =useState([]) 
  const [cargaCometarios, setCargaComentarios] =useState(1) 
    

  useEffect( () => {
        
        if(sesionIniciada){          
          setImagen(usuario.imagen)
          Axios.get('/usuarios/buscarxd?id='+usuario.id)
          .then((data) =>{          
            setUsers(data.data.datos)            
           })
      }


      Axios.get("/comentarios/listar",{headers: {'Authorization': 'Bearer '+token}}
      ).then((data)=>
        setComentarios(data.data.datos)
        )
        


        
      
      } ,[sesionIniciada,usuario])

  

const getFecha=()=>{
  const today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var day = today.getDate();  
  const mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  return day+" de "+ mes[month] +" de "+year
}

const EnviarComentario = async ()=>{

  if(!titulo||!mensaje||valoracion=='0'){
    Alert.alert('AVISO','Complete El formulario')

  }else{


    await Axios.post("/comentarios/guardar",{
      titulo:titulo,
    mensaje:mensaje,
    valoracion:valoracion,
    UsuarioId:usuario.id
    }).then(
  
      (data)=>{ 
       Alert.alert("AVISO","Se Agrego El Comentario\n"+JSON.stringify(data.data.datos))
      }
  
    );
    
     await Axios.get("/comentarios/listar",{headers: {'Authorization': 'Bearer '+token}}
    ).then(data=>setComentarios(data.data.datos))
    
    setMensaje('')
    setTitulo('')  
  

  }

}

const EliminarComentario= async(id)=>{

  await Axios.delete('comentarios/eliminar?Id='+id,{headers: {'Authorization': 'Bearer '+token}}).then()
  
  await Axios.get("comentarios/listar",{headers: {'Authorization': 'Bearer '+token}}
  ).then(data=>setComentarios(data.data.datos))

}

const cargarMas =()=>
{
setCargaComentarios(cargaCometarios*2)

}
  
  return (
    
    <>
    
    <View style={[Estilos.contenedorPrincipal]}>
    <ScrollView>

    {(!sesionIniciada)?<></>:<TouchableOpacity style={{marginTop:12,justifyContent:'center',borderBottomWidth:2}} onPress={()=>{navigation.navigate('Perfil')}}>
    <View style={Estilos.espacio}></View>
    <View style={{display:'flex',flexDirection:'row',marginBottom:13}}>
    {(!imagenn)?<></>:<Image  source={{uri:"http://192.168.0.5:4005/api/img/usuarios/"+usuario.imagen}} resizeMode='cover' style={[{marginRight:'10%',height: 50,width:50}]}  />}
    <View>
    <Text  style={[Estilos.etiquetas,{fontWeight:'bold'}]}>{usuario.nombre}</Text>
    <Text  style={[{fontStyle:'italic',letterSpacing:10,textAlign:'center',fontSize:15,fontWeight:'bold',color:'orange'}]}>{usuario.login}</Text>

    </View>
    </View>
    </TouchableOpacity>}
    
    <View style={Estilos.contenedorTitulo}>           
    
          <Text style={Estilos.textoTitulo}>MotoRepuestos</Text>        
    <Text style={Estilos.textoSubTitulo}>Inicio</Text>
    </View> 
    <View style={Estilos.espacio}></View>
    
    <View style={[Estilos.contenedorContenido]}>


    
    
    <Text style={[Estilos.textoSubTitulo,{ textDecorationStyle:"dotted",textDecorationLine:'underline', fontStyle:'italic',textAlign:'center'}]}> Los Mejores Repuestos De La Zona</Text>
    <View style={Estilos.espacio}></View>
    

      <View style={{display:'flex',flexDirection:'row'}}>
      <View  style={[Estilos.itemContainer, { borderBottomWidth:8,marginBottom:12,flex:1, backgroundColor: 'silver',paddingHorizontal:0 }]}>
         <ImageBackground
           source={icon}
           resizeMode="cover"
           style={Estilos.imagenfondo}                      
           >
          
       </ImageBackground>
          <Text  
           onPress={() => {(!sesionIniciada)?
            Alert.alert('TIENDA', 'Inicia Sesion Para Empezar a Comprar', [{ text: 'Si', onPress: (() => { navigation.navigate('Login') }) }, { text: 'No' }])
            :navigation.navigate("Tienda")}}
            style={Estilos.itemName}>Conoce Nuestro Amplio Catalogo</Text>
          <Text  style={Estilos.itemCode}>{getFecha()}</Text>
        </View>
      </View>
            

            </View>
   
   <View style={Estilos.espacio}></View>
    
       {(!sesionIniciada)?(<></>) :( <>
      <Text style={[Estilos.etiquetas,{textAlign:"center"}]}> 👥Algunos Clientes👥 </Text>
     
     <FlatGrid
      itemDimension={126}
      data={users}
      style={Estilos.gridView}      
      spacing={8}
      renderItem={({ item,index }) => (          
        (index>=6)? <></>:( 
          (item.login!=usuario.login)?
          (
            
            <View  style={[Estilos.itemContainer, { paddingHorizontal:1,borderBottomWidth:8,backgroundColor: 'silver' }]}>
          <ImageBackground
            source={{uri:"http://192.168.0.5:4005/api/img/usuarios/"+item.imagen}}
            resizeMode="cover"
            style={[Estilos.imagenfondo,{height:62}]}                      
            >
           
        </ImageBackground>     
 
           <Text  
            onPress={() => {
              us.nombre=item.nombre;
              us.imagen=item.imagen;
              us.correo=item.correo;
              us.user=item.login; 
              us.dni=item.dni;
              navigation.navigate("Perfiles")}}            
              style={Estilos.itemName}>{item.nombre}</Text>
           <Text style={Estilos.itemCode}>{item.login}</Text>
         </View>

)

:
<></>
             ) )}
             
             />
             
        </>
             )
             
            }
                  <View style={{width:'90%'}}>

             <Text style={[Estilos.etiquetas,{textAlign:"center"}]}> 🗣️Comentarios🗣️ </Text>
             <View style={Estilos.espacio}></View>
            
             <TextInput onChangeText={(nm)=>{
               if(nm.length<20){
                 setTitulo(nm)
                }
              }} value={titulo} style={Estilos.entrada} placeholder=" Titulo"/>             
             <TextInput
             multiline={true}
             numberOfLines={3} 
             
             onChangeText={(nm)=>{
               if(nm.length<120){
                 setMensaje(nm)
                }
              }}
              value={mensaje}
              style={Estilos.entrada} 
              placeholder=" Deja Un Comentario"/>
             
             <Text style={{color:"white",fontSize:26}}>Valoracion</Text>
             <NumericInput 
             
             value={valoracion} 
             maxValue={10}
             minValue={0}
             
             onChange={(value) => {
               
               setValoracion(value)
              }
            }             
            totalWidth={140} 
            totalHeight={50}             
            step={1}            
            valueType='integer'
            rounded 
            textColor='orange' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='darkcyan' 
            leftButtonBackgroundColor='orange'/>
            <Text></Text>
            {(!sesionIniciada)?
            <Button onPress={()=>{Alert.alert("INFO",'Inicie Sesion para Enviar Comentarios',[{text:'Iniciar Sesion',onPress:navigation.navigate('Login') },{text:'No' }])}} color='darkcyan'  title='Enviar'/>
            : <Button onPress={EnviarComentario} color='darkcyan'  title='Enviar'/>}

             
                  </View>
                  <View style={Estilos.espacio}></View>
             
              {
                
                (comentarios)?
                <>
                     <FlatGrid
                     itemDimension={200}
                     data={comentarios}
                     style={Estilos.gridView}   
                     spacing={10}
                     renderItem={({ item,index }) => (                 
                       (index>=cargaCometarios)? <></>:( 
                         <>
                         <View  key={index} style={[Estilos.itemContainer, {height:300,display:'flex',justifyContent:'space-around', borderBottomWidth:8,marginBottom:5,backgroundColor: 'silver' }]}>
                          
                          <View style={{width:'100%'}}>

                          <Text style={[Estilos.itemName,{color:'orange',fontWeight:'bold',textAlign:'center',fontSize:30,letterSpacing:1}]}>{item.titulo}</Text>                          
                          <ScrollView>
                          <Text style={[Estilos.itemName,{textAlign:'justify',fontSize:25,fontWeight:'bold',letterSpacing:1}]}>{item.mensaje}</Text>      

                          </ScrollView>
                          </View>

                          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

                          <Text style={Estilos.itemName}>{item.Usuario.login}</Text>
                          <Text style={Estilos.itemName}>{item.valoracion}/10</Text>                          
                          <Text style={Estilos.itemName}>{item.createdAt.substring(0,10)}</Text>
                          {(!sesionIniciada)? <></>: (item.Usuario.login!=usuario.login)?<></>:<Text onPress={()=>{EliminarComentario(item.id)}} style={{color:'crimson',textAlign:'center',fontSize:25}}>❌</Text>}
                          </View>

                          
                          
                           
                    </View>
                        
                          {(index<cargaCometarios-1)?<></>: <><View style={Estilos.espacio}></View><Button onPress={cargarMas} color='darkcyan' title="Cargar Mas"/></>}                          
                          </>
                    )
                    )}  
                    
                    /> 
               </>





:<></>
}

            
</ScrollView>
            </View>


            
      
      </>

       
  )
}
export {us};
export default Inicio;   