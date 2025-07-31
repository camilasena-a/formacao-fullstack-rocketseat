function soma(a: number, b: number) {
  return a + b;
}

console.log(soma(1, 2));

// declaração de variáveis

let produto: string = "Notebook";
const preco: number = 1000;

//produto = 2 --- vai dar erro pq o produto deve ser uma string

const carro: { marca: string; modelo: string; ano: number } = {
  marca: "Ford",
  modelo: "Mustang",
  ano: 2024
}

// carro.ano = "celta" --- vai dar erro pq o ano deve ser um número

console.log(carro);


