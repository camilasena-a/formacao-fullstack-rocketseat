const messageBar = document.querySelector('.notification')
//-----------------------------------  adição itens da lista -----------------------------------//
const input = document.querySelector('#ad-item-input')
const addButton = document.querySelector('.add-item-button')
const shoppingList = document.querySelector('.shopping-list')

addButton.addEventListener('click', () => {
  const newListItem = document.createElement('div')
  newListItem.classList.add('list-item')
  const newListItemContent = document.createElement('div')
  newListItemContent.classList.add('item-content')
  const newListItemCheckbox = document.createElement('div')
  newListItemCheckbox.classList.add('checkbox')
  newListItemCheckbox.addEventListener('click', function() {
    this.classList.toggle('checked');
  });
  const newListItemText = document.createElement('div')
  const newListItemButton = document.createElement('button')
  newListItemButton.innerHTML = `<svg class="trash-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`


  newListItemButton.classList.add('delete-button')

  newListItemButton.addEventListener('click', () => {
    messageBar.classList.add('show-exclusion')
    const itemRemove = newListItemButton.closest('.list-item')
    itemRemove.remove()
    })


  newListItemContent.append(newListItemCheckbox,newListItemText)
  newListItem.append(newListItemContent,newListItemButton)
  shoppingList.appendChild(newListItem)

  newListItemText.textContent = input.value
  console.log(newListItemText)
  console.log(newItem)
})



//-----------------------------------  remover itens da lista -----------------------------------//




const deleteButtons = document.querySelectorAll('.delete-button') // armazena todas as tags com classe .delete-button em uma variável do tipo nodelist, comportamento parecido com array.


deleteButtons.forEach(deleteButton => { // para cada elemento do nodelist deleteButtons:
  deleteButton.addEventListener('click', () => {
    messageBar.classList.add('show-exclusion') // mostra a barra de notificação da exclusão
    const itemRemove = deleteButton.closest('.list-item') //o método .closest('.nome-da-classe') seleciona o elemento pai mais proximo com essa classe
    itemRemove.remove()
  })
})


//-----------------------------------  barra de notificação -----------------------------------//

const closeButtons = document.querySelectorAll('.close-notification')

closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    messageBar.classList.remove('show-exclusion')
  })
})


//-----------------------------------  checkbox -----------------------------------//

const checkboxes = document.querySelectorAll('.checkbox')


checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', function() {
      this.classList.toggle('checked');
    });
  });
