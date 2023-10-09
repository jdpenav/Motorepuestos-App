import { Alert,ScrollView,StyleSheet, Text,View, Button ,ImageBackground,TextInput, InputAccessoryView } from 'react-native'
import React,{useState,useContext} from 'react'
import Estilos from '../componentes/Estilos';
import icon from "../../assets/Yz.jpg"
import Axios from '../componentes/axios';
import axios from 'axios';
import {BackHandler} from 'react-native';
import UsuarioContext from '../context/UsuarioContext';

const Recuperar = ({navigation}) => {
 
    const [user, setUser] = useState('')        
    const [clave, setClave] = useState('');    
    const [clave2, setClave2] = useState('');  
    const [verificado, setVerificado] = useState(false)    
    const [exito, setExito] = useState(false)
    const [pin,setPin] = useState('')
    const {setLogin} = React.useContext(UsuarioContext)

    const verifPin= async()=>{
          
        await Axios.post('/autenticacion/pin2?login='+user).then(
            
            (data)=>{
                if(data.data.datos=='Se Envio El Correo Con Exito!'){
                setExito(true)
                }else{
                Alert.alert("ERROR",data.data.datos[0].mensaje)
                }
                
            }

        )  

    }  

    const validPin= ()=>{
     if(pin.length==4){
          if(clave.length>8){

            if(clave2==clave){
            
                Axios.put("/autenticacion/recuperarcontrasena?usuario="+user,
                {
                    pin:pin,
                    contrasena:clave

                }).then()

            }else{
             alert('Las Contraseñas no coinciden')
            }
              
          }else{
              alert('La nueva Contraseña es muy corta')
          }

        }else{
            alert('Ingrese Un Pin Valido')
        }

    } 
 
    
  return (
    <View style={Estilos.contenedorPrincipal}>    

    <View style={Estilos.contenedorTitulo}>        
       
           <Text style={Estilos.textoTitulo}>MotoRepuestos</Text>
           <Text style={Estilos.textoSubTitulo}>Recuperar Contraseña</Text>
              

    </View>


    <View style={Estilos.contenedorContenido}>    
<ScrollView>
    
     <View style={Estilos.contenedorControles}>
     
      
      {
      
      (exito)?
      <>
      <Text style={Estilos.textoSubTitulo}>Se envio El Pin De recuperacion a su correo </Text>
      <View style={Estilos.espacio}></View>
      <TextInput onChangeText={newText => setPin(newText)} style={Estilos.entrada} placeholder='Valide El Pin'/>

      <View style={Estilos.contenedorControles}>
            
            <Text style={{fontSize:20,textAlign:'center'}}>Contraseña</Text>
           <TextInput secureTextEntry={true} onChangeText={nm=>setClave(nm)} style={[Estilos.entrada,{textAlign:'center'}]} />
           
           </View>
         
           <View style={Estilos.contenedorControles}>
                
               <Text style={{fontSize:20,textAlign:'center'}}>Verificar Contraseña</Text>
              <TextInput secureTextEntry={true} onChangeText={nm=>setClave2(nm)} style={[Estilos.entrada,{textAlign:'center'}]} />
              
              </View>
              <View style={Estilos.espacio}></View>

      <Button onPress={validPin} title='Establecer Nueva Contraseña' color={'orange'}/>

      
      </>
      :
      
      <>
      <Text style={{fontWeight:'bold',textAlign:"center",fontSize:23}} >INGRESE EL USUARIO PARA RECUPERAR LA CUENTA</Text>
      <TextInput onChangeText={newText => setUser(newText)} style={Estilos.entrada} placeholder='Usuario'/>      
      <View style={Estilos.espacio}></View>
      <Button onPress={verifPin} title='Verificar' color={'orange'}/></>

      } 

     </View>
     
     <View style={Estilos.espacio}></View>       
    
   
   

    </ScrollView>
    </View>
    

        </View>
  )
  
}

export default Recuperar;
