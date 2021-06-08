const fs = require('fs')
const path = require('path')
const host = 'localhost'
const PORT = 8000
const express = require('express')
const app = express()
const date = new Date().toLocaleDateString()

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})


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

app.post('/incomes', (req, res) => {
    let incomes = fs.readFileSync(path.join(__dirname, 'database', 'incomes.json'))
    incomes = JSON.parse(incomes.toString())
   const {source, income} =  req.body
   const newIncome = {
       id: incomes[incomes.length - 1].id + 1,
       source,
       income,
       date
   }
   incomes.push(newIncome)
   fs.writeFileSync(path.join(__dirname, 'database', 'incomes.json'), JSON.stringify(incomes, null, 4))
   res.status(201).json({message: "new income was added successfully"})

})

app.post('/incomes/delete/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'incomes.json'))
    data = JSON.parse(data.toString())
    const remainingIncome = data.filter(value => value.id != id)
    fs.writeFileSync(path.join(__dirname, 'database', 'incomes.json'), JSON.stringify(remainingIncome, null, 4))
    res.status(200).json({message: `the income ( id = ${id} ) was deleted sucessfully`})
})

app.get('/incomes/update/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'incomes.json'))
    data = JSON.parse(data.toString())
    const income = data.find(inc => inc.id == id)
    if(income) return res.json(income)
    else return res.status(404).end('NOT FOUND')
})

app.post('/incomes/update/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'incomes.json'))
    data = JSON.parse(data.toString())
    const {source, income} =  req.body
    const updatedIncome = { id: +id, source, income, date }
    const index = data.findIndex(ind => ind.id == id)
    data[index] = updatedIncome
    fs.writeFileSync(path.join(__dirname, 'database', 'incomes.json'), JSON.stringify(data, null, 4))
    res.status(201).json({message: "the income was updated successfully"})
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

app.post('/expenses', (req, res) => {
    let expenses = fs.readFileSync(path.join(__dirname, 'database', 'expenses.json'))
    expenses = JSON.parse(expenses.toString())
   const {source, cost} =  req.body
   const newIncome = {
       id: expenses[expenses.length - 1].id + 1,
       source,
       cost,
       date
   }
   expenses.push(newIncome)
   fs.writeFileSync(path.join(__dirname, 'database', 'expenses.json'), JSON.stringify(expenses, null, 4))
   res.status(201).json({message: "new expenses was added successfully"})

}) 

app.post('/expenses/delete/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'expenses.json'))
    data = JSON.parse(data.toString())
    const remainingExpenses = data.filter(value => value.id != id)
    fs.writeFileSync(path.join(__dirname, 'database', 'expenses.json'), JSON.stringify(remainingExpenses, null, 4))
    res.status(200).json({message: `the expense ( id = ${id} ) was deleted sucessfully`})
}) 

app.get('/expenses/update/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'expenses.json'))
    data = JSON.parse(data.toString())
    const expense = data.find(inc => inc.id == id)
    if(expense) return res.json(expense)
    else return res.status(404).end('NOT FOUND')
})

app.post('/expenses/update/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'expenses.json'))
    data = JSON.parse(data.toString())
    const {source, cost} =  req.body
    const updatedExpenses = { id: +id, source, cost, date }
    const index = data.findIndex(ind => ind.id == id)
    data[index] = updatedExpenses
    fs.writeFileSync(path.join(__dirname, 'database', 'expenses.json'), JSON.stringify(data, null, 4))
    res.status(201).json({message: "the expenses was updated successfully"})
})

app.listen(PORT, () => console.log('localhost is running on http://' + host + ':' + PORT)) 



