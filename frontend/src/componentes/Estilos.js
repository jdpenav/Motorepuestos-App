import { StyleSheet, Text, View } from 'react-native';

const Estilos = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        flexDirection: 'column',        
        alignItems: 'center', 
        backgroundColor: "gray",
    
    },
    contenedorTitulo: {        
        alignItems: 'stretch', 
        justifyContent: 'flex-end',
        width: '100%',
        height: 140,
        backgroundColor: "gray",
        borderBottomWidth:10,
        
      
    },
    contenedorContenido: {
        flex: 1, 
        flexDirection: 'column',        
        alignItems: 'stretch', 
        justifyContent: 'flex-start',
        width: '100%',        
        padding: 20,
        marginTop:40
    },
    textoTitulo: {
        color: '#000',
        fontSize: 46,
        fontWeight: 'bold', 
        textAlign: 'center',
        wordSpacing:22,
    },
    textoSubTitulo:{textAlign:'center',
    color:'orange',
    fontWeight:'bold',
    letterSpacing:4,
    fontSize:25
},
    imagenfondo: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 35,
    },
    imagenPerfil: {
        flex: 1,        
        alignItems: 'center',
        padding: 100,        
    }
    
    ,
    contenedorControles: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        marginBottom: 10,
    },
    entrada:{
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 10, 
        padding: 5,
        fontSize: 16, 
        //textAlign:'center',

        
    },
    etiquetas:{
        fontSize: 20,
        marginBottom: 5,
        fontSize:24,
        letterSpacing:3.2,
        fontWeigt:"bold"
        
    },
    boton: {        
        flex:1,
        alignItems: 'stretch', 
        marginLeft: 4, 
        marginRight: 4,

        
    },
    contenedorNav:{
        display:'flex',  
        flexDirection:'row',              
        justifyContent: 'flex-start',
        width: '95%',
        height: 55,
        
    },
    contenedorCatalogo:{
        display:'flex',  
        flexDirection:'row',              
        justifyContent: 'flex-start',
        width: '95%',
        height: 55,
        

    },
    imagenMediana:{
        width:80,
        height:80
    } ,
     gridView: {
         
      },
      itemContainer: {
       
        borderRadius: 15,
        padding: 12,
        height: 170,
      },
      itemName: {
        fontSize: 20,
        color: "darkcyan",
        fontWeigt: 'bold'        

    },
      itemCode: {
        fontWeight: '600',
        fontSize: 17,
        color: '#fff',
      },
      espacio:{
        width:'100%',
        height:30,
      },
      cartaUsuario:{
        backgroundColor:'silver',        
        
      }
    

});
export default Estilos;