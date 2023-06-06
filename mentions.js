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
    // const editable = this.getAttribute('contenteditable')
    this.shadowRoot.appendChild(mentionsTemplate.content.cloneNode(true))
    this.input = this.shadowRoot.querySelector('.input')
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        console.log(mutation, mutation.target.textContent)
      })
    })
    // this.input.addEventListener('focusin', (event) => {
    //   console.log(event)
    // })
    // this.input.addEventListener('focusout', (event) => {
    //   console.log(event)
    // })
    observer.observe(this.input, { attributes: true, characterData: true, subtree: true })
  }
  static get observedAttributes() {
    return ['contenteditable']
  }
}

customElements.define('mentions-input', CustomInput)
