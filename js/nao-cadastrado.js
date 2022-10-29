let cards = document.querySelector('#cards')
const url = 'http://localhost:3001'
let vaga;
let userInfo;

const idVaga = document.querySelector('#vaga-id')
const remuneracao = document.querySelector('#remuneracao')
const tituloVaga = document.querySelector('#titulo-vaga')
const descricaoVaga = document.querySelector('#descricao-vaga')


let array =[{nome: 'Marcus', nascimento: '10/12/1999'},{nome:'Roberta', nascimento: '20/02/2001'}]


function mostraCandidato(){
    array.forEach((el)=>{
        cards.innerHTML += `<div class="card"><p>${el.nome}</p> <p>${el.nascimento.split('-').reverse().join('/')}</p></div>`
    })

}

const parametro = new URLSearchParams(window.location.search)


axios
.get(`${url}/vagas/${parametro.get('id')}`)
.then((response) => {
  vaga = response.data;
  console.log(vaga);
  array = response.data.candidatos
  candidatar()  
  mostraCandidato()
})

function candidatar() {
    idVaga.innerText = `ID da vaga: ${parametro.get('id')}`

    remuneracao.innerText = `Remuneraçao: ${vaga.payment}`

    tituloVaga.innerHTML = `<span>Titulo</span>: ${vaga.title}`

    descricaoVaga.innerHTML = `<span>Descrição da vaga: </span>${vaga.description}`
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

function candidatarVaga() {
    axios.patch(`${url}/vagas/${parametro.get('id')}`, {candidatos: [...array,{nome:userInfo.nome, id: userInfo.id, nascimento: userInfo.nascimento}]}, prepareHeaders()).then(response =>{
        console.log(response.data)
    })
}