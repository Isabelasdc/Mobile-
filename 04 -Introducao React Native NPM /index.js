import {TabelaIMC, calcularIMC} from  "./CalculadoraIMC.js"


console.log("projeto Calculo do IMC")

console.log(">>> Tabela IMC <<<<")
console.table(TabelaIMC)



const peso = 65
const altura = 1.61

const resultado = calcularIMC(peso, altura)

console.log("Resultado do IMC")
console.log(`IMC: ${resultado.toFixed(2)}`)

// importando lib moemnt e usando 

import moment from "moment";

const hoje = moment().locale('pt-br')

console.log(hoje.format('DD/MM/yyyy'))