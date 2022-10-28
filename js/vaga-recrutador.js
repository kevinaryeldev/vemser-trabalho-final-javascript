let cards = document.querySelector('#cards')

let array =[{nome: 'Marcus', nascimento: '10/12/1999'},{nome:'Roberta', nascimento: '20/02/2001'}]

let reprovado = 'Reprovado';

array.forEach((el)=>{
    cards.innerHTML += `<div class="card"> <span><p>${el.nome}</p> <p>${el.nascimento}</p></span> <span><button class="btn-status">${reprovado}</button></span> </div>`
})