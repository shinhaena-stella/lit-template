import {LitElement, html, css} from 'lit';

export class Password extends LitElement {
  static get styles() {
    return css`
      #main{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
      }
    `
  }

  static properties = {
    placeholder: {},
    id: {},
    val: {},
    required: {},
    regex: {},
    max: {},
    error: {},
    message: {},
  }

  constructor() {
    super();
    this.placeholder = 'password';
    this.id = `PasswordId${Math.round(10000*Math.random())}`;
    this.val = '';
    this.required = null;
    this.regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    this.max = null;
    this.error = null;
    this.message = null;
  }

  render() {
    return html`
      <div id="main">
        <input @blur=${this.handleBlur} @input=${this.handleInput} type="text" placeholder=${this.placeholder}>
        <div ?hidden=${!this.error}>${this.error}</div>
      </div>
    `;
  }

  getValue() {
    return this.val;
  }

  handleBlur() {
    this.error = this.validation()
    this.requestUpdate()
  }

  handleInput(event) {
    const { value } = event.target;
    this.val = value
    this.error = this.validation();
    this.requestUpdate();
  }

  validation() {
    let error = null;

    const max = RegExp(String.raw`^.{0,${this.max}}$`)
    const regex = RegExp(String.raw`${this.regex}`)

    //error if field is required and left blank
    if (this.required && !this.val) {
      error = 'Required';

    } else if (this.regex && !regex.test(this.val)) {
      { if (this.message)
          error = this.message; 
        else 
          error = 'Invalid password';      
      }
    } else if (this.max && !max.test(this.val)) {
      error = `Must be less than ${this.max} characters`;
    }

    return error;
  }

  
}

window.customElements.define('password-', Password)