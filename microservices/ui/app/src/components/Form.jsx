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
            <div className="gender">
            </div>
          </div>
          <div className="form-right">
          </div>
        </div>
      </div>
    )
  }
}

export default Form;
