import {LitElement, html} from 'lit';

export class SubmitBtn extends LitElement {
  static properties = {
    fields: {},
  }

  constructor() {
    super();
    this.fields = [];
  }

  render() {
    return html`
    <div>
      <button @click=${() => this.handleSubmit}>Submit</button>
    </div>
    `
  }

  handleSubmit(){
    
  }

}

window.customElements.define('submit-btn', SubmitBtn)