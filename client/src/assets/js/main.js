const tbodyforIncome = document.querySelector('.income')
const tbodyforExpense = document.querySelector('.expense')
const pForBudget = document.querySelector('#totalbudget')
const pForIncome = document.querySelector('#totalincomes')
const pForExpense = document.querySelector('#totalexpenses')
const serverUrl = 'http://localhost:8000'

async function request(endPoint, method, body){
    const response = await fetch(serverUrl + endPoint, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const parseDate = await response.json()
    return parseDate
}

async function incomesRender(){
    const incomes = await request('/incomes', 'GET')
    let number = 0
    for (const income of incomes) {
        const trElementForIncome = document.createElement('tr')
        trElementForIncome.innerHTML = `<td>${++number}</td>
        <td>${income.source}</td>
        <td>${income.income}</td>
        <td>${income.date}</td>
        <td>
            <a href="/incomes/delete/${income.id}" class="btn btn-danger">
                <i class="fas fa-trash-alt"></i>
            </a>
            <a href="/incomes/update/${income.id}" class="btn btn-success">
                <i class="far fa-edit"></i>
            </a>
        </td>`
       tbodyforIncome.appendChild(trElementForIncome)

    }
}

async function expensesRender(){
    const expenses = await request('/expenses', 'GET')
    let number = 0
    for (const expense of expenses) {
        const trElement = document.createElement('tr')
        trElement.innerHTML = `<td>${++number}</td>
        <td>${expense.source}</td>
        <td>${expense.cost}</td>
        <td>${expense.date}</td>
        <td>
            <a href="/expenses/delete/${expense.id}" class="btn btn-danger">
                <i class="fas fa-trash-alt"></i>
            </a>
            <a href="/expenses/update/${expense.id}" class="btn btn-success">
                <i class="far fa-edit"></i>
            </a>
        </td>`
        tbodyforExpense.appendChild(trElement)
    }
}

async function totalRender(){
    const expenses = await request('/expenses', 'GET')
    const incomes = await request('/incomes', 'GET')
    const totalExpenses = total(expenses, 'cost')
    const totalIncome = total(incomes, 'income')
    let totalBudget = totalIncome - totalExpenses
    
    pForBudget.textContent = "$" +  totalBudget
    pForIncome.textContent = "$" + totalIncome
    pForExpense.textContent = "$" + totalExpenses
    
}

function total(arr, property){
    let total = 0
    for (let i = 0; i < arr.length; i++) {
       total += arr[i][property]
    }
    return total
}

incomesRender()
expensesRender()
totalRender()




