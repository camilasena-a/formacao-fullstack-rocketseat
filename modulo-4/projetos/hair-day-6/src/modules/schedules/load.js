import { buscaAgendamento } from "../../services/buscaAgendamento";
import { hoursLoad } from "../form/hours-load";
import { mostraAgendamento } from "./show";

const dataSelecionada = document.querySelector("#date");

export async function agendamentosDia() {
  // Obtem a data do imput
  const data = dataSelecionada.value;
  // Busca na API os agendamentos do dia
  const daily = await buscaAgendamento({ data });
  // Exibe os agendamentos
  mostraAgendamento({ daily });
  // Renderiza as horas disponiveis
  hoursLoad({ data });
}
