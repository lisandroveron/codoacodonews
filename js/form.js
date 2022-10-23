const nombre = document.getElementById('name');
const apellido = document.getElementById('surname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');
const paragraph = document.getElementById('warning');

form.addEventListener('submit', e=>{
    e.preventDefault()
    let warning = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    paragraph.innerHTML=""


    if(nombre.value.length <1){
        warning += `Ingrese un nombre valido <br>`
        entrar = true
    }
    if(surname.value.length <1){
        warning += `Ingrese un apellido valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warning += `Ingrese un email valido <br>`
        entrar = true}
    if(password.value.length <8){
        warning += `Ingrese una contraseña valida, debe tener 8 caracteres <br>`
        entrar = true
    }
    if (entrar){
        paragraph.innerHTML = warning
    }else{
        paragraph.innerHTML = "Enviado"
    }
})

