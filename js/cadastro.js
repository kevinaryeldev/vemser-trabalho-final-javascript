const url = 'http://localhost:3001';
const botao = document.querySelector('#botao');
const statusInfo = document.getElementById('validation-pass');

// Id's Erros
const lblUsuario = document.getElementById('lbl-usuario');
const lblNome = document.getElementById('lbl-nome');
const lblNasc = document.getElementById('lbl-nasc');
const lblEmail = document.getElementById('lbl-mail');
const lblPss = document.getElementById('lbl-pss');

class Usuario {
    funcao;
    nome;
    nascimento;
    email;
    password;

    constructor(funcao, nome, nascimento, email, password) {
        this.funcao = funcao;
        this.nome = nome;
        this.nascimento = nascimento;
        this.email = email;
        this.password = password
    }
}

botao.addEventListener('click', async (e) => {
    e.preventDefault();

    const select = document.querySelector('#usuario');
    let funcao = select.options[select.selectedIndex].text;
    const nome = document.querySelector('#nome').value;
    const nascimento = document.querySelector('#nasc').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const usuario = new Usuario(
        funcao,
        nome,
        nascimento,
        email,
        senha
    );

    try {
        if (funcao == 'Qual sua função?') {
            lblUsuario.style.color = "red";
            throw 'Selecione uma função!';
        } else {
            lblUsuario.style.color = "#170F49";
        }

        if (nome == '') {
            lblNome.style.color = "red";
            throw "Campo de Nome completo OBRIGATÓRIO!";
        } else {
            lblNome.style.color = "#170F49";
        }

        if (nascimento == '') {
            lblNasc.style.color = "red";
            throw "Campo de Nascimento OBRIGATÓRIO!";
        } else {
            lblNasc.style.color = "#170F49";
        }

        if (email == '') {
            lblEmail.style.color = "red";
            throw "Campo de Email OBRIGATÓRIO!";
        } else {
            lblEmail.style.color = "#170F49";
        }

        if (senha == '') {
            lblPss.style.color = "red";
            throw "Campo de Senha OBRIGATÓRIO!";
        } else {
            lblPss.style.color = "#170F49";
        }

        if(senha.length < 5){    
            lblPss.style.color = "red";
            throw "Senha muito curta!";
        } else {
            lblPss.style.color = "#170F49";
        }

        await axios.post(`${url}/users`, usuario)
            .then((response) => {
                window.location.replace('../../index.html');
            })

    } catch (err) {
        statusInfo.innerText = err;
        return;
    }
});