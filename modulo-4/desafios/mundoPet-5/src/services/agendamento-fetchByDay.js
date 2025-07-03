import dayjs from 'dayjs'
import { apiConfig } from './api-config';

export async function agendamentoFetchByDay(data) {
  try {
    console.log('🔍 Buscando agendamentos para a data:', data);
    
    //faz a requisição para buscar os agendamentos
    const resposta = await fetch(`${apiConfig.baseUrl}/agendamentos`)
    //converte a resposta para json
    const datasResposta = await resposta.json()
    
    console.log('📊 Dados recebidos da API:', datasResposta);
    
    //filtra os agendamentos pela data selecionada
    const agendaDoDia = datasResposta.filter(agendamento => {
      const dataAgendamento = dayjs(agendamento.dataHora);
      const dataBusca = dayjs(data);
      
      console.log('🗓️ Comparando:');
      console.log('  Data do agendamento:', dataAgendamento.format('YYYY-MM-DD'));
      console.log('  Data da busca:', dataBusca.format('YYYY-MM-DD'));
      
      const saoIguais = dataAgendamento.format('YYYY-MM-DD') === dataBusca.format('YYYY-MM-DD');
      console.log('  São iguais?', saoIguais);
      
      return saoIguais;
    })
    
    console.log('✅ Agendamentos filtrados:', agendaDoDia);
    return agendaDoDia
  } catch (error) {
    console.log('❌ Erro ao buscar agendamentos:', error)
    throw new Error('Erro ao buscar agendamentos')
  }
}