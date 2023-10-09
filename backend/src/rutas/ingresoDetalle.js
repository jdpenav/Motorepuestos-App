const { Router } = require('express'); 
const ctrIngreso = require('../controladores/ctrIngresoDetalle');
const {ValidarAutendicado} = require("../configuraciones/passport");
const ruta=Router();

ruta.get('/', ctrIngreso.Inicio);
ruta.get('/listar',ValidarAutendicado , ctrIngreso.listar);
ruta.post('/guardar',ValidarAutendicado , ctrIngreso.guardar);
ruta.put('/editar',ValidarAutendicado , ctrIngreso.editar);
ruta.delete('/eliminar', ctrIngreso.eliminar);
module.exports = ruta;