import dayjs from "dayjs"
import { novoAgendamento } from "../../services/novo-agendamento"
const form = document.querySelector(".modal-form")
const dataFormulario = document.querySelector("#appointment-date")

// Configurando data

const dataAtual = dayjs(new Date()).format("YYYY-MM-DD")
dataFormulario.value = dataAtual
dataFormulario.min = dataAtual

// Configurando hora

const horaAtual = dayjs(new Date()).format("HH:mm")





form.onsubmit = async (event) => {
  event.preventDefault()
  try {
    //recuperando dados do formulario
    const nomeTutor = document.querySelector("#tutor-name").value.trim()
    const nomePet = document.querySelector("#pet-name").value.trim()
    const telefoneTutor = document.querySelector("#phone").value.trim()
    const servico = document.querySelector("#service").value
    const dataAgendamento = document.querySelector("#appointment-date").value
    const horaAgendamento = document.querySelector("#appointment-time").value

    console.log(nomeTutor, nomePet, telefoneTutor, servico, dataAgendamento, horaAgendamento)

    //insere a hora na data
    const [hora] = horaAgendamento.split(":")
    const dataHora = dayjs(dataAgendamento).add(hora, "hour")
    //gera um id unico
    const id = new Date().getTime()

    console.log({dataHora, id,nomeTutor, nomePet})
    await novoAgendamento({dataHora, id,nomeTutor, nomePet})
  } catch (error) {
    alert("Erro ao enviar o formulário")
    console.log(error)
  }


}