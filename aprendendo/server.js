import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import ejs from 'ejs';
import mysql2 from 'mysql2';
import bodyParser from 'body-parser';

// Define __filename e __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para receber JSON

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

const db = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'atividadeprocessual',
    port: 3309
});

// Rota para cadastrar produto
app.post('/cadastrar', (req, res) => {
    const {nomeProd, PrecoCompra, Quantidade, Datacompra} = req.body;
    const sql = 'INSERT INTO usuarios(nomeProd, PrecoCompra, Quantidade, Datacompra) VALUES (?, ?, ?, ?)';
    db.query(sql, [nomeProd, PrecoCompra, Quantidade, Datacompra], (err, result) => {
        if (err) throw err;
        res.send("Produto cadastrado com sucesso!");
    });
});

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM usuarios ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
            return;
        }
        res.json(results);
    });
});

// Rota para deletar produto
app.delete('/deletar/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }
        res.json({ message: 'Produto deletado com sucesso!' });
    });
});

app.listen(3007, () => {
    console.log('http://localhost:3007');
});
