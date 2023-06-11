const mentionsTemplate = document.createElement('template')
mentionsTemplate.innerHTML = /* html */ `
<style>
  div.wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border: 1px solid grey;
    padding: 10px;
    border-radius: 20px;
    max-width: 450px;
  }
  div.input {
    height: auto;
    min-height: 20px;
    width: 380px;
    padding: 4px 10px;
  }
  div.input:focus{
    border: 1px solid grey;
    outline: none;
    
  }
  button{
    border-radius: 10px;
    padding: 3px 10px;
  }
  i {
    font-size: 18px;
    font-weight: 600;
  }
</style>
<div class='wrapper'>
  <div class='input' contenteditable="true"></div>
  <button><i>></i></button>
</div>

`
class CustomInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    this.shadowRoot.appendChild(mentionsTemplate.content.cloneNode(true))
    const input = this.shadowRoot.querySelector('.input')
    const span = document.createElement('span')
    const range = document.createRange()
    const selection = window.getSelection()
    selection.removeAllRanges()

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        span.innerHTML = mutation.target.textContent
        input.innerHTML = null
        input.appendChild(span)
        const nodes = input.childNodes
        const start = nodes[0]
        const end = nodes[nodes.length - 1]
        range.setStartBefore(start)
        range.setEndAfter(end)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
        selection.collapseToEnd()
        //input.focus()
        console.log(range, selection)
      })
    })

    observer.observe(input, { attributes: true, characterData: true, subtree: true })
  }
  static get observedAttributes() {
    return ['contenteditable']
  }
}

customElements.define('mentions-input', CustomInput)
