let cards = document.querySelector('#cards')
const url = 'http://localhost:3001'
let vaga;
let userInfo;

const idVaga = document.querySelector('#vaga-id')
const remuneracao = document.querySelector('#remuneracao')
const tituloVaga = document.querySelector('#titulo-vaga')
const descricaoVaga = document.querySelector('#descricao-vaga')


let array =[{nome: 'Marcus', nascimento: '10/12/1999'},{nome:'Roberta', nascimento: '20/02/2001'}]

let reprovado = 'Reprovado';

array.forEach((el)=>{
    cards.innerHTML += `<div class="card"> <span><p>${el.nome}</p> <p>${el.nascimento}</p></span> <span><button class="btn-status">${reprovado}</button></span> </div>`
})

const parametro = new URLSearchParams(window.location.search)


axios
.get(`${url}/vagas/${parametro.get('id')}`)
.then((response) => {
  vaga = response.data;
  console.log(vaga);
  mostrarVaga()  
})

function mostrarVaga() {
    idVaga.innerText = `ID da vaga: ${parametro.get('id')}`

    remuneracao.innerText = `Remuneraçao: ${vaga.payment}`

    tituloVaga.innerHTML = `<span>Titulo</span>: ${vaga.title}`

    descricaoVaga.innerHTML = `<span>Descrição da vaga: </span>${vaga   .description}`
}


axios.get(`${url}/users/${localStorage.getItem('@vemserjs-userId')}`,prepareHeaders())
    .then(response=>{
      userInfo = response.data
      console.log(userInfo)
      delete userInfo.password
    })

function prepareHeaders(){
    let token = localStorage.getItem('@vemserjs-token')
    return {
        headers: {
        Authorization: "Bearer " + token,
        },
    }
}    
