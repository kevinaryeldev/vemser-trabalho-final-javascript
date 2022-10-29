let isRecruiter = true

function checkRecruiter(isRecruiter){
    if (isRecruiter){
        let container = document.getElementById('home-vaga-container-principal')
        let button =  document.createElement('button')
        button.classList.add('button-cadastrar')
        button.innerText = 'Cadastrar vaga'
        button.onclick = ()=>  criarModalCriarVaga()
        container.appendChild(button)
    }
}

checkRecruiter(isRecruiter)

function registerVacancy() {
    window.location.href = '../pages/home/index.html'
}

function mostrarVagas(){
    let container = document.getElementById('home-vaga-container')
    vagas.forEach(el => {
        container.innerHTML += `<div class="home-vaga">
        <p class="home-vaga-titulo">${el.title}</p>
        <p class="home-vaga-salario">${el.payment}</p>
        </div>`
    })
}

checkRecruiter()
mostrarVagas()

function criarModalCriarVaga(){
    let backdrop = document.createElement('div')
    backdrop.classList.add('home-modal-criar-vaga-backdrop')
    //
    let title = document.createElement('h2')
    title.classList.add('home-modal-criar-vaga-title')
    backdrop.appendChild(title)
    //
    let modalContainer = document.createElement('form')
    modalContainer.classList.add('home-modal-criar-vaga-container')
    backdrop.appendChild(modalContainer)
    backdrop.onclick = (event) => destruirModalCriarVagaComClickAway(event,backdrop,modalContainer,)
    modalContainer.onsubmit = (event,backdrop)=> {event.preventDefault(); criarVaga(event,backdrop)}
    //
    let labelTitle = document.createElement('label')
    labelTitle.innerText = 'Título da vaga:'
    labelTitle.classList.add('home-modal-criar-vaga-input-label')
    modalContainer.appendChild(labelTitle)
    //
    let inputTitle = document.createElement('input')
    inputTitle.classList.add('home-modal-criar-vaga-input')
    inputTitle.setAttribute('type','text')
    inputTitle.setAttribute('name','title')
    inputTitle.setAttribute('placeholder','Exemplo: QA Jr')
    modalContainer.appendChild(inputTitle)
    //
    let labelDescription = document.createElement('label')
    labelDescription.innerText = 'Descrição da vaga:'
    labelDescription.classList.add('home-modal-criar-vaga-input-label')
    modalContainer.appendChild(labelDescription)
    //
    let inputDescription = document.createElement('input')
    inputDescription.classList.add('home-modal-criar-vaga-input')
    inputDescription.setAttribute('type','text')
    inputDescription.setAttribute('name','description')
    inputDescription.setAttribute('placeholder','Exemplo: Automatizar testes...')
    modalContainer.appendChild(inputDescription)
    //
    let labelPayment = document.createElement('label')
    labelPayment.innerText = 'Remuneração inicial:'
    labelPayment.classList.add('home-modal-criar-vaga-input-label')
    modalContainer.appendChild(labelPayment)
    //
    let inputPayment = document.createElement('input')
    inputPayment.classList.add('home-modal-criar-vaga-input')
    inputPayment.setAttribute('type','text')
    inputPayment.setAttribute('name','payment')
    inputPayment.setAttribute('placeholder','Exemplo: R$ 5000')
    modalContainer.appendChild(inputPayment)
    //
    let buttonRegister = document.createElement('button')
    buttonRegister.classList.add('home-modal-criar-vaga-button')
    buttonRegister.setAttribute('type','submit')
    buttonRegister.innerText = 'Cadastrar vaga'
    modalContainer.onsubmit = (event)=> {event.preventDefault(); criarVaga(event,backdrop)}
    modalContainer.appendChild(buttonRegister)
    //
    document.body.appendChild(backdrop)
}

function destruirModalCriarVaga(modal){
    document.body.removeChild(modal)
}

function destruirModalCriarVagaComClickAway(e,modal,container){
    if(e.target != container && e.target.parentNode != container){
        document.body.removeChild(modal)
    }
}

function criarVaga(e,modal){
    formData = new FormData(e.target).entries()
    data = Object.fromEntries(formData)
    console.log(data)
    destruirModalCriarVaga(modal)
}}