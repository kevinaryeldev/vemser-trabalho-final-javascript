let cards = document.querySelector('#cards')
const url = 'http://localhost:3001'
let vaga;
let userInfo;

const idVaga = document.querySelector('#vaga-id')
const remuneracao = document.querySelector('#remuneracao')
const tituloVaga = document.querySelector('#titulo-vaga')
const descricaoVaga = document.querySelector('#descricao-vaga')

const naoCandidatado = document.querySelector('#nao-cadidatado')
const button = document.querySelector('#button')


let array =[]


function mostraCandidato(){
    array.forEach((el)=>{
        cards.innerHTML += `<div class="card"><p>${el.nome}</p> <p>${el.nascimento.split('-').reverse().join('/')}</p></div>`
    })

}

const parametro = new URLSearchParams(window.location.search)

function pegarVaga(){
    axios
    .get(`${url}/vagas/${parametro.get('id')}`)
    .then((response) => {
      vaga = response.data;
      console.log(vaga);
      array = response.data.candidatos
      candidatar()  
      mostraCandidato()
      cadidatado()
    })   
}


function candidatar() {
    idVaga.innerText = `ID da vaga: ${parametro.get('id')}`

    remuneracao.innerText = `Remuneraçao: ${vaga.payment}`

    tituloVaga.innerHTML = `<span>Titulo</span>: ${vaga.title}`

    descricaoVaga.innerHTML = `<span>Descrição da vaga: </span>${vaga.description}`
}

function pegarUsuario(){
    axios.get(`${url}/users/${localStorage.getItem('@vemserjs-userId')}`,prepareHeaders())
        .then(response=>{
          userInfo = response.data
          console.log(userInfo)
          delete userInfo.password
          pegarVaga()
        })
}
pegarUsuario()

function prepareHeaders(){
    let token = localStorage.getItem('@vemserjs-token')
    return {
        headers: {
        Authorization: "Bearer " + token,
        },
    }
}    

function candidatarVaga() {
    axios.patch(`${url}/vagas/${parametro.get('id')}`, {candidatos: [...array,{nome:userInfo.nome, id: userInfo.id, nascimento: userInfo.nascimento, reprovado: false}]}, prepareHeaders()).then(response =>{
        console.log(response.data)
        cadidatado()
    })

}

function cadidatado(){
    let item = array.find(item => item.id == localStorage.getItem('@vemserjs-userId'))
    if(item){
        if(item.reprovado){
            button.removeAttribute('onclick')
            button.classList.add('botao-cinza')
            button.classList.remove('botao-azul')
            button.innerText = 'Cancelar candidatura'
        } else {
            button.removeAttribute('onclick')
            button.classList.add('botao-vermelho')
            button.classList.remove('botao-azul')
            button.innerText = 'Cancelar candidatura'
            button.addEventListener('click', ()=> cancelarCandidatura())
                
        }
    } 
}

function cancelarCandidatura() {
    console.log('oi')
    let item = array.findIndex(item => item.id == localStorage.getItem('@vemserjs-userId'))
    if(item > -1){
        array.splice(item)
        axios.patch(`${url}/vagas/${parametro.get('id')}`, {candidatos: [...array]}, prepareHeaders()).then(response =>{
            console.log(response.data)
            pegarVaga()
        })
    }
}