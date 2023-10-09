const pago = require('../modelos/pago')
const { validationResult } = require('express-validator')
const { MSJ, exito } = require('../componentes/mensaje')

exports.Inicio = (req, res) => {
    const moduloPago = {
        modulo: '/api/pagos',
        descripcion: 'Contiene Datos generados acerca del id de pago y id metodo de pago',
        rutas: [
            {
                ruta: '/api/pagos/listar',
                descripcion: 'Lista los identificadores de pago',
                metodo: 'GET',
                parametros: 'ninguno'
            }, {
                ruta: '/api/pagos/guardar',
                descripcion: 'guarda los datos de pagos',
                metodo: 'POST',
                parametros: 'ninguno'

            },
            {
                ruta: '/api/pagos/eliminar',
                descripcion: 'Elimina los datos de un pago',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }

        ]
    }
    MSJ(exito, moduloPago, res)

}

exports.listar = async (req, res) => {
    const listarPagos = await pago.findAll()
    MSJ(exito, listarPagos, res)
}

exports.guardar = async (req, res) => {
    const validacion = validationResult(req)

    if (!validacion.isEmpty()) {
        MSJ(exito, validacion, res)
    } else {
        const { idGestionPago, idPedido } = req.body;

        if (!idGestionPago || !idPedido) {

            const er = {
                msj: 'Debe Debe enviar los datos obligatorios',
                parametros: 'idGestionPago, idPedido'
            }

            MSJ(exito, er, res)

        } else {

            await pago.create({
                idGestionPago: idGestionPago,
                idPedido: idPedido,
            })
                .then((data) => {

                    MSJ(exito, data, res)

                }).catch((error) => {

                    var lerr = ''
                    error.errors.map((el) => {
                        lerr += (el.message + '. ')
                    })

                    MSJ(exito, lerr, res)
                })
        }
    }
}

exports.eliminar = async (req, res) => {
    const { Id } = req.query;


    if (!Id) {
        res.send('Debe Escribir el Id');
    } else {
        var buscarPago = await pago.findOne({
            where: {
                id: Id
            }
        })

        if (!buscarPago) {

            MSJ(exito, 'El Id No existe', res)
        } else {
            await buscarPago.destroy({ where: Id })
                .then((data) => {
                    MSJ(exito, 'Se Elimino el registro', res)
                })
                .catch((er) => {

                    MSJ(exito, 'Error al eliminar Registro', res)
                })
        }


    }
}
