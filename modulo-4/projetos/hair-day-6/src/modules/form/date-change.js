import { agendamentosDia } from "../schedules/load"

const dataSelecionada = document.getElementById("date")

dataSelecionada.onchange = () => agendamentosDia()