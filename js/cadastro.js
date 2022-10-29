const url = 'http://localhost:3001'
const botao = document.querySelector('#botao')
const statusInfo = document.getElementById('validation-pass');

// Id's Erros
const lblUsuario = document.getElementById('lbl-usuario');
const lblNome = document.getElementById('lbl-nome');
const lblNasc = document.getElementById('lbl-nasc');
const lblEmail = document.getElementById('lbl-mail');
const lblPss = document.getElementById('lbl-pss');

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
        if(funcao == 'Qual sua função?') {
            lblUsuario.style.color = "red";
            throw 'Selecione uma função!';
        }

        if(nome == '') {
            lblNome.style.color = "red";
            throw "Campo de Nome completo OBRIGATÓRIO!";
        } 
        

        if(nascimento == '') {
            lblNasc.style.color = "red";
            throw "Campo de Nascimento OBRIGATÓRIO!";
        }
        

        if(email == '') {
            lblEmail.style.color = "red";
            throw "Campo de Email OBRIGATÓRIO!";
        }
        

        if(senha == '') {
            lblPss.style.color = "red";
            throw "Campo de Senha OBRIGATÓRIO!";
        }
        
        
        await axios.post(`${url}/users`, usuario).then((response) => {
            
            window.location.replace('../../index.html')
        }) 
        
    } catch(err){
        statusInfo.innerText = err;
        return
    }

    
})