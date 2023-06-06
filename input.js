const inputTemplate = document.createElement('template')
inputTemplate.innerHTML = /* html */ `
<style>
  label{
    display: block;
    margin-top: 10px;
  }
  input {
    min-width: 200px;
    border: 1px solid darkgrey;
    border-radius: 3px;
    padding: 5px;
    margin-top: 2px;
  }
</style>
<label></label>
<input>
`

class VZInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  set value(value) {
    this.setAttribute('value', value)
  }
  get value() {
    return this.getAttribute('value')
  }
  connectedCallback() {
    this.shadowRoot.appendChild(inputTemplate.content.cloneNode(true))
    const label = this.shadowRoot.querySelector('label')
    label.textContent = this.getAttribute('label')
    const input = this.shadowRoot.querySelector('input')
    input.addEventListener('input', (event) => {
      this.value = event.target.value
    })
  }
}

customElements.define('vz-input', VZInput)
