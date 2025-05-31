import { buscaAgendamento } from "../../services/buscaAgendamento";
import { hoursLoad } from "../form/hours-load";

const dataSelecionada = document.querySelector("#date")

export async function agendamentosDia() {
  // Obtem a data do imput
  const data = dataSelecionada.value
  // Busca na API os agendamentos do dia
  const daily = await buscaAgendamento({data})
  // Renderiza as horas disponiveis
  hoursLoad({data})
}
