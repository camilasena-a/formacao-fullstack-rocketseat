import { apiConfig } from './api-config';
import dayjs from '../libs/dayjs';

export async function removerAgendamento(id) {
  try {
    console.log("🗑️ Iniciando remoção de agendamento:", id);
    
    // Validações básicas
    if (!id) {
      throw new Error('ID do agendamento é obrigatório');
    }

    console.log("🔄 Enviando requisição de remoção para API...");

    // Faz a requisição para remover o agendamento
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro na resposta da API:", response.status, errorText);
      throw new Error(`Erro do servidor: ${response.status} - ${errorText}`);
    }

    // Verifica se a resposta tem conteúdo
    const contentType = response.headers.get("content-type");
    let resultado = null;
    
    if (contentType && contentType.includes("application/json")) {
      resultado = await response.json();
    } else {
      resultado = { message: "Agendamento removido com sucesso" };
    }

    console.log("✅ Agendamento removido com sucesso:", resultado);
    
    return resultado;
    
  } catch (error) {
    console.error("❌ Erro ao remover agendamento:", error.message);
    
    // Lança erro específico para ser tratado pela UI
    throw new Error(`Erro ao remover agendamento: ${error.message}`);
  }
}

// Função para remover agendamento com confirmação
export async function removerAgendamentoComConfirmacao(agendamento) {
  try {
    console.log("🤔 Solicitando confirmação para remoção:", agendamento);
    
    // Validações básicas
    if (!agendamento || !agendamento.id) {
      throw new Error('Dados do agendamento são obrigatórios');
    }

    // Formata dados para exibição
    const dataFormatada = dayjs(agendamento.dataHora).format('DD/MM/YYYY');
    const horaFormatada = dayjs(agendamento.dataHora).format('HH:mm');
    
    // Solicita confirmação ao usuário
    const confirmacao = confirm(
      `🗑️ Confirma a remoção do agendamento?\n\n` +
      `🐾 Pet: ${agendamento.nomePet}\n` +
      `👤 Tutor: ${agendamento.nomeTutor}\n` +
      `📅 Data: ${dataFormatada}\n` +
      `⏰ Horário: ${horaFormatada}\n` +
      `🔹 Serviço: ${agendamento.servico}\n\n` +
      `⚠️ Esta ação não pode ser desfeita!`
    );

    if (!confirmacao) {
      console.log("❌ Usuário cancelou a remoção");
      return { cancelado: true };
    }

    console.log("✅ Usuário confirmou a remoção, prosseguindo...");

    // Remove o agendamento
    const resultado = await removerAgendamento(agendamento.id);
    
    // Mostra mensagem de sucesso
    console.log(`🎉 Agendamento removido: ${agendamento.nomePet} (${agendamento.nomeTutor}) - ${dataFormatada} às ${horaFormatada}`);
    
    return { ...resultado, confirmado: true };
    
  } catch (error) {
    console.error("❌ Erro ao remover agendamento com confirmação:", error.message);
    throw error;
  }
} 