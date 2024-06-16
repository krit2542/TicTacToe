const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TicTacToe',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});



app.post('/api/addResult', (req, res) => {
    const { result, moves } = req.body; 
    const query = 'INSERT INTO history (result, date, moves) VALUES (?, NOW(), ?)';
    db.query(query, [result, JSON.stringify(moves)], (err, result) => {
        if (err) throw err;
        res.sendStatus(201);
    });
});


app.get('/api/history', (req, res) => {
    const query = 'SELECT id, result, date FROM history ORDER BY date DESC';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.get('/api/history/:id', (req, res) => {
    const query = 'SELECT result, moves, date FROM history WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
