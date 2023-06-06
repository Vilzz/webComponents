const template = document.createElement('template')
template.innerHTML = /* html */ `
<style>
  .btn {
    border: 1px solid #c3c3c3;
    border-radius: 7px;
    max-width: 140px;
    text-align: center;
    padding: 6px 0;
    background-color: #d3d3d3;
    margin-bottom:10px;
  }
  .btn:hover {
    background-color: #c3c3c3;
    cursor: pointer;
  }
  .btn:focus {
    border-color: #000;
  }
</style>
<div class='btn'><slot></slot></div>
`

class Button extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    this.initialValue = this.innerHTML
    const buttonText = this.getAttribute('buttonText')
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.button = this.shadowRoot.querySelector('.btn')
    this.button.textContent = buttonText ? buttonText : this.initialValue
  }
  static get observedAttributes() {
    return ['buttonText']
  }
}
customElements.define('vz-btn', Button)
