const url = 'http://localhost:3001'

async function login() {
    const emailA = document.getElementById('home-email').value;
    const passwordA = document.getElementById('home-pass').value;
    const data = {email: emailA, password: passwordA}

    if (validationField(emailA, passwordA)) {
        let isRegistered = await axios.post(`${url}/login`, data).then(resp => {
            localStorage.setItem("@vemserjs-token", resp.data.accessToken);
            localStorage.setItem("@vemserjs-userId", resp.data.user.id);
            window.location.href = '../pages/home/index.html';
            }).catch(error =>{ 
                if (error.response){
                    alert("Usuário ou senha inválidos!\n" + error.response.data)
                } else {
                    alert("Erro no servidor")
                }
            });
    }
}

function validationField(email, password) {
    let isValid = true;

    if (email.trim() === "") {
        isValid = false;
        document.getElementById("validation-email").innerHTML = `Email não pode estar vazio`
    }

    if (password.trim() === "") {
        isValid = false;
        document.getElementById("validation-pass").innerHTML = `Senha não pode estar vazio`
    }

    return isValid;
}