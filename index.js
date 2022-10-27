//define import module
const express = require('express')
const app = express()
const database = require('./connection')

const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const flash = require('req-flash')
const { request } = require('http')
const db = require('./connection')

const response = require('./response')

app.use(bodyParser.json())

app.get('/login', (req, res) => {
    console.log({output : req.query})
    res.send('Login')
})

const querys = (selectTable, res) => {
  database.query(selectTable,(error, result) => {
  response (200, result, "show data from database",res)
  // response (200, error, "show data from database", res)
})
}

app.get('/', (req, res) => {
  querys ("select * from user", res)
  // console.log()
})

app.get('/find', (req, res) => {
  querys ("select username from user where email ="+req.query.email,res)
})

app.post('/post', (req, res) => {
    console.log({ Upadte: req.body })
    res.send('login berhasil')
})

app.put('/put', (req, res) => {
  console.log({put : req.body })
  res.send('update berhasil')
})

//port localhost
app.listen(2012, () => {
  console.log(`Server berjalan di localhost : ${2012}`)
})

