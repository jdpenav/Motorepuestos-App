const usuario = require('./usuario')
const venta = require('./venta')
const ventaD = require('./ventaDetalle')
const articulo = require('./articulo')
const categoria = require('./categoria')
const ingreso = require('./ingreso')
const ingresoD = require('./ingresoDetalle')
const cliente = require('./cliente')
const proveedor = require('./proveedor')
const pago = require('./pago')
const pedido = require('./pedido')
const descproveedor = require("./descarteprove")
const descarteArt = require('./descarteArticulo')
const detallePed = require('./detallePedido')
const descarteCliente = require('./descarteCliente')
const descarteUsuario = require("./descarteArticulo")
const metodopago = require('./metodoPago')


exports.crearModelos= async()=>{
  ventaD.belongsTo(venta)  
  ventaD.belongsTo(ingresoD)  
  cliente.hasMany(venta)
  usuario.hasMany(venta)
  usuario.hasMany(ingreso)
  ingresoD.belongsTo(ingreso)
  ingresoD.belongsTo(articulo)    
  articulo.belongsTo(categoria) 
  ingreso.belongsTo(proveedor)
  //tarjetas.hasMany(cliente)
  cliente.belongsTo(pago)
  pago.belongsTo(metodopago)
  pago.belongsTo(pedido)
  detallePed.belongsTo(pedido)
  detallePed.belongsTo(articulo)
  proveedor.belongsTo(ingreso)

  
  await usuario.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo usuarios')
   }) 

   await cliente.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo clientes')
   }) 
   
   await articulo.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo articulo')
   }) 

   await descproveedor.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo descarte de proveedor')
   }) 
  
   await venta.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo venta')
   }) 

   await categoria.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo categoria')
   })  
   await proveedor.sync().then()
   
   .catch((error)=>{
    console.log('Error al crear el modelo proveedor')
   }) 
    
   await ingreso.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo ingreso')
   }) 

   await ingresoD.sync().then()
   .catch((error)=>{
    console.log('Error al crear el modelo ingresoD')
   })    

   await ventaD.sync()
   .then(()=>console.log('Modelo Creado Correctamente'))

   .catch((error)=>{
    console.log('Error al crear el modelo ventasD')
   }) 

   await pago.sync()
   .then(()=>console.log('Modelo Creado Correctamente'))

   .catch((error) => {
    console.log("Error al crear el Modelo de Pago")
   })
      await descarteArt.sync()
   .then(()=>console.log('Modelo metodo de descarte de articulos Creado Correctamente'))

   .catch((error)=>{
    console.log('Error al crear el modelo descarte de articulos')
   }) 

   await descarteUsuario.sync()
   .then(()=>console.log('Modelo metodo de descarte de usuarios Creado Correctamente'))

   .catch((error)=>{
    console.log('Error al crear el modelo descarte de articulos')
   }) 
 
   await detallePed.sync()
   .then(()=>console.log('Modelo metodo de detalle de pedidos Creado Correctamente'))

   .catch((error)=>{
    console.log('Error al crear el modelo detalle de pedidos')
   }) 

   await descarteCliente.sync()
   .then(()=>console.log('Modelo metodo de descarte de Clientes Creado Correctamente'))


   .catch((error)=>{
    console.log('Error al crear el modelo descarte de clientes')
   }) 

   await pedido.sync()
   .then(()=>console.log('Modelo Creado Correctamente'))

   .catch((error) => {
    console.log("Error al crear el Modelo de Pago")
   })

 
  
   
   
  
}


