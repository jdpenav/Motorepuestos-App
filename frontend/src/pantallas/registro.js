import React,{useState}from 'react'
import { Image,ScrollView,View,Text,TextInput,Button, Alert} from 'react-native'
import Estilos from '../componentes/Estilos'
import Axios from '../componentes/axios'
import axios from "axios"
import * as ImagePicker from 'expo-image-picker';

var pr = ''
const Registro = ({navigation}) => {

    const [nombre,  setNombre] = useState('');    
    const [login, setLogin] = useState('');    
    const [correo, setCorreo] = useState('');    
    const [clave, setClave] = useState('');    
    const [clave2, setClave2] = useState('');  
    const [dni, setDni] = useState('');
    const [image, setImage] = useState('')


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          
          
          setImage(result.assets[0].uri);        
        
        }
                
        
         
        }


    const verifDatos= async ()=> {
        const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
          if(nombre.length>10) {

            if(dni.length==13) {

                if(login.length>6){
                if(emailCheck.test(correo) && correo.length>3) {


                    if(clave.length>6){

                        if(clave2==clave){
                            
                        await    Axios.post("usuarios/guardar", {
                                nombre:nombre,
                                clave:clave,
                                dni:dni,
                                login:login,
                                correo:correo,
                                imagen:image
                            })
                            .then((data) => {
                                pr = data.data;
                               
                            

                            }).catch(()=>Alert.alert("Error Al Ingresar El Usuario",pr))

                            var filename = image.split('/').pop();
                            var formData = new FormData();
                
                           formData.append("img" ,{
                           name: filename,
                           type: `image/jpeg`,
                           uri: image,
                             })
                
                
                          await axios.post('http://192.168.0.5:4005/api/usuarios/imagen?login='+login, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                     }).then(()=>{
                        Alert.alert('EXITO!','Se Agrego el usuario '+login)
                        navigation.navigate("Login")
                     }).catch((err)=>{alert(err)})
                            
                        }else{
                            Alert.alert('Error','La contraseñas no coinciden')
                        }
                        

                    }else{
                        Alert.alert('Error','La contraseña es muy corta')
                    }           
                }else{
                    Alert.alert('Error','Ingrese Un Correo Valido')
                }
                
            }else{
                Alert.alert('Error','El usuario es muy corto')
                }           

            }else{
                Alert.alert('Error','Ingrese Un Dni Valido')
            }
                

          }else{
            Alert.alert('Error','El Nombre Es muy Corto')
          }

          }

    

  return (
    <ScrollView>

    <View style={Estilos.contenedorPrincipal}>
        <View style={Estilos.contenedorTitulo}>



        <Text style={Estilos.textoTitulo}>
        MotoRepuestos

        </Text>

        <Text style={Estilos.textoSubTitulo}>

        Registro

        </Text>


        </View>
        <View style={Estilos.contenedorContenido}>
        <Text style={{fontSize:20,textAlign:'center'}}>Ingrese Sus Datos 🤑</Text>
        <View style={Estilos.espacio}></View>
        <View style={Estilos.contenedorControles}>

         <Text style={{fontSize:20,textAlign:'center'}}>Nombre Completo</Text>
        <TextInput onChangeText={nm=>setNombre(nm)} style={[Estilos.entrada,{textAlign:'center'}]} value={nombre}/>
        
        </View>

        <View style={Estilos.contenedorControles}>
            
         <Text style={{fontSize:20,textAlign:'center'}}>DNI</Text>
        <TextInput onChangeText={nm=>setDni(nm)} style={[Estilos.entrada,{textAlign:'center'}]} value={dni}/>
        
        </View>

        <View style={Estilos.contenedorControles}>
            
         <Text style={{fontSize:20,textAlign:'center'}}>Correo</Text>
        <TextInput onChangeText={nm=>setCorreo(nm)} style={[Estilos.entrada,{textAlign:'center'}]} value={correo}/>
        
        </View>

        <View style={Estilos.contenedorControles}>
            
         <Text style={{fontSize:20,textAlign:'center'}}>Usuario</Text>
        <TextInput onChangeText={nm=>setLogin(nm)} style={[Estilos.entrada,{textAlign:'center'}]} value={login}/>
        
        </View>

        <View style={Estilos.contenedorControles}>
            
         <Text style={{fontSize:20,textAlign:'center'}}>Contraseña</Text>
        <TextInput secureTextEntry={true} onChangeText={nm=>setClave(nm)} style={[Estilos.entrada,{textAlign:'center'}]} value={clave}/>
        
        </View>

        <View style={Estilos.contenedorControles}>
            
            <Text style={{fontSize:20,textAlign:'center'}}>Verificar Contraseña</Text>
           <TextInput secureTextEntry={true} onChangeText={nm=>setClave2(nm)} style={[Estilos.entrada,{textAlign:'center'}]} value={clave2}/>
           
           </View>
        <View style={Estilos.espacio}></View>
           <View style={{height:225}}>
           <Text onPress={()=>pickImage()} style={{fontSize:25,marginLeft:"28%",heigth:12,width:"45%",textAlign:'center' ,color:'black',borderColor:'orange',borderWidth:2,borderRadius:12}} >{(image)?"Editar Imagen de Perfil":"Elegir Imagen de Perfil"}</Text>
            <Text></Text>
            {(image)? <Image  
      
      source={{uri:image}} 
      resizeMode="contain"
      style={Estilos.imagenPerfil} 

      
      />:<></>}
      



      
           </View>
           <View style={Estilos.espacio}></View>
           <View style={Estilos.espacio}></View>
           
   <View style={Estilos.espacio}></View>
        <View style={Estilos.contenedorControles}>
         
       <Button onPress={()=>verifDatos()} title='Enviar Datos' color={'darkcyan'}/>     
        
    </View>
   

    <View style={Estilos.espacio}></View>
        <View style={Estilos.contenedorControles}>
         
       <Button onPress={()=>navigation.goBack()} title='Cancelar' color={'darkcyan'}/>     
        
    </View>

        </View>
        </View>
    </ScrollView>
  )
}

export default Registro