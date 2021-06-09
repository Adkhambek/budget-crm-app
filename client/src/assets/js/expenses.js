async function expensesRender(){
    const expenses = await request('/expenses', 'GET')
    let number = 0
    tbodyforExpense.innerHTML = null
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

    expenseForm.addEventListener('submit', async event => {
        event.preventDefault()
        const newExpense = {
            source: expenseSourceInput.value,
            cost: +costInput.value
        }
        await request('/expenses', 'POST', newExpense)
        expensesRender()
        event.target.reset()
    })  

    expensesRender()