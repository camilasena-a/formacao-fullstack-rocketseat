import dayjs from "dayjs"
import { carregaAgendamentosPorData } from "../agendamentos/load.js"

const dataVisualizacao = document.querySelector("#data-visualizacao")

if (dataVisualizacao) {
  const dataAtual = dayjs(new Date()).format("YYYY-MM-DD")
  dataVisualizacao.value = dataAtual
  
  console.log("📅 Data de visualização definida:", dataAtual)
  
  // Carrega os agendamentos para a data atual
  carregaAgendamentosPorData(dataAtual)
  
  // Adiciona listener para mudanças na data
  dataVisualizacao.addEventListener("change", () => {
    console.log("🔄 Data de visualização alterada para:", dataVisualizacao.value)
    carregaAgendamentosPorData(dataVisualizacao.value)
  })
}