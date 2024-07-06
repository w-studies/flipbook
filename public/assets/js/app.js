const flipBook = (book, buttonsContainer) => {
  const pages = book.children
  const buttons = buttonsContainer.children

  // listen for button clicks
  buttonsContainer.onclick = e => {
    e.preventDefault()
    const { target } = e

    if (target.matches('button')) {
      const buttonIndex = Array.prototype.indexOf.call(buttons, target)
      setButtonActive(buttonIndex)
      flipPage(buttonIndex)
    }
  }

  const setButtonActive = index => {
    for (const button of buttons) {
      button.classList.remove('active')
    }
    buttons[index].classList.add('active')

    // move vertical marker
    buttonsContainer.style.setProperty('--active-index', index)
  }

  const flipPage = index => {
    // todas antes dessa devem ser flipadas
    for (let i = --index; i > -1; i--) {
      console.log('ativar :>> ', i)
      flip(pages[i], i)
    }
    // todas depois dessa, devem ser desflipadas
    for (let i = ++index; i < pages.length; i++) {
      flip(pages[i], i, 'remove')
    }
    flip(pages[index], index)
  }

  const flip = (page, index, action = 'add') => {
    page.style.setProperty('--active-index', `${index * 2}deg`)
    page.classList[action]('active')
  }
}

flipBook(
  document.querySelector('div.flip-cards-container'),
  document.querySelector('div.buttons-container')
)
