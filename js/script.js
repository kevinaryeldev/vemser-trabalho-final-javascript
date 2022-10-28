function login() {
    const email = document.getElementById('home-email').value;
    const password = document.getElementById('home-pass').value;

    if (validationField(email, password)) {
        let isRegistered = false
        //TODO: chamar a api para validar se a pessoa já tem cadastro

        if (isRegistered) {
            window.location.href = '../pages/home/index.html'
        } else {
            alert("Usuário ou senha inválidos!")
            location.reload()
        }
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