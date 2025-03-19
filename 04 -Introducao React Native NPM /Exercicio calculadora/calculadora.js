

// Soma
const soma = (a, b) => a + b;

// Subtração
const subtracao = (a, b) => a - b;

// Multiplicação
const multiplicacao = (a, b) => a * b;

// Divisão
const divisao = (a, b) => {
    if (b === 0) {
        return "Erro: Divisão por zero!";
    }
    return a / b;
};

// Exportando as funções
export { soma, subtracao, multiplicacao, divisao };
