import dayjs from "dayjs"
import { novoAgendamento } from "../../services/novo-agendamento"
import { agendamentoFetchByDay } from "../../services/agendamento-fetchByDay"
import { agendaDoDia } from "../agendamentos/load"

const form = document.querySelector(".modal-form")
const dataFormulario = document.querySelector("#appointment-date")

// Configurando data
const dataAtual = dayjs(new Date()).format("YYYY-MM-DD")
dataFormulario.value = dataAtual
dataFormulario.min = dataAtual

// Configurando hora
const horaAtual = dayjs(new Date()).format("HH:mm")

// Função para verificar se já existe agendamento no mesmo horário
async function verificarConflito(dataAgendamento, horaAgendamento) {
  try {
    console.log("🔍 Verificando conflitos para:", dataAgendamento, horaAgendamento);
    
    // Busca agendamentos existentes para a data
    const agendamentosExistentes = await agendamentoFetchByDay(dataAgendamento);
    
    // Verifica se já existe agendamento no mesmo horário
    const conflito = agendamentosExistentes.find(agendamento => {
      const horaExistente = dayjs(agendamento.dataHora).format("HH:mm");
      const mesmoHorario = horaExistente === horaAgendamento;
      
      if (mesmoHorario) {
        console.log("⚠️ Conflito encontrado:", {
          horaConflito: horaExistente,
          petExistente: agendamento.nomePet,
          tutorExistente: agendamento.nomeTutor
        });
      }
      
      return mesmoHorario;
    });
    
    return conflito;
  } catch (error) {
    console.error("❌ Erro ao verificar conflitos:", error);
    return null; // Em caso de erro, permite continuar
  }
}

// Função para exibir mensagens de erro/sucesso
function exibirMensagem(mensagem, tipo = 'erro') {
  // Remove mensagem anterior se existir
  const mensgemAnterior = document.querySelector('.form-message');
  if (mensgemAnterior) {
    mensgemAnterior.remove();
  }
  
  const divMensagem = document.createElement('div');
  divMensagem.className = `form-message ${tipo}`;
  divMensagem.style.cssText = `
    padding: 12px;
    margin: 10px 0;
    border-radius: 6px;
    font-weight: 600;
    text-align: center;
    ${tipo === 'erro' 
      ? 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
      : 'background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3);'
    }
  `;
  divMensagem.textContent = mensagem;
  
  // Adiciona antes dos botões
  const modalActions = document.querySelector('.modal-actions');
  modalActions.parentNode.insertBefore(divMensagem, modalActions);
  
  // Remove a mensagem após 5 segundos
  setTimeout(() => {
    if (divMensagem.parentNode) {
      divMensagem.remove();
    }
  }, 5000);
}

form.onsubmit = async (event) => {
  event.preventDefault()
  
  try {
    console.log("📝 Iniciando envio do formulário...");
    
    // Recuperando dados do formulário
    const nomeTutor = document.querySelector("#tutor-name").value.trim()
    const nomePet = document.querySelector("#pet-name").value.trim()
    const telefoneTutor = document.querySelector("#phone").value.trim()
    const servico = document.querySelector("#service").value
    const dataAgendamento = document.querySelector("#appointment-date").value
    const horaAgendamento = document.querySelector("#appointment-time").value

    // Validações básicas
    if (!nomeTutor || !nomePet || !telefoneTutor || !servico || !dataAgendamento || !horaAgendamento) {
      exibirMensagem("Por favor, preencha todos os campos obrigatórios.", 'erro');
      return;
    }

    console.log("📋 Dados do formulário:", {nomeTutor, nomePet, telefoneTutor, servico, dataAgendamento, horaAgendamento});

    // ⚠️ VALIDAÇÃO CRÍTICA: Verificar conflito de horário
    const conflito = await verificarConflito(dataAgendamento, horaAgendamento);
    
    if (conflito) {
      const mensagemConflito = `❌ CONFLITO DETECTADO!\n\nJá existe um agendamento para ${horaAgendamento} no dia ${dayjs(dataAgendamento).format('DD/MM/YYYY')}:\n\n🐾 Pet: ${conflito.nomePet}\n👤 Tutor: ${conflito.nomeTutor}\n🔹 Serviço: ${conflito.servico}\n\nPor favor, escolha outro horário.`;
      
      exibirMensagem("Este horário já está ocupado! Escolha outro horário disponível.", 'erro');
      alert(mensagemConflito);
      
      // Recarrega os horários para atualizar a interface
      await agendaDoDia();
      return;
    }

    console.log("✅ Nenhum conflito encontrado, prosseguindo com o agendamento...");

    // Insere a hora na data
    const [hora] = horaAgendamento.split(":")
    const dataHora = dayjs(dataAgendamento).add(hora, "hour")
    
    // Gera um id único
    const id = new Date().getTime().toString()

    console.log("💾 Criando agendamento:", {dataHora: dataHora.toISOString(), id, nomeTutor, nomePet, servico});
    
    // Cria o agendamento
    await novoAgendamento({dataHora, id, nomeTutor, nomePet, servico})
    
    // Sucesso!
    exibirMensagem("✅ Agendamento criado com sucesso!", 'sucesso');
    
    // Limpa o formulário
    form.reset();
    dataFormulario.value = dataAtual; // Restaura data padrão
    
    // Recarrega os horários disponíveis para refletir o novo agendamento
    console.log("🔄 Recarregando horários disponíveis...");
    await agendaDoDia();
    
    // Fecha o modal após 2 segundos
    setTimeout(() => {
      if (typeof closeModal === 'function') {
        closeModal();
      } else {
        document.getElementById('modal-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '';
      }
    }, 2000);
    
  } catch (error) {
    console.error("❌ Erro ao enviar o formulário:", error);
    exibirMensagem("Erro ao criar agendamento. Tente novamente.", 'erro');
    alert("❌ Erro ao enviar o formulário. Verifique sua conexão e tente novamente.");
  }
}