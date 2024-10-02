let currentInput = ''
const output = document.getElementById('output');

function clique(number){
    currentInput += number
    output.innerHTML = currentInput;
    return currentInput
}

function clearDisplay(){
    currentInput = '' 
    output.innerHTML = currentInput

}

function calculate(){
    output.innerHTML = eval(currentInput)
}



