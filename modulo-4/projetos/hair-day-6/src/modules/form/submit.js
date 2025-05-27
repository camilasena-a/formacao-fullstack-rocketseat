import dayjs from "dayjs"

const form = document.querySelector("form")
const dataSelecionada = document.querySelector("#date")

//faremos com que ao carregar a pagina, o campo de data já esteja preenchido com a data de hoje

const dataAtual = dayjs(new Date()).format("YYYY-MM-DD")

dataSelecionada.value = dataAtual
dataSelecionada.min = dataAtual //também não permitiremos escolher data anterior a de hoje

form.onsubmit = (event)=> {
  event.preventDefault()
  console.log("O EVENTO DE SUBMIT ESTÁ FUNCIONANDO")
}