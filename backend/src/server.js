const fs = require('fs')
const path = require('path')
const host = 'localhost'
const PORT = 8000
const express = require('express')
const app = express()
const date = new Date().toLocaleDateString()

app.use(express.json())


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

app.delete('/incomes/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'incomes.json'))
    data = JSON.parse(data.toString())
    const remainingIncome = data.filter(value => value.id != id)
    fs.writeFileSync(path.join(__dirname, 'database', 'incomes.json'), JSON.stringify(remainingIncome, null, 4))
    res.status(200).json({message: `the income ( id = ${id} ) was deleted sucessfully`})
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

app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params
    let data = fs.readFileSync(path.join(__dirname, 'database', 'expenses.json'))
    data = JSON.parse(data.toString())
    const remainingExpenses = data.filter(value => value.id != id)
    fs.writeFileSync(path.join(__dirname, 'database', 'expenses.json'), JSON.stringify(remainingExpenses, null, 4))
    res.status(200).json({message: `the expense ( id = ${id} ) was deleted sucessfully`})
})

app.listen(PORT, () => console.log('localhost is running on http://' + host + ':' + PORT)) 

// 
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

