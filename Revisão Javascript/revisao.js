//Variáveis 

const nome = "ZABELA"
let idade = 20
const maiorDeIdade = true 

console.log(nome)
console.log(idade)
console.log("É maior de idade? ", maiorDeIdade)

idade = 19
console.log(idade)


//Operadores 

const soma = 2 + 2
const subtracao = 2 - 2
const multiplicacao = 2 * 3
const divisao = 4 /2 

console.log(soma)
console.log(subtracao)
console.log(multiplicacao)
console.log(divisao)

const resto = 3 % 2
let numero = 4 
console.log("Resto ->" ,resto)

const incremento = numero++ //+1
console.log("Incremento ->" ,incremento)

const decremento = numero-- 
console.log("Decremento ->" ,decremento)


//Faz operação e a atribuição logo em seguinda 


//Operadores de Comparação 
const igual = 10 == '10'
console.log(igual)

const estritamenteIgual = 10 == '10'
console.log(estritamenteIgual)

    const maior = 3 > 2 //true
    const menor = 2 < 3 //false 
    const maiorOuIgual = 3 >= 2
    const menorOuIgual = 2 <= 3


//Estrutura de controle
if(idade >= 18){
    console.log("Maior de idade")
} else if (idade < 18){
    console.log("Menor de idade")
} else {
    console.log("Valor inválido")
}

//Operador ternário 
const checkMaiordeIdade = idade >= 18 ? "Maior de idade" : "Menor de idade";
console.log (checkMaiordeIdade)