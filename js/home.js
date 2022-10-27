let isRecruiter = true

function checkRecruiter(){
    if (isRecruiter){
        let container = document.getElementById('home-vaga-container-principal')
        let button =  document.createElement('button')
        button.classList.add('button-cadastrar')
        button.innerText = 'Cadastrar vaga'
        container.appendChild(button)
    }
}
checkRecruiter()