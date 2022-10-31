let cards = document.querySelector('#cards')
const url = 'http://localhost:3001'
let vaga;
let userInfo;
let parametros;
const idVaga = document.querySelector('#vaga-id')
const remuneracao = document.querySelector('#remuneracao')
const tituloVaga = document.querySelector('#titulo-vaga')
const descricaoVaga = document.querySelector('#descricao-vaga')

let array = [];
window.addEventListener('load', () => {
    parametros = new URLSearchParams(window.location.search)
    if(!parametros.get('id') || !window.localStorage.getItem('@vemserjs-token')){
        window.location.replace('../../index.html')
    }else{
        pegarUsuario();
    }
});

function mostrarCandidatos() {
    array.forEach((el)=>{
        let primeiroNome = el.nome.split(' ');
        if (el.reprovado) {
            cards.innerHTML += 
                `<div class="card"> <span><p>${primeiroNome[0]}</p><p>${el.nascimento}</p></span> <span><button class="btn-status btn-status-disabled" disabled>Reprovar</button></span> </div>`
        } else {
            cards.innerHTML += `<div class="card"> <span><p>${primeiroNome[0]}</p> <p>${el.nascimento}</p></span> <span><button class="btn-status" onclick="reprovarCandidato(this, ${el.id})">Reprovar</button></span> </div>`
        }
    })
}

function pegarVaga(){  
    axios.get(`${url}/vagas/${parametros.get('id')}`)
    .then((response) => {
        vaga = response.data;
        array = response.data.candidatos;
        mostrarVaga();  
        mostrarCandidatos();
    }).catch(err=>{
        if(err.response){
            window.location.replace('../home/index.html')
        }       
    })
}

function pegarUsuario(){   
    axios.get(`${url}/users/${localStorage.getItem('@vemserjs-userId')}`,prepareHeaders())
    .then(response=>{
    userInfo = response.data
    delete userInfo.password
    pegarVaga();
    }).catch(err=>{
        if (err.response){
            alert(err.response.data.message)
            localStorage.clear()
            setTimeout(()=>{
                window.location.replace('../../index.html')
            },3000)
        }
    })
}

function prepareHeaders(){
    let token = localStorage.getItem('@vemserjs-token')
    return {
        headers: {
        Authorization: "Bearer " + token,
        },
    }
}    

function mostrarVaga() {
    idVaga.innerText = `ID da vaga: ${parametros.get('id')}`
    remuneracao.innerText = `Remuneraçao: ${vaga.payment}`
    tituloVaga.innerHTML = `<span>Titulo</span>: ${vaga.title}`
    descricaoVaga.innerHTML = `<span>Descrição da vaga: </span>${vaga.description}`
}

function reprovarCandidato(e, id) {
    let item = array.findIndex(item => item.id == id);
    array[item].reprovado = true;
    e.disabled = true;
    axios.patch(`${url}/vagas/${parametros.get("id")}`, {candidatos: array}, prepareHeaders())
        .then(response => {
            console.log(response.data);
        });
}

function excluirVaga() {
    axios.delete(`${url}/vagas/${parametros.get('id')}`, prepareHeaders())
        .then((response) => {
            window.location.replace('../home/index.html');
            console.log(response.data);
        });
}