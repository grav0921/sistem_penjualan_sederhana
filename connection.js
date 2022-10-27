const connect = require('mysql')

const db = connect.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'penjualan'
})

module.exports = db 