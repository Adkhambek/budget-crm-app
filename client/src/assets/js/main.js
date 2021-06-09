const tbodyforIncome = document.querySelector('.income')
const tbodyforExpense = document.querySelector('.expense')
const pForBudget = document.querySelector('#totalbudget')
const pForIncome = document.querySelector('#totalincomes')
const pForExpense = document.querySelector('#totalexpenses')
const incomeForm = document.querySelector('#incomeAdd')
const incomeInput = document.querySelector('#income')
const sourceInput = document.querySelector('#source')
const expenseForm = document.querySelector('#expenseform')
const costInput = document.querySelector('#costinput')
const expenseSourceInput = document.querySelector('#expenseSource')
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

function total(arr, property){
    let total = 0
    for (let i = 0; i < arr.length; i++) {
       total += arr[i][property]
    }
    return total
} 

   
    
    









