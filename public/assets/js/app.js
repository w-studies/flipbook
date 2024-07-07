const flipBook = book => {
  const bookBody = book.querySelector('div.flip-cards-body')
  const pages = Array.from(bookBody.querySelectorAll('div[data-page]'))

  const flipPage = pageToFlip => {
    const [page] = pages.filter(page => page.dataset.page === pageToFlip)

    if (!page) {
      // unflip all
      for (const i in pages) {
        flip(pages[i], 'remove')
      }
      return
    }

    const pageIndex = pages.indexOf(page)
    // unflip all pages after
    for (let i = pageIndex; i > -1; i--) {
      flip(pages[i], 'remove')
    }
    // flip all pages before
    for (let i = pageIndex; i < pages.length; i++) {
      flip(pages[i])
    }
    flip(page)
  }

  const flip = (page, action = 'add') => {
    if (page) {
      page.style.setProperty('--active-index', page.dataset.page)
      page.classList[action]('active')
    }
  }

  flipPage(0)

  return {
    flipPage
  }
}

const flipBookOne = flipBook(document.querySelector('div.flip-cards-container'))

const buttonsContainer = document.querySelector('div.buttons-container')
const buttons = buttonsContainer.children
// listen for button clicks
buttonsContainer.onclick = e => {
  e.preventDefault()
  const { target } = e

  if (target.matches('button')) {
    const pageToFlip = target.dataset.flip
    setButtonActive(target)
    flipBookOne.flipPage(pageToFlip)
  }
}

const setButtonActive = button => {
  for (const button of buttons) {
    button.classList.remove('active')
  }

  button.classList.add('active')
  const index = Array.prototype.indexOf.call(buttons, button)

  // move vertical marker
  buttonsContainer.style.setProperty('--active-index', index)
}
