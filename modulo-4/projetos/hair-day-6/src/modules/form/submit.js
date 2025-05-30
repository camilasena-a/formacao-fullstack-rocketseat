import dayjs from "dayjs"
import { addAgendamento } from "../../services/addAgendamento"

const form = document.querySelector("form")
const dataSelecionada = document.querySelector("#date")
const cliente = document.querySelector("#client")

//faremos com que ao carregar a pagina, o campo de data já esteja preenchido com a data de hoje

const dataAtual = dayjs(new Date()).format("YYYY-MM-DD")

dataSelecionada.value = dataAtual
dataSelecionada.min = dataAtual //também não permitiremos escolher data anterior a de hoje

form.onsubmit = async (event)=> {
  event.preventDefault()
  try {
    //capturando cliente
    const nomeCliente = cliente.value.trim()

    if(!nomeCliente) {
      return alert("Informe o nome do cliente!")
    }

    //capturando horario selecionado
    const horarioSelecionado = document.querySelector(".hour-selected")
    if(!horarioSelecionado) {
      return alert("Escolha um horário!")
    }
    //Capturando somente a hora

    const [hour] = horarioSelecionado.innerText.split(":")

    const when = dayjs(dataSelecionada.value).add(hour, "hour")

    await addAgendamento({
      nomeCliente, 
      when
    })
  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }
}