export class MathCalc {
  media(a,b) {
    return (a+b)/2
  }
  sucessor(a) {
    return a+1
  }
}

export default class Usuarios {
  constructor(nome,sobrenome) {
    this.nome = nome,
    this.sobrenome = sobrenome
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome}!`)
  }
}