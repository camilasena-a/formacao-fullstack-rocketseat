import { horarioFuncionamento } from "../../utils/hr-funcionamento.js";
import { agendamentoFetchByDay } from "../../services/agendamento-fetchByDay.js";
import dayjs from "../../libs/dayjs.js";

export async function horasLoad (data) {
  const selectHorario = document.querySelector("#appointment-time");
  
  if (!selectHorario) {
    console.error("Elemento #appointment-time não encontrado!");
    return;
  }
  
  console.log("🕐 Carregando horários para:", data);
  
  // Limpa as opções existentes, mantendo apenas o placeholder
  selectHorario.innerHTML = '<option value="">Horário</option>';

  try {
    // Busca agendamentos existentes para a data selecionada
    const agendamentosExistentes = await agendamentoFetchByDay(data);
    console.log("📋 Agendamentos existentes encontrados:", agendamentosExistentes);
    
    // Extrai os horários já ocupados
    const horariosOcupados = agendamentosExistentes.map(agendamento => {
      const horaAgendamento = dayjs(agendamento.dataHora).format("HH:mm");
      console.log("🚫 Horário ocupado:", horaAgendamento);
      return horaAgendamento;
    });
    
    console.log("⏰ Lista de horários ocupados:", horariosOcupados);

    const verificaDisponivel = horarioFuncionamento.map((horario) => {
      // Constrói a data e hora completa para comparação
      const dataHoraCompleta = dayjs(`${data} ${horario}`);

      // Verifica se o horário é no futuro (após o momento atual)
      const isHoraFutura = dataHoraCompleta.isAfter(dayjs());
      
      // Verifica se o horário não está ocupado
      const isHorarioLivre = !horariosOcupados.includes(horario);
      
      // Horário está disponível se for no futuro E não estiver ocupado
      const isHoraDisponivel = isHoraFutura && isHorarioLivre;
      
      const motivoIndisponivel = !isHoraFutura ? "passado" : !isHorarioLivre ? "ocupado" : null;

      console.log(`🔍 ${horario}: futuro=${isHoraFutura}, livre=${isHorarioLivre}, disponível=${isHoraDisponivel}${motivoIndisponivel ? ` (${motivoIndisponivel})` : ""}`);

      return { horario, disponivel: isHoraDisponivel, motivo: motivoIndisponivel }
    });

    // Organiza os horários por período
    const periodos = {
      manha: verificaDisponivel.filter(({horario}) => {
        const hora = parseInt(horario.split(":")[0]);
        return hora >= 8 && hora < 12;
      }),
      tarde: verificaDisponivel.filter(({horario}) => {
        const hora = parseInt(horario.split(":")[0]);
        return hora >= 12 && hora < 18;
      }),
      noite: verificaDisponivel.filter(({horario}) => {
        const hora = parseInt(horario.split(":")[0]);
        return hora >= 18;
      })
    };

    // Adiciona optgroup para Manhã
    if (periodos.manha.length > 0) {
      const optgroupManha = document.createElement("optgroup");
      optgroupManha.label = "Manhã";
      
      periodos.manha.forEach(({horario, disponivel, motivo}) => {
        const option = document.createElement("option");
        option.value = horario;
        
        if (!disponivel) {
          option.disabled = true;
          option.classList.add("disabled");
          // Adiciona indicação do motivo da indisponibilidade
          option.textContent = `${horario} ${motivo === "ocupado" ? "(Ocupado)" : "(Indisponível)"}`;
        } else {
          option.textContent = horario;
        }
        
        optgroupManha.appendChild(option);
      });
      
      selectHorario.appendChild(optgroupManha);
    }

    // Adiciona optgroup para Tarde
    if (periodos.tarde.length > 0) {
      const optgroupTarde = document.createElement("optgroup");
      optgroupTarde.label = "Tarde";
      
      periodos.tarde.forEach(({horario, disponivel, motivo}) => {
        const option = document.createElement("option");
        option.value = horario;
        
        if (!disponivel) {
          option.disabled = true;
          option.classList.add("disabled");
          // Adiciona indicação do motivo da indisponibilidade
          option.textContent = `${horario} ${motivo === "ocupado" ? "(Ocupado)" : "(Indisponível)"}`;
        } else {
          option.textContent = horario;
        }
        
        optgroupTarde.appendChild(option);
      });
      
      selectHorario.appendChild(optgroupTarde);
    }

    // Adiciona optgroup para Noite
    if (periodos.noite.length > 0) {
      const optgroupNoite = document.createElement("optgroup");
      optgroupNoite.label = "Noite";
      
      periodos.noite.forEach(({horario, disponivel, motivo}) => {
        const option = document.createElement("option");
        option.value = horario;
        
        if (!disponivel) {
          option.disabled = true;
          option.classList.add("disabled");
          // Adiciona indicação do motivo da indisponibilidade
          option.textContent = `${horario} ${motivo === "ocupado" ? "(Ocupado)" : "(Indisponível)"}`;
        } else {
          option.textContent = horario;
        }
        
        optgroupNoite.appendChild(option);
      });
      
      selectHorario.appendChild(optgroupNoite);
    }
    
    // Conta quantos horários estão disponíveis
    const totalDisponiveis = verificaDisponivel.filter(({disponivel}) => disponivel).length;
    const totalOcupados = horariosOcupados.length;
    
    console.log(`📊 Resumo: ${totalDisponiveis} horários disponíveis, ${totalOcupados} ocupados`);
    
    // Se não há horários disponíveis, adiciona uma mensagem
    if (totalDisponiveis === 0) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Nenhum horário disponível";
      option.disabled = true;
      selectHorario.appendChild(option);
      
      console.log("⚠️ Nenhum horário disponível para esta data");
    }
    
  } catch (error) {
    console.error("❌ Erro ao carregar horários:", error);
    
    // Em caso de erro, carrega horários sem verificar agendamentos
    const verificaDisponivel = horarioFuncionamento.map((horario) => {
      const dataHoraCompleta = dayjs(`${data} ${horario}`);
      const isHoraDisponivel = dataHoraCompleta.isAfter(dayjs());
      return { horario, disponivel: isHoraDisponivel }
    });

    verificaDisponivel.forEach(({horario, disponivel}) => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      if (!disponivel) {
        option.disabled = true;
        option.classList.add("disabled");
      }
      selectHorario.appendChild(option);
    });
  }
}