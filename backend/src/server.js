const fs = require('fs')
const path = require('path')
const host = 'localhost'
const PORT = 8000
const express = require('express')
const app = express()

app.get('/incomes', (req, res) => {
    fs.readFile(path.join(__dirname, 'database', 'incomes.json'), (err, data) =>{
        if(err) throw err
        res.json(JSON.parse(data.toString()))
    })
})

app.get('/incomes/:id', (req, res) => {
   const { id } = req.params
   let data = fs.readFileSync(path.join(__dirname, 'database', 'incomes.json'))
   data = JSON.parse(data.toString())
   const income = data.find(inc => inc.id == id)
   if(income) return res.json(income)
   else return res.status(404).end('NOT FOUND')
})

app.get('/expenses', (req, res) => {
    fs.readFile(path.join(__dirname, 'database', 'expenses.json'), (err, data) =>{
        if(err) throw err
        res.json(JSON.parse(data.toString()))
    }) 
})

app.get('/expenses/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'expenses.json'))
    data = JSON.parse(data.toString())
    const expenses = data.find(inc => inc.id == id)
    if(expenses) return res.json(expenses)
    else return res.status(404).end('NOT FOUND')
 })

app.get('/budget', (req, res) => res.send('budget'))

app.listen(PORT, () => console.log('localhost is running on http://' + host + ':' + PORT)) 

// const date = new Date().toLocaleDateString()
// const incomes = [
//     {id: 1, source: 'Job', income: 400, date},
//     {id: 2, source: 'Business', income: 600, date},
//     {id: 3, source: 'Investments', income: 300, date},
//     {id: 4, source: 'Ranting business', income: 200, date},
//     {id: 5, source: 'Youtube', income: 100, date},
// ]

// fs.writeFile(path.join(__dirname, 'database', 'incomes.json'), JSON.stringify(incomes, null, 4), () => {} )

// const expenses = [
//     {id: 1, source: 'Food', income: 100, date},
//     {id: 2, source: 'Car insurance', income: 100, date},
//     {id: 3, source: 'Utility bills', income: 200, date},
//     {id: 4, source: 'Investments', income: 200, date},
//     {id: 5, source: 'Charity', income: 50, date},
// ]

// fs.writeFile(path.join(__dirname, 'database', 'expenses.json'), JSON.stringify(expenses, null, 4), () => {} )

