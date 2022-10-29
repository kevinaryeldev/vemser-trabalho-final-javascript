const url = 'http://localhost:3001'
const botao = document.querySelector('#botao')

class Usuario{
    funcao;
    nome;
    nascimento;
    email;
    password;

    constructor(funcao,nome,nascimento,email,password){
        this.funcao = funcao
        this.nome = nome
        this.nascimento = nascimento
        this.email  = email
        this.password = password
    }
}

botao.addEventListener('click', async (e)=>{
    e.preventDefault()

    const select = document.querySelector('#usuario')
    let funcao = select.options[select.selectedIndex].text
    const nome = document.querySelector('#nome').value
    const nascimento = document.querySelector('#nasc').value
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    const usuario = new Usuario(
        funcao,
        nome,
        nascimento,
        email,
        senha
    )

    
    try{ 
        if(funcao == 'Qual sua função?') throw "Selecionar uma função!"
        if(nome == '') throw "Campo de Nome completo OBRIGATÓRIO!"
        if(nascimento == '') throw "Campo de Nascimento OBRIGATÓRIO!"
        if(email == '') throw "Campo de Email OBRIGATÓRIO!"
        if(senha == '') throw "Campo de Senha OBRIGATÓRIO!"
        
        await axios.post(`${url}/users`, usuario).then((response) => {
            window.location.replace('../../index.html')
        }) 
        
    } catch(err){
        alert(err)
        return
    }

    
})