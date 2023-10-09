exports.Inicio = (req,res)=>{

    const sigmar = {
        api:'Interfaz de programacion',
        sigmer:'Sistema De Gestion De MotoRepuestos',
        desarrollador:'Grupo #6',
        modulos:[
            {nombre:'Tipos',ruta:'/api/tipos'},            
        ]
    }
  
    res.json(sigmar);
     
}
