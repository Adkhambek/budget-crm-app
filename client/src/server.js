const express = require('express')
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

app.get('/expenses', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'expenses.html'))
})

app.get('/total', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'total.html'))
})

app.listen(PORT, ()=>{console.log("Server is running on http://" + host + ":" + PORT)})