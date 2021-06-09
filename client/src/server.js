const express = require('express')
const fetch = require('node-fetch')
const path = require('path')
const app = express()
const host = 'localhost'
const PORT = 8080

app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/incomes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'incomes.html'))
})

app.get('/incomes/delete/:id', (req, res) => {
    let { id } = req.params
    fetch('http://localhost:8000/incomes/delete/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
    res.redirect('/incomes')
})

app.get('/expenses', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'expenses.html'))
})

app.get('/expenses/delete/:id', (req, res) => {
    let { id } = req.params
    fetch('http://localhost:8000/expenses/delete/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
    res.redirect('/expenses')
})

app.get('/total', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'total.html'))
})

app.listen(PORT, ()=>{console.log("Server is running on http://" + host + ":" + PORT)})


/*
res.redirect('/')
*/