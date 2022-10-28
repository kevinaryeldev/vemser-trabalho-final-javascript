const failMsgLogin = 'Insira e-mail e senha para efetuar o login!'

function login() {
    const loginValue = document.getElementById('home-email').value;
    const passValue = document.getElementById('home-pass').value;

    if (loginValue == false) {
        alert(failMsgLogin)
        location.reload();
    } else if (passValue == false) {
        alert(failMsgLogin)
        location.reload();
    }
    
    console.log(loginValue);
    console.log(passValue);
}