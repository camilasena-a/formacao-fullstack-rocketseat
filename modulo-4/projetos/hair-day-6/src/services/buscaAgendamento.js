import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function buscaAgendamento({ data }) {
  try {
    // Faz a requisição de busca
    const resposta = await fetch(`${apiConfig.baseURL}/agendamentos`);

    // Converte para JSON
    const dataJson = await resposta.json();

    // Filtra os agendamentos pelo dia selecionado

    const daily = dataJson.filter((agendamento) => {
      dayjs(data).isSame(agendamento.when, "day");
    });

    return daily
  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado");
  }
}
