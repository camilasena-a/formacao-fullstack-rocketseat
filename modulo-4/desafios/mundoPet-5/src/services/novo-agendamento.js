import { apiConfig } from './api-config';
import { agendamentoFetchByDay } from './agendamento-fetchByDay';
import dayjs from '../libs/dayjs';

export async function novoAgendamento({id, dataHora, nomeTutor, nomePet, servico}) {
  try {
    console.log("🚀 Iniciando criação de novo agendamento:", {id, dataHora, nomeTutor, nomePet, servico});
    
    // Validações básicas
    if (!id || !dataHora || !nomeTutor || !nomePet || !servico) {
      throw new Error('Todos os campos são obrigatórios');
    }

    // ⚠️ VALIDAÇÃO CRÍTICA: Verificar conflito antes de enviar
    const dataAgendamento = dayjs(dataHora).format('YYYY-MM-DD');
    const horaAgendamento = dayjs(dataHora).format('HH:mm');
    
    console.log("🔍 Verificando conflitos finais para:", dataAgendamento, horaAgendamento);
    
    // Busca agendamentos existentes para verificação final
    const agendamentosExistentes = await agendamentoFetchByDay(dataAgendamento);
    
    // Verifica se já existe agendamento no mesmo horário
    const conflito = agendamentosExistentes.find(agendamento => {
      const horaExistente = dayjs(agendamento.dataHora).format("HH:mm");
      const mesmoHorario = horaExistente === horaAgendamento;
      
      if (mesmoHorario) {
        console.log("⚠️ CONFLITO DETECTADO na validação final:", {
          horaConflito: horaExistente,
          petExistente: agendamento.nomePet,
          tutorExistente: agendamento.nomeTutor,
          idExistente: agendamento.id
        });
      }
      
      return mesmoHorario;
    });
    
    if (conflito) {
      const mensagemErro = `Conflito detectado! Já existe um agendamento para ${horaAgendamento} no dia ${dayjs(dataAgendamento).format('DD/MM/YYYY')} (Pet: ${conflito.nomePet}, Tutor: ${conflito.nomeTutor})`;
      console.error("❌", mensagemErro);
      throw new Error(mensagemErro);
    }

    console.log("✅ Validação final aprovada, enviando para API...");

    // Faz a requisição para enviar os dados do agendamento
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, 
        dataHora: dayjs(dataHora).toISOString(), 
        nomeTutor, 
        nomePet, 
        servico
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro na resposta da API:", response.status, errorText);
      throw new Error(`Erro do servidor: ${response.status} - ${errorText}`);
    }

    const resultado = await response.json();
    console.log("✅ Agendamento criado com sucesso:", resultado);
    
    // Mostra uma mensagem de sucesso
    console.log(`🎉 Agendamento confirmado: ${nomePet} (${nomeTutor}) - ${dayjs(dataHora).format('DD/MM/YYYY [às] HH:mm')} - ${servico}`);
    
    return resultado;
    
  } catch (error) {
    console.error("❌ Erro ao criar agendamento:", error.message);
    
    // Se for erro de conflito, relança para que seja tratado pelo submit
    if (error.message.includes('Conflito detectado')) {
      throw error;
    }
    
    // Para outros erros, mostra mensagem genérica
    throw new Error('Erro ao criar agendamento. Verifique sua conexão e tente novamente.');
  }
}