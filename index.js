// Escreva um programa que calcula o preço total da compra do seu celular. 
// Você pode continuar comprando telefones (dica: loop!) até você ficar sem dinheiro 
// na sua conta bancária. Você irá também comprar acessórios para cada telefone enquanto sua 
// quantidade de dinheiro for menor do que seu limite mensal.
// Após calcular o valor da compra, adicione as taxas, depois imprima a quantidade total, 
// devidamente formatada.
// Por fim, verifique o total gasto em sua conta bancária para saber se você pode
// comprar ou não.
// Você deve definir algumas constantes para a "taxa de imposto", "preço do telefone", 
// "preço do acessório", e "limite de gastos", assim como variáveis para o seu "saldo bancário".
// Você deve definir funções para calcular a taxa e para formatar o preço com um "$" 
// e arredondá-lo para duas casas decimais.
// Desafio Extra: Tente incorporar um input para esse programa, talvez com oprompt(..) 
// que abordamos anteriormente em "Input". Você pode definir um prompt para o usuário para definir o saldo 
// de sua conta bancária, por exemplo. Divirta-se e seja criativo!

let dinheiro = Number(prompt("Quanto de dinheiro você tem?"));
let limite = dinheiro * 0.8
let brinde = 9.99
let taxa = 0.09
let quantidade = 0

function preçoFinal(quantidade, dinheiro){
    if( quantidade < dinheiro){
        let resultado = "$" + quantidade.toFixed(2)
        confirm.log(resultado)
    }else{
        console.log('você não tem dinheiro para pagar')
    }
     
}

for (let preço = 99.99 ; limite >  quantidade;){
    quantidade += preço
    if(quantidade < limite){
        quantidade += brinde
    }
}

preçoFinal(quantidade, dinheiro)