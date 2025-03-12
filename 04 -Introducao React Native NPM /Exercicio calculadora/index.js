import { soma, subtracao, multiplicacao, divisao } from './calculadora.js';


console.log("Soma: ", soma(10, 5));
console.log("Subtração: ", subtracao(10, 5));
console.log("Multiplicação: ", multiplicacao(10, 5));
console.log("Divisão: ", divisao(10, 5));




import moment from 'moment';

function calcularIdade(anoNascimento) {
    // Cria uma data para o aniversário da pessoa no ano de nascimento
    const dataNascimento = moment(anoNascimento, 'YYYY');
    
    // Calcula a diferença entre a data atual e a data de nascimento em anos
    const idade = moment().diff(dataNascimento, 'years');
    
    return idade;
}

const anoNascimento = 1990;
const idade = calcularIdade(anoNascimento);

console.log(`Idade: ${idade} anos`);
