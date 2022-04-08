import {LitElement, html} from 'lit';

export class PhoneNumber extends LitElement {
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
    this.placeholder = 'phone number';
    this.id = `PhoneNumberId${Math.round(10000*Math.random())}`;
    this.val = '';
    this.required = null;
    this.regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
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
    return this.phoneNumber;
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
          error = 'Invalid phone number, 000-000-0000';      
      }
    } else if (this.max && !max.test(this.val)) {
      error = `Must be less than ${this.max} characters`;
    }

    return error;
  }

}

window.customElements.define('phone-number', PhoneNumber)