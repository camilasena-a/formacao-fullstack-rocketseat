import { apiConfig } from './api-config';

export async function novoAgendamento({id, dataHora, nomeTutor, nomePet}) {
  try {
    await fetch(`${apiConfig.baseUrl}/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, dataHora, nomeTutor, nomePet}),
    })
    alert('Agendamento criado com sucesso')
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao criar agendamento')
  }
}