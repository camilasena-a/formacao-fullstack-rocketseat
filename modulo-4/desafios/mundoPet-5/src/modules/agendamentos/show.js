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

    //renderizando por periodo
    agendamentos.forEach((agendamento, index) => {
      console.log(`🔄 Processando agendamento ${index + 1}:`, agendamento);
      
      const li = document.createElement("li")

      //hora do agendamento
      const time = document.createElement("time")
      const agendamentoDayjs = dayjs(agendamento.dataHora)
      const hora = agendamentoDayjs.hour()
      time.textContent = agendamentoDayjs.format("HH:mm")
      
      console.log(`⏰ Hora do agendamento: ${hora}h (${time.textContent})`);

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

      //renderizando os agendamentos conforme periodo
      if (hora < 12) {
        console.log(`🌅 Adicionando à manhã: ${agendamento.nomePet}`);
        ulManha.appendChild(li)
      } else if (hora < 18) {
        console.log(`🌞 Adicionando à tarde: ${agendamento.nomePet}`);
        ulTarde.appendChild(li)
      } else {
        console.log(`🌙 Adicionando à noite: ${agendamento.nomePet}`);
        ulNoite.appendChild(li)
      }
    })
    
    console.log("✅ Renderização concluída!");
    
  } catch (error) {
    console.error("❌ Erro ao exibir os agendamentos:", error)
    alert("Erro ao exibir os agendamentos. Verifique o console para mais detalhes.")
  }
}




