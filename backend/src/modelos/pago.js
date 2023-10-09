const {DataTypes} = require('sequelize');
const db = require('../configuraciones/db')
const pago = db.define(
'pago',    
{
    id:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
},

{
tablename:'Pagos'
}

);
module.exports = pago; 