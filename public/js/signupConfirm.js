const urlParams = new URLSearchParams(window.location.search);
const errorMessage = urlParams.get('error');
    
if (errorMessage) {
    alert(errorMessage);
}

function passwordValidation(){
    let password = document.getElementById('password').value;
    let confirm = document.getElementById('confirm').value;
    
    let span = document.getElementById('span');
    
    if (password != confirm) {
        span.innerText = 'Senhas Diferentes!';
        event.preventDefault();
    } else {
        span.innerText = ''; 
    }
}

document.querySelector('form').addEventListener('submit', passwordValidation);