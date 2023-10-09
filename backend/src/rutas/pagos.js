const { Router } = require('express');
const ctrPago = require('../controladores/ctrPago');
const ruta = Router();
const {ValidarAutendicado} = require("../configuraciones/passport");

ruta.get('/',ValidarAutendicado, ctrPago.Inicio);
ruta.get('/listar',ValidarAutendicado, ctrPago.listar);
ruta.post('/guardar',ValidarAutendicado, ctrPago.guardar);
ruta.delete('/eliminar',ValidarAutendicado,ctrPago.eliminar);

module.exports = ruta;