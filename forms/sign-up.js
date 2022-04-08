import {LitElement, html, css } from 'lit';
import '../fields/name.js';
import '../fields/email.js';
import '../fields/password';

export class SignUp extends LitElement {
  static get styles() {
    return css`
      #main{
        display: flex;
        flex-direction: column;
      }
    `
  }

  static properties = {
    fields: {type: Array},
  }

  constructor() {
    super();
    this.fields = [];
  }

  render() {
    return html`
    <div id="main">
      <name- id="fname" required="true" placeholder="first name"></name->
      <name- id="lname" required="true" placeholder="last name"></name->
      <!-- <email- required="true"></email->
      <password- required="true"></password-> -->
      <button @click=${() => this.checkandget(["fname", "lname"], this.handleSubmit)}>Check</button>
    </div>
    `;
  }

  checkandget(arr, callback) { // pass the array of id of fields as the first argument
    const fields = this.shadowRoot.children.main.children;
    // console.log(fi elds)
    // console.log(fields[0].val);
    let formElementsCheck = true;

    const cache = {};

    for (let i = 0; i < arr.length; i++){
      const { val, id } = fields[arr[i]];
      cache[id] = val;
    }

    if (formElementsCheck){
      callback(cache);
    } else console.log('bad form');


    

    // for (let key in fields) {
    //   // console.log(key);
    //   if(!isNaN(Number(key))){
    //     if (fields[key].validation){
    //       formElementsCheck = formElementsCheck && !fields[key].validation();
    //       const {val, id } = fields[key];
    //       cache[id] = val;
    //     } else {
    //       const {id, val } = fields[key]
    //       cache[id] = val;
    //     }

    //   }
    // }

    // if (formElementsCheck){
    //   callback(cache);
    // } else console.log('bad form');


  }



  handleSubmit(arg) {
    console.log(arg);
  }


}


window.customElements.define('sign-up', SignUp);
