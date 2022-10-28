const botao = document.querySelector('#botao')

botao.addEventListener('click', (e)=>{
    e.preventDefault()

    const select = document.querySelector('#usuario')
    let funcao = select.options[select.selectedIndex].text
    console.log(funcao)

    const nome = document.querySelector('#nome').value
    console.log(nome)

    const nascimento = document.querySelector('#nasc').value
    console.log(nascimento)

    const email = document.querySelector('#email').value
    console.log(email)

    const senha = document.querySelector('#senha').value
    console.log(senha)


    try{
        if(funcao == 'Qual sua função?') throw "Selecionar uma função!"
        if(nome == '') throw "Campo de Nome completo OBRIGATÓRIO!"
        if(nascimento == '') throw "Campo de Nascimento OBRIGATÓRIO!"
        if(email == '') throw "Campo de Email OBRIGATÓRIO!"
        if(email == '') throw "Campo de Senha OBRIGATÓRIO!"


    } catch(err){
        alert(err)
    }
})