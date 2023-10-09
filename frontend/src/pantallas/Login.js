import { Alert,StyleSheet, Text,View, Button ,ImageBackground,TextInput, InputAccessoryView } from 'react-native'
import React,{useState,useContext} from 'react'
import Estilos from '../componentes/Estilos';
import icon from "../../assets/Yz.jpg"
import Axios from '../componentes/axios';
import {BackHandler} from 'react-native';
import UsuarioContext from '../context/UsuarioContext';

const Login = ({navigation}) => {
 
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')            
    const {setLogin} = React.useContext(UsuarioContext)
    const verifPass= ()=>{
   
        if(user.length>3){

             if(password.length>5){                                        
                  setLogin({usuario:user,contrasena:password})
                  
             }else{

               Alert.alert("Error","La contrasena debe contener al menos 5 caracteres")
             }

        }else{
            Alert.alert("Error","El usuario debe contener al menos 3 caracteres")
        }


    }  
    
  return (
    <View style={Estilos.contenedorPrincipal}>    

    <View style={Estilos.contenedorTitulo}>        
       
           <Text style={Estilos.textoTitulo}>MotoRepuestos</Text>
           <Text style={Estilos.textoSubTitulo}>INICIO DE SESION</Text>
              

    </View>

    <View style={Estilos.contenedorContenido}>    
    
     <View style={Estilos.contenedorControles}>
       
     <Text style={{fontWeight:'bold',textAlign:"center",fontSize:23}} >INGRESE SUS DATOS DE INICIO DE SESION</Text>
     <View style={Estilos.espacio}></View>
       <Text></Text>
      <TextInput onChangeText={newText => setUser(newText)} style={Estilos.entrada} placeholder='Usuario / Correo'/>

     </View>

     <View style={Estilos.contenedorControles}>
       
       
         
        <TextInput onChangeText={newText => setPassword(newText)}  style={Estilos.entrada} placeholder='Contraseña' secureTextEntry={true}/>
  
       </View>
       <View style={Estilos.espacio}></View>
       
    <View style={Estilos.contenedorControles}>
      <Button onPress={verifPass} title='Ingresar' color={'orange'}/>     
        
    </View>

    <View style={Estilos.contenedorControles}>
        
        <Button color="darkcyan" onPress={()=>navigation.navigate('Registro')} title='Registrarse'/>     
    </View>

    <View style={Estilos.contenedorControles}>
        
        <Button color="darkcyan" onPress={()=>navigation.navigate('Recuperar')} title='Recuperar Contraseña'/>     

    </View>

    </View>

    

        </View>
  )
  
}

export default Login;
