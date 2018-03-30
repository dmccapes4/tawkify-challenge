import React, { Component } from 'react';
import axios from 'axios';

var url = "https://data.gibber74.hasura-app.io/v1/query";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        gender: "",
        seeking: "",
        location: "",
        birthday: "",
        height: "",
        occupation: "",
        heightFactor: "",
        occupation: "",
        income: "",
        incomeFactor: "",
        interests: ""
      },
      users: []
    }
  }

  getUsers() {
    axios.post(url,
      {
        "type": "select",
        "args": {
          "table": "user",
          "columns": [
              "*"
          ]
        }
      }).then(res => {
        console.log(res.data);
        this.setState({
          users: res.data
        });
      })
  }

  handleSubmit() {
    axios.post(url,
      {
        "type": "insert",
        "args": {
          "table": "user",
          "objects": [
            `${this.state.userInfo}`
          ]
        }
      })
  }

  componentDidMount() {
    this.getUsers();


  }

  render() {

    return (
      <div className="form">
        <div className="form-prompt">
          Tell us a bit about yourself.
        </div>
        <div className="form-prompt-info">
          Tell us a bit about yourself and who you’d like to meet. The more we know, the better. Be candid--this info is for our eyes only. Tawkify profiles and photos will forever be 100% confidential.
        </div>
        <div className="form-container">
          <div className="form-left">
            <div className="input-prompt">YOUR GENDER</div>
            <select id="form-gender" className="form-select">
              <option>Female</option>
              <option>Male</option>
            </select>
            <div className="input-description">Select your gender.</div>

            <div className="input-prompt">LOCATION</div>
            <input id="form-location" className="form-input" type="text" placeholder="94158"></input>
            <div className="input-description">Where are you located.</div>

            <div className="input-prompt">YOUR HEIGHT</div>
            <select id="form-height" className="form-select">
              <option>5 ft. 3 in.</option>
              <option>5 ft. 4 in.</option>
              <option>5 ft. 5 in.</option>
              <option>5 ft. 6 in.</option>
              <option>5 ft. 7 in.</option>
              <option>5 ft. 8 in.</option>
              <option>5 ft. 9 in.</option>
              <option>5 ft. 10 in.</option>
              <option>5 ft. 11 in.</option>
              <option>6 ft. 0 in.</option>
              <option>6 ft. 1 in.</option>
              <option>6 ft. 2 in.</option>
              <option>6 ft. 3 in.</option>
              <option>6 ft. 4 in.</option>
              <option>6 ft. 5 in.</option>
            </select>
            <div className="input-description">What is your height?</div>

            <div className="input-prompt">OCCUPATION</div>
            <input id="form-occupation" className="form-textarea" type="textarea"></input>
            <div className="input-description">What do you do?</div>

            <div className="form-button-container">
              <div id="form-income-factor-yes" className="form-button">Yes</div>
              <div id="form-income-factor-no" className="form-button">No</div>
            </div>
          </div>
          <div className="form-middle"></div>
          <div className="form-right">
          </div>
        </div>
      </div>
    )
  }
}

export default Form;
