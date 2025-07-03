import dayjs from 'dayjs'
import { apiConfig } from './api-config';

export async function agendamentoFetchByDay(data) {
  try {
    //faz a requisição para buscar os agendamentos
    const resposta = await fetch(`${apiConfig.baseUrl}/agendamentos`)
    //converte a resposta para json
    const datasResposta = await resposta.json()
    //filtra os agendamentos pela data selecionada
    const agendaDoDia = datasResposta.filter(agendamento => {
      dayjs(data).isSame(agendamento.dataHora, 'day')
    })
    return agendaDoDia
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao buscar agendamentos')
  }
}