async function incomesRender(){
    const incomes = await request('/incomes', 'GET')
    let number = 0
    tbodyforIncome.innerHTML = null
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

incomeForm.addEventListener('submit', async event => {
        event.preventDefault()
        const newIncome = {
            source: sourceInput.value,
            income: +incomeInput.value
        }
        await request('/incomes', 'POST', newIncome)
        incomesRender()
        event.target.reset()
    })  


  incomesRender()