import dayjs from "dayjs"

const form = document.querySelector(".modal-form")
const dataFormulario = document.querySelector("#appointment-date")

// Configurando data

const dataAtual = dayjs(new Date()).format("YYYY-MM-DD")
dataFormulario.value = dataAtual
dataFormulario.min = dataAtual

// Configurando hora

const horaAtual = dayjs(new Date()).format("HH:mm")





form.onsubmit = (event) => {
  event.preventDefault()

}