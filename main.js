const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
// database lokal
// const db = require('./connection');
const { response } = require('express');
const { url } = require('inspector');
const app = express()
const fetch = require('node-fetch')

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'static')))

//router
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/login.html'))
})
app.get('/t', (req,res)=>{
    res.send('')
})
app.get('/home', (req, res) => {
    console.log(req.session.jenis)
    const url = require('url');
    if (req.session.jenis == 'admin'){
        app.get('/admin', (req,res) => {
            res.sendFile(path.join(__dirname+'/admin.html'))
        })
         res.redirect(url.format({
            pathname:'/admin',
            query:{
            "username":req.session.username
            }
        }));
        // res.render(__dirname+'/admin.html',{
        //     name: req.session.username
        // })
    }else if(req.session.jenis == 'staff'){
        app.get('/staff', (req,res) => {
            res.sendFile(path.join(__dirname+'/staff.html'))
        })
        res.redirect(url.format({
            pathname:'/staff',
            query:{
                "username":req.session.username
            }
        }));
    }else{
        res.send('Please log in to view this page')
    }
    res.end
})

//auth database lokal
// app.post('/auth', (req, res) => {
//     let username = req.body.username
//     let password = req.body.password
//     if(username && password){
//         db.query('SELECT * FROM user WHERE username = ? AND password = ?',
//         [username, password],(error, results, field) => {
//             if(error)throw error;
//             if(results.length > 0){
//                 //auth
//                 req.session.loggedin = true;
//                 req.session.username = username;
//                 req.session.jenis = results[0].jenis;
//                 //redirect
//                 res.redirect('./home')
//             }else{
//                 res.send("incorrect username & password")
//             }
//             res.end()
//         })
//     }else{
//         res.send('please enter username & password')
//         res.end
//     }        
// });

//auth 

// fetch('https://dummyjson.com/users')
// .then(res => res.json())
// .then(console.log);
            


app.post('/logout', (req,res) => {
    // Hapus sesi user dari broser
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        // Hapus cokie yang masih tertinggal
        res.clearCookie('secretname');
        console.log(res.clearCookie('secretname'))
        res.redirect('/');
    });
})

app.set("view engine", "ejs")
app.set("views", "views")

let get = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(console.log())
}

console.log(get('https://dummyjson.com/products'))


// GET data
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {
    // const dat = JSON.parse(JSON.stringify(data))
    app.get('/p',(req,res)=>{
        // dengan database lokal
        // db.query("SELECT * FROM user", (err, result)=>{
        //     const dbo = JSON.parse(JSON.stringify(result))
        //     // console.log(dbo)
        // })
        res.render("index",{datas : data.products, title:"nama"})
    })
    console.log()
});
// let i = 0;
// while(i<data.length){
//     console.log(i++);
// 

app.use(express.static("public"));
const port = 8020;
app.listen(port,() => {
    console.log(`Server berjalan di localhost : ${port}`)
});