const tbody = document.querySelector('tbody')
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
        const trElement = document.createElement('tr')
        trElement.innerHTML = `<td>${++number}</td>
        <td>${income.source}</td>
        <td>${income.income}</td>
        <td>${income.date}</td>
        <td>
            <a href="/delete/${income.id}" class="btn btn-danger">
                <i class="fas fa-trash-alt"></i>
            </a>
            <a href="/update/${income.id}" class="btn btn-success">
                <i class="far fa-edit"></i>
            </a>
        </td>`
        tbody.appendChild(trElement)
    }
}

incomesRender()




