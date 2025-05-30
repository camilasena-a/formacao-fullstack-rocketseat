import { apiConfig } from "./api-config";

export async function addAgendamento({nomeCliente, when}) {
  try {
    await fetch(`${apiConfig.baseURL}/agendamentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nomeCliente, when})
    })
    alert("Agendamento realizado com sucesso")
  } catch (error) {
    console.log(error)
    alert("Não foi possível agendar. Tente novamente mais tarde")
  }

}