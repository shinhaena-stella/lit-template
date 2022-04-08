import {LitElement, html, css} from 'lit';

export class Name extends LitElement {
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
    this.placeholder = 'name';
    this.id = `NameId${Math.round(10000*Math.random())}`;
    this.val = '';
    this.required = null,
    this.regex =  null;
    this.max = null;
    this.error = null;
    this.message = null;
  }

  render() {
    return html`
      <input @blur=${this.handleBlur} @input=${this.handleInput} type="text" placeholder=${this.placeholder} >
      <div ?hidden=${!this.error}>${this.error}</div>
    `;
  }

  getValue() {
    return this.name;
  }

  setValue(newName) {
    this.name = newName;
    this.requestUpdate();
  }

  //handles blur events. applies error validation if user interacts with this field
  handleBlur() {
    this.error = this.validation()
    this.requestUpdate()
  }

  //handles user input. update's state and applies error validation with each character input
  handleInput(event) {
    const { value } = event.target;
    this.val = value
    this.error = this.validation();
    this.requestUpdate();
  }

  //this is a sample "validation function" idk how to implement but imagine developer would create this themselves
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
          error = 'Invalid name';      
      }
    } else if (this.max && !max.test(this.val)) {
      error = `Must be less than ${this.max} characters`;
    }

    return error;
  }

}

window.customElements.define('name-', Name)