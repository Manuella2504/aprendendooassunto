const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join (__dirname, 'public')));
//junte tudo no meu diretório "dirname" em uma pasta chamada public
app.get('/', (req, res) => {
    res.sendFile(path.join (process.cwd() + 'index.html'))
});

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'',
    database: 'crud',
    port: 3309
});
//conexão com  base de dados

app.post('/cadastrar', (req, res) => {

const {nome, email, telefone} = req.body;
    //tem que está o msm nome do html

    const sql = 'INSERT INTO usuarios(nome, email, telefone) VALUES(?, ?, ?)';
    //dentro d atabela usuarios eu tenho tres campos
//PRECISAM ESTÁ NA ORDEM QUE FORAM INFORMADAS DENTRO DA MINHA STRING
db.query(sql, [nome, email, telefone] , (err, result) =>{
if (err) throw err;
//caso haja um erro, ele será mostrado
res.send("Usuário encontrado com sucesso!");
});
});

app.listen( 3007, () =>{
    console.log('http://localhost:3007');
})

