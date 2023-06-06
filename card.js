const cardTemplate = document.createElement('template')

cardTemplate.innerHTML = /* html */ `
  <style>
    :host {
      min-width: 300px;
      height: 300px;
      border: 1px solid grey;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .vz-card > header {
      height: 60px;
      border-bottom: 1px solid lightgrey;
    }
    .vz-card > main{
      padding: 10px;
    }
  </style>
  <div class='vz-card'>
    <header><slot name='header'>Header</slot></header>
    <main><slot name='body'>Card Body</slot></main>
  </div>
`

class Card extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    this.initialValue = this.innerHTML
    this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true))
  }
}

customElements.define('vz-card', Card)
