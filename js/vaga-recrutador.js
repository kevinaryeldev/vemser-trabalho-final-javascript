let cards = document.querySelector('#cards')
const url = 'http://localhost:3001'
let vaga;
let userInfo;

const idVaga = document.querySelector('#vaga-id')
const remuneracao = document.querySelector('#remuneracao')
const tituloVaga = document.querySelector('#titulo-vaga')
const descricaoVaga = document.querySelector('#descricao-vaga')

let array = [];

function mostrarCandidatos() {
    array.forEach((el)=>{
        if (el.reprovado) {
            cards.innerHTML += `<div class="card"> <span><p>${el.nome}</p> <p>${el.nascimento}</p></span> <span><button class="btn-status btn-status-disabled" disabled>Reprovar</button></span> </div>`
        } else {
            cards.innerHTML += `<div class="card"> <span><p>${el.nome}</p> <p>${el.nascimento}</p></span> <span><button class="btn-status" onclick="reprovarCandidato(this, ${el.id})">Reprovar</button></span> </div>`
        }
    })
}

const parametro = new URLSearchParams(window.location.search)

axios.get(`${url}/vagas/${parametro.get('id')}`)
    .then((response) => {
        vaga = response.data;
        console.log(vaga);
        array = response.data.candidatos;
        mostrarVaga();  
        mostrarCandidatos();
    })

function mostrarVaga() {
    idVaga.innerText = `ID da vaga: ${parametro.get('id')}`

    remuneracao.innerText = `Remuneraçao: ${vaga.payment}`

    tituloVaga.innerHTML = `<span>Titulo</span>: ${vaga.title}`

    descricaoVaga.innerHTML = `<span>Descrição da vaga: </span>${vaga   .description}`
}

function reprovarCandidato(e, id) {
    let item = array.findIndex(item => item.id == id);
    array[item].reprovado = true;
    e.disabled = true;
    axios.patch(`${url}/vagas/${parametro.get("id")}`, {candidatos: array}, prepareHeaders())
        .then(response => {
            console.log(response.data);
        });
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

function excluirVaga() {
    axios.delete(`${url}/vagas/${parametro.get('id')}`, prepareHeaders())
        .then((response) => {
            window.location.replace('../home/index.html')
            console.log(response.data)
        })
}