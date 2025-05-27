export function horaClick() {
  const horasDisponiveis = document.querySelectorAll(".hour-available")

  horasDisponiveis.forEach((disponivel)=>{

    disponivel.addEventListener("click", (selected) => {

      horasDisponiveis.forEach((hora) => {
        hora.classList.remove("hour-selected")
      })
  
      selected.target.classList.add("hour-selected")
    })
  })
}