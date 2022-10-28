let cards = document.querySelector('#cards')

let array =[{nome: 'Marcus', nascimento: '10/12/1999'},{nome:'Roberta', nascimento: '20/02/2001'}]

let reprovado = 'Reprovado';

array.forEach((el)=>{
    cards.innerHTML += `<div class="card"> <p>${el.nome}</p> <p>${el.nascimento}</p> <button class="btn-status">${reprovado}</button></div>`
})