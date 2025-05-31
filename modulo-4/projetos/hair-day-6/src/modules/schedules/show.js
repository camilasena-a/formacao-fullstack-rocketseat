import dayjs from "dayjs";

// Seleciona as sessões Manhã, Tarde e Noite

const periodoManha = document.getElementById("period-morning");
const periodoTarde = document.getElementById("period-afternoon");
const periodoNoite = document.getElementById("period-night");

export function mostraAgendamento({ dailyAgendamentos }) {
  try {
    //Limpa os agendamentos por período
    periodoManha.innerHTML = "";
    periodoTarde.innerHTML = "";
    periodoNoite.innerHTML = "";

    // Renderiza os agendamentos por periodo

    dailyAgendamentos.array.forEach((agendamento) => {
      const item = document.createElement("li");
      const time = document.createElement("strong");
      const name = document.createElement("span");

      // Adiciona o id do agendamento

      item.setAttribute("data-id", agendamento.id);
      time.textContent = dayjs(agendamento.when).format("HH:mm");
      name.textContent = agendamento.nomeCliente;

      //Cria o icone de cancelar agendamento

      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
      cancelIcon.setAttribute("alt", "Cancelar");

      // Adiciona tempo, nome e icone no item

      item.append(time, name, cancelIcon);

      // Obtem somente a hora
      const hora = dayjs(agendamento.when).hour();

      //Renderiza o agendamento na sessão (Manhã, Tarde ou Noite)

      if (hora <= 12) {
        periodoManha.appendChild(item);
      } else if (hora > 12 && hora <= 18) {
        periodoTarde.appendChild(item);
      } else {
        periodoNoite.appendChild(item);
      }
    });
  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar agendamentos");
  }
}
