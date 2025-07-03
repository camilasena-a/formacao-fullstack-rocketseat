import dayjs from "../../libs/dayjs.js";

// separando as sessoes por periodo

const periodos = document.querySelectorAll(".period")
const periodoManha = periodos[0]
const periodoTarde = periodos[1]
const periodoNoite = periodos[2]

// Função para encontrar ou criar UL dentro de uma section
function encontrarOuCriarUL(section) {
  let ul = section.querySelector("ul")
  if (!ul) {
    ul = document.createElement("ul")
    section.appendChild(ul)
  }
  return ul
}

// Função para ordenar agendamentos por horário
function ordenarAgendamentosPorHorario(agendamentos) {
  console.log("🔄 Ordenando agendamentos por horário...");
  
  return agendamentos.sort((a, b) => {
    const horaA = dayjs(a.dataHora);
    const horaB = dayjs(b.dataHora);
    
    // Ordenação crescente por horário
    return horaA.isBefore(horaB) ? -1 : horaA.isAfter(horaB) ? 1 : 0;
  });
}

// Função para separar agendamentos por período e ordenar cada período
function separarEOrdenarPorPeriodo(agendamentos) {
  const periodos = {
    manha: [],
    tarde: [],
    noite: []
  };
  
  agendamentos.forEach(agendamento => {
    const hora = dayjs(agendamento.dataHora).hour();
    
    if (hora < 12) {
      periodos.manha.push(agendamento);
    } else if (hora < 18) {
      periodos.tarde.push(agendamento);
    } else {
      periodos.noite.push(agendamento);
    }
  });
  
  // Ordena cada período separadamente
  periodos.manha = ordenarAgendamentosPorHorario(periodos.manha);
  periodos.tarde = ordenarAgendamentosPorHorario(periodos.tarde);
  periodos.noite = ordenarAgendamentosPorHorario(periodos.noite);
  
  console.log("📊 Agendamentos separados por período:", {
    manhã: periodos.manha.length,
    tarde: periodos.tarde.length,
    noite: periodos.noite.length
  });
  
  return periodos;
}

// Função para criar elemento LI do agendamento
function criarElementoAgendamento(agendamento) {
  const li = document.createElement("li")

  //hora do agendamento
  const time = document.createElement("time")
  const agendamentoDayjs = dayjs(agendamento.dataHora)
  time.textContent = agendamentoDayjs.format("HH:mm")

  //detalhes do cliente
  const clientDetails = document.createElement("div")
  clientDetails.classList.add("client-details")
  clientDetails.innerHTML = `<strong>${agendamento.nomePet}</strong> / ${agendamento.nomeTutor}`

  //detalhes do serviço
  const service = document.createElement("span")
  service.textContent = agendamento.servico || "Serviço não especificado"
  service.classList.add("service")

  //botão de remover agendamento
  const removeBtn = document.createElement("button")
  removeBtn.textContent = "Remover agendamento"
  removeBtn.classList.add("remove-btn")

  //adicionando os elementos ao li
  li.appendChild(time)
  li.appendChild(clientDetails)
  li.appendChild(service)
  li.appendChild(removeBtn)
  
  return li;
}

export function mostraAgendamentos(agendamentos) {
  console.log("🎯 Função mostraAgendamentos chamada com:", agendamentos);
  
  try {
    // Verifica se os elementos existem
    if (!periodoManha || !periodoTarde || !periodoNoite) {
      console.error("❌ Elementos de período não encontrados no DOM");
      console.log("periodoManha:", periodoManha);
      console.log("periodoTarde:", periodoTarde);
      console.log("periodoNoite:", periodoNoite);
      return;
    }
    
    console.log("✅ Elementos de período encontrados");
    
    // Encontra ou cria os UL para cada período
    const ulManha = encontrarOuCriarUL(periodoManha)
    const ulTarde = encontrarOuCriarUL(periodoTarde)
    const ulNoite = encontrarOuCriarUL(periodoNoite)
    
    console.log("📋 ULs criados/encontrados:", { ulManha, ulTarde, ulNoite });
    
    // Limpa apenas o conteúdo dos ULs, preservando os títulos
    ulManha.innerHTML = ""
    ulTarde.innerHTML = ""
    ulNoite.innerHTML = ""

    // Verifica se há agendamentos para exibir
    if (!agendamentos || agendamentos.length === 0) {
      console.log("⚠️ Nenhum agendamento encontrado para exibir");
      return;
    }

    console.log(`📅 Processando ${agendamentos.length} agendamento(s)`);

    // 🔄 NOVA FUNCIONALIDADE: Ordenar agendamentos por horário
    const agendamentosOrdenados = ordenarAgendamentosPorHorario([...agendamentos]);
    console.log("✅ Agendamentos ordenados por horário:", agendamentosOrdenados.map(ag => ({
      pet: ag.nomePet,
      hora: dayjs(ag.dataHora).format("HH:mm")
    })));

    // Separar agendamentos por período, mantendo ordenação
    const periodosSeparados = separarEOrdenarPorPeriodo(agendamentosOrdenados);

    // Renderizar agendamentos da manhã
    periodosSeparados.manha.forEach(agendamento => {
      console.log(`🌅 Adicionando à manhã: ${agendamento.nomePet} às ${dayjs(agendamento.dataHora).format("HH:mm")}`);
      const li = criarElementoAgendamento(agendamento);
      ulManha.appendChild(li);
    });

    // Renderizar agendamentos da tarde
    periodosSeparados.tarde.forEach(agendamento => {
      console.log(`🌞 Adicionando à tarde: ${agendamento.nomePet} às ${dayjs(agendamento.dataHora).format("HH:mm")}`);
      const li = criarElementoAgendamento(agendamento);
      ulTarde.appendChild(li);
    });

    // Renderizar agendamentos da noite
    periodosSeparados.noite.forEach(agendamento => {
      console.log(`🌙 Adicionando à noite: ${agendamento.nomePet} às ${dayjs(agendamento.dataHora).format("HH:mm")}`);
      const li = criarElementoAgendamento(agendamento);
      ulNoite.appendChild(li);
    });
    
    console.log("✅ Renderização concluída com ordenação por horário!");
    
  } catch (error) {
    console.error("❌ Erro ao exibir os agendamentos:", error)
    alert("Erro ao exibir os agendamentos. Verifique o console para mais detalhes.")
  }
}




