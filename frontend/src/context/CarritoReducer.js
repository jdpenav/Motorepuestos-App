export default (estado, accion) => {
    const { datos, acciones } = accion;
    switch (acciones) {

        case 'CARGAR_CARRO':
            return {
                ...estado,
                ...datos,
            };

        case 'ACTUALIZAR_CARRO':
            return {
                ...estado,
                carro:datos.carro
            };
        
        default:
            return estado;
    }
}