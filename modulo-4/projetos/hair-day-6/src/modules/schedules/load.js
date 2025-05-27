import { hoursLoad } from "../form/hours-load";

const dataSelecionada = document.querySelector("#date")

export function agendamentosDia() {
  const data = dataSelecionada.value
  hoursLoad({data})
}