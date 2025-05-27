// Esse arquivo serve para capturar o evento de quando a tela terminar de carregar os elementos

// roda quando a pagina for completamente carregada

import { agendamentosDia } from "./schedules/load"

document.addEventListener("DOMContentLoaded", () => {
  agendamentosDia()
})