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

totalRender()