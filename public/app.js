document.addEventListener('click', event=>{
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const element = event.target.closest("li").querySelector("span")
        const elementValue = element.textContent
        const result = prompt('Введите новое название', elementValue)
        if (result !== null) {
            edit(id, result).then(() => {
                element.textContent = result
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, title) {
    await fetch(`/${id}`, {method: 'PUT', body: JSON.stringify({title:title}), headers: {'Content-Type': 'application/json'}})
}

