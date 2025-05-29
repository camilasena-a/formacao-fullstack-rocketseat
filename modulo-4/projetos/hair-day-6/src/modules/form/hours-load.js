import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours";
import { horaClick } from "./hours-click";

const ul = document.querySelector("#hours")

export function hoursLoad({data}) {
  //limpa lista de horarios
  ul.innerHTML = ""
  const aberto = openingHours.map((hora) => {
    // recuperando somente a hora, sem minutos
    const [horaDisponivel] = hora.split(":")
    // adiciona a hora na data e verifica se esta no futuro
    const isHoraFuturo = dayjs(data).add(horaDisponivel,"hour").isAfter(dayjs())

    return {
      hora,
      disponivel: isHoraFuturo
    }
  })

  //renderiza horarios
  aberto.forEach( ({hora, disponivel}) => {
    const li = document.createElement("li")
    
    li.classList.add("hour")
    li.classList.add(disponivel ? "hour-available" : "hour-unavailable")
    li.textContent = hora

    if(hora === "9:00") {
      headerHora("Manhã")
    } else if (hora == "13:00") {
      headerHora("Tarde")
    } else if (hora == "18:00") {
      headerHora("Noite")
    }

    ul.append(li)
  })

  horaClick()
}

function headerHora(titulo) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = titulo

  ul.append(header)
}