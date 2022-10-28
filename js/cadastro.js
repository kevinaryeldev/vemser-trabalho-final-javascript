const botao = document.querySelector('#botao')

botao.addEventListener('click', (e)=>{
    e.preventDefault()

    const select = document.querySelector('#usuario')
    let funcao = select.options[select.selectedIndex].text
    
    const nome = document.querySelector('#nome').value
    
    const nascimento = document.querySelector('#nasc').value
    
    const email = document.querySelector('#email').value
    
    const senha = document.querySelector('#senha').value
    
    
    try{
        if(funcao == 'Qual sua função?') throw "Selecionar uma função!"
        if(nome == '') throw "Campo de Nome completo OBRIGATÓRIO!"
        if(nascimento == '') throw "Campo de Nascimento OBRIGATÓRIO!"
        if(email == '') throw "Campo de Email OBRIGATÓRIO!"
        if(senha == '') throw "Campo de Senha OBRIGATÓRIO!"
    } catch(err){
        alert(err)
        return
    }
    
    
    console.log(funcao)
    console.log(nome)
    console.log(nascimento)
    console.log(email)
    console.log(senha)
})