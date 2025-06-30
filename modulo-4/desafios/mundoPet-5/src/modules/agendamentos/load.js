import { horasLoad } from "../form/horasLoad.js";
import dayjs from "../../libs/dayjs.js";

// Função para aguardar o DOM estar carregado
function aguardarDOM() {
  return new Promise(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });
}

export function agendaDoDia () {
  const dataSelecionada = document.querySelector("#appointment-date");
  
  if (!dataSelecionada) {
    console.error("Elemento #appointment-date não encontrado!");
    return;
  }
  
  const data = dataSelecionada.value;
  
  if (data) {
    // busca na API os agendamentos para carregar na tela
    // os horarios disponiveis (horario futuro e não ocupado)
    // renderiza os horarios na tela:
    horasLoad(data);
  }
}

// Aguarda o DOM carregar completamente
aguardarDOM().then(() => {
  const dataSelecionada = document.querySelector("#appointment-date");
  
  if (dataSelecionada) {
    // Define data padrão como hoje
    dataSelecionada.value = dayjs().format("YYYY-MM-DD");

    // Carrega os horários iniciais
    agendaDoDia();

    // Adiciona evento para atualizar horários quando a data for alterada
    dataSelecionada.addEventListener("change", () => {
      agendaDoDia();
    });
  } else {
    console.error("Elemento #appointment-date não encontrado após DOM carregado!");
  }
});