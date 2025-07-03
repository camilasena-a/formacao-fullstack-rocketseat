import { horasLoad } from "../form/horasLoad.js";
import { agendamentoFetchByDay } from "../../services/agendamento-fetchByDay.js";
import dayjs from "../../libs/dayjs.js";
import { mostraAgendamentos } from "./show.js";

// Função para carregar agendamentos com base na data de visualização
export async function carregaAgendamentosPorData(data) {
  try {
    console.log("🚀 Iniciando carregamento de agendamentos para:", data);
    const agendamentos = await agendamentoFetchByDay(data);
    console.log("📦 Agendamentos retornados:", agendamentos);

    //exibe os agendamentos
    mostraAgendamentos(agendamentos);
  } catch (error) {
    console.error("❌ Erro ao buscar ou exibir agendamentos:", error);
  }
}

// Função para o formulário de agendamento
export async function agendaDoDia () {
  const dataSelecionada = document.querySelector("#appointment-date");
  
  if (!dataSelecionada) {
    console.error("❌ Elemento #appointment-date não encontrado!");
    return;
  }
  
  const data = dataSelecionada.value;
  
  if (data) {
    console.log("📅 Data selecionada no formulário:", data);
    
    // busca na API os agendamentos para carregar na tela
    // os horarios disponiveis (horario futuro e não ocupado)
    // renderiza os horarios na tela:
    await horasLoad(data);
    
    await carregaAgendamentosPorData(data);
  } else {
    console.log("⚠️ Nenhuma data selecionada no formulário");
  }
}

// Configuração do formulário (modal)
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎬 Configurando formulário de agendamento...");
  
  // Configura o input de data do formulário
  const dataSelecionada = document.querySelector("#appointment-date");
  if (dataSelecionada) {
    console.log("✅ Input de data do formulário encontrado");
    // Define data padrão como hoje
    dataSelecionada.value = dayjs().format("YYYY-MM-DD");

    // Carrega os horários iniciais
    agendaDoDia();

    // Adiciona evento para atualizar horários quando a data for alterada
    dataSelecionada.addEventListener("change", () => {
      agendaDoDia();
    });
  } else {
    console.log("⚠️ Input de data do formulário não encontrado");
  }
});