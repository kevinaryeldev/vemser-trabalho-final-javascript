let cards = document.querySelector('#cards')

let array =[{nome: 'Marcus', nascimento: '10/12/1999'},{nome:'Roberta', nascimento: '20/02/2001'}]


array.forEach((el)=>{
    cards.innerHTML += `<div class="card"><p>${el.nome}</p> <p>${el.nascimento}</p></div>`
})