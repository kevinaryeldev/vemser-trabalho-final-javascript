let cards = document.querySelector('#cards')
const url = 'http://localhost:3001'
let vaga;
let userInfo;
let parametros;
const idVaga = document.querySelector('#vaga-id')
const remuneracao = document.querySelector('#remuneracao')
const tituloVaga = document.querySelector('#titulo-vaga')
const descricaoVaga = document.querySelector('#descricao-vaga')
const naoCandidatado = document.querySelector('#nao-cadidatado')
const button = document.querySelector('#button')

let array = [];

window.addEventListener('load', () => {
    parametros = new URLSearchParams(window.location.search)
    if(!parametros.get('id') || !window.localStorage.getItem('@vemserjs-token')){
        window.location.replace('../../index.html')
    }else{
        pegarUsuario();
    }
});

function mostraCandidato() {
    array.forEach((el) => {
        if (el.id == userInfo.id && el.reprovado) {
            cards.innerHTML += `<div class="card" style="color: #FE6663"><p>${el.nome}</p> <p>${el.nascimento.split('-').reverse().join('/')}</p></div>`
        } else {
            cards.innerHTML += `<div class="card"><p>${el.nome}</p> <p>${el.nascimento.split('-').reverse().join('/')}</p></div>`
        }
    })
}

function pegarVaga() {
    axios
        .get(`${url}/vagas/${parametros.get('id')}`)
        .then((response) => {
            vaga = response.data;
            array = response.data.candidatos
            candidatar()
            mostraCandidato()
            cadidatado()
        }).catch(err=> {
            if (err.response){
                window.location.replace('../home/index.html')
            }
        })
}


function candidatar() {
    idVaga.innerText = `ID da vaga: ${parametros.get('id')}`

    remuneracao.innerText = `Remuneraçao: ${vaga.payment}`

    tituloVaga.innerHTML = `<span>Titulo</span>: ${vaga.title}`

    descricaoVaga.innerHTML = `<span>Descrição da vaga: </span>${vaga.description}`
}

function pegarUsuario() {
    axios.get(`${url}/users/${localStorage.getItem('@vemserjs-userId')}`, prepareHeaders())
        .then(response => {
            userInfo = response.data
            delete userInfo.password
            pegarVaga()
        }).catch(err=>{
            if (err.response){
                localStorage.clear()
                window.location.replace('../../index.html')
            }
        })
}

function prepareHeaders() {
    let token = localStorage.getItem('@vemserjs-token')
    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    }
}

function candidatarVaga() {
    axios.patch(`${url}/vagas/${parametros.get('id')}`, { candidatos: [...array, { nome: userInfo.nome, id: userInfo.id, nascimento: userInfo.nascimento, reprovado: false }] }, prepareHeaders()).then(response => {
        console.log(response.data)
        cadidatado()
    })

}

function cadidatado() {
    let item = array.find(item => item.id == localStorage.getItem('@vemserjs-userId'))
    if (item) {
        if (item.reprovado) {
            button.removeAttribute('onclick')
            button.classList.add('botao-cinza')
            button.classList.remove('botao-azul')
            button.innerText = 'Cancelar candidatura'
        } else {
            button.removeAttribute('onclick')
            button.classList.add('botao-vermelho')
            button.classList.remove('botao-azul')
            button.innerText = 'Cancelar candidatura'
            button.addEventListener('click', () => cancelarCandidatura())

        }
    }
}

function cancelarCandidatura() {
    let item = array.findIndex(item => item.id == localStorage.getItem('@vemserjs-userId'))
    if (item > -1) {
        array.splice(item)
        axios.patch(`${url}/vagas/${parametros.get('id')}`, { candidatos: [...array] }, prepareHeaders()).then(response => {
            console.log(response.data)
            pegarVaga()
        })
    }
}