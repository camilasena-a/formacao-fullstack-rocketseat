import dayjs from "dayjs"
const dataVisualizacao = document.querySelector("#data-visualizacao")

const dataAtual = dayjs(new Date()).format("YYYY-MM-DD")

dataVisualizacao.value = dataAtual