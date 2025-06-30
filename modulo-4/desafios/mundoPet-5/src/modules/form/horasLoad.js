import { horarioFuncionamento } from "../../utils/hr-funcionamento.js";
import dayjs from "../../libs/dayjs.js";

export function horasLoad (data) {
  const selectHorario = document.querySelector("#appointment-time");
  
  if (!selectHorario) {
    console.error("Elemento #appointment-time não encontrado!");
    return;
  }
  
  // Limpa as opções existentes, mantendo apenas o placeholder
  selectHorario.innerHTML = '<option value="">Selecione um horário</option>';

  const verificaDisponivel = horarioFuncionamento.map((horario) => {
    // Constrói a data e hora completa para comparação
    const dataHoraCompleta = dayjs(`${data} ${horario}`);

    // Verifica se o horário é no futuro (após o momento atual)
    const isHoraDisponivel = dataHoraCompleta.isAfter(dayjs());

    return { horario, disponivel: isHoraDisponivel }
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
      return hora >= 18 && hora <= 20;
    })
  };

  // Adiciona optgroup para Manhã
  if (periodos.manha.length > 0) {
    const optgroupManha = document.createElement("optgroup");
    optgroupManha.label = "Manhã";
    
    periodos.manha.forEach(({horario, disponivel}) => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      if (!disponivel) {
        option.disabled = true;
        option.classList.add("disabled");
      }
      optgroupManha.appendChild(option);
    });
    
    selectHorario.appendChild(optgroupManha);
  }

  // Adiciona optgroup para Tarde
  if (periodos.tarde.length > 0) {
    const optgroupTarde = document.createElement("optgroup");
    optgroupTarde.label = "Tarde";
    
    periodos.tarde.forEach(({horario, disponivel}) => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      if (!disponivel) {
        option.disabled = true;
        option.classList.add("disabled");
      }
      optgroupTarde.appendChild(option);
    });
    
    selectHorario.appendChild(optgroupTarde);
  }

  // Adiciona optgroup para Noite
  if (periodos.noite.length > 0) {
    const optgroupNoite = document.createElement("optgroup");
    optgroupNoite.label = "Noite";
    
    periodos.noite.forEach(({horario, disponivel}) => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      if (!disponivel) {
        option.disabled = true;
        option.classList.add("disabled");
      }
      optgroupNoite.appendChild(option);
    });
    
    selectHorario.appendChild(optgroupNoite);
  }
}