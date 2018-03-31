import React, { Component } from 'react';
import axios from 'axios';

var url = "https://data.gibber74.hasura-app.io/v1/query";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        gender: "Female",
        seeking: "Men",
        location: "94158",
        birthday: "04/30/1984",
        height: "5 ft. 3 in.",
        occupation: "",
        heightFactor: "No",
        occupation: "",
        income: "$100,000 - $125,000",
        incomeFactor: "Yes",
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
    let user = this.state.userInfo;
    axios.post(url,
      {
        "type": "insert",
        "args": {
          "table": "user",
          "objects": [
            {
              "gender": `${user.gender}`,
              "seeking": `${user.seeking}`,
              "location": `${user.location}`,
              "birthday": `${user.birthday}`,
              "height": `${user.height}`,
              "height_factor": `${user.heightFactor}`,
              "occupation": `${user.occupation}`,
              "income": `${user.income}`,
              "income_factor": `${user.incomeFactor}`,
              "interests": `${user.interests}`,
              "id": `${this.state.users.length + 1}`
            }
          ]
        }
      })
  }

  componentDidMount() {
    this.getUsers();


    const formGender = document.getElementById('form-gender');
    formGender.addEventListener('change', () => {
      this.state.userInfo.gender = formGender.options[formGender.selectedIndex].value
    });

    const formLocation = document.getElementById('form-location');
    formLocation.addEventListener('change', () => {
      this.state.userInfo.location = formLocation.value;
    });

    const formHeight = document.getElementById('form-height');
    formHeight.addEventListener('change', () => {
      this.state.userInfo.height = formHeight.options[formHeight.selectedIndex].value
    });

    const formOccupation = document.getElementById('form-occupation');
    formOccupation.addEventListener('change', () => {
      this.state.userInfo.occupation = formOccupation.value;
    });


    const formIncomeFactorYes = document.getElementById('form-income-factor-yes');
    const formIncomeFactorNo = document.getElementById('form-income-factor-no');
    formIncomeFactorYes.addEventListener('click', () => {
      if (this.state.userInfo.incomeFactor !== 'Yes') {
        this.state.userInfo.incomeFactor = 'Yes';
        formIncomeFactorYes.classList.toggle('button-active');
        formIncomeFactorYes.classList.toggle('button-inactive');
        formIncomeFactorNo.classList.toggle('button-active');
        formIncomeFactorNo.classList.toggle('button-inactive');
      }
    })
    formIncomeFactorNo.addEventListener('click', () => {
      if (this.state.userInfo.incomeFactor !== 'No') {
        this.state.userInfo.incomeFactor = 'No';
        formIncomeFactorYes.classList.toggle('button-active');
        formIncomeFactorYes.classList.toggle('button-inactive');
        formIncomeFactorNo.classList.toggle('button-active');
        formIncomeFactorNo.classList.toggle('button-inactive');
      }
    });

    const formSeeking = document.getElementById('form-seeking');
    formSeeking.addEventListener('change', () => {
      this.state.userInfo.seeking = formSeeking.options[formSeeking.selectedIndex].value
    });

    const formBirthdayMonth = document.getElementById('month');
    formBirthdayMonth.addEventListener('change', () => {
      let birthday = this.state.userInfo.birthday;
      birthday = birthday.split('/');
      birthday[0] = formBirthdayMonth.value;
      this.state.userInfo.birthday = birthday.join('/');
    });

    const formBirthdayDay = document.getElementById('day');
    formBirthdayDay.addEventListener('change', () => {
      let birthday = this.state.userInfo.birthday;
      birthday = birthday.split('/');
      birthday[1] = formBirthdayDay.value;
      this.state.userInfo.birthday = birthday.join('/');
    });

    const formBirthdayYear = document.getElementById('year');
    formBirthdayYear.addEventListener('change', () => {
      let birthday = this.state.userInfo.birthday;
      birthday = birthday.split('/');
      birthday[2] = formBirthdayYear.value;
      this.state.userInfo.birthday = birthday.join('/');
    });

    const formHeightFactorYes = document.getElementById('form-height-factor-yes');
    const formHeightFactorNo = document.getElementById('form-height-factor-no');
    formHeightFactorYes.addEventListener('click', () => {
      if (this.state.userInfo.heightFactor !== 'Yes') {
        this.state.userInfo.heightFactor = 'Yes';
        formHeightFactorYes.classList.toggle('button-active');
        formHeightFactorYes.classList.toggle('button-inactive');
        formHeightFactorNo.classList.toggle('button-active');
        formHeightFactorNo.classList.toggle('button-inactive');
      }
    })
    formHeightFactorNo.addEventListener('click', () => {
      if (this.state.userInfo.heightFactor !== 'No') {
        this.state.userInfo.heightFactor = 'No';
        formHeightFactorYes.classList.toggle('button-active');
        formHeightFactorYes.classList.toggle('button-inactive');
        formHeightFactorNo.classList.toggle('button-active');
        formHeightFactorNo.classList.toggle('button-inactive');
      }
    });

    const formIncome = document.getElementById('form-income');
    formIncome.addEventListener('click', () => {
      this.state.userInfo.income = formIncome.options[formIncome.selectedIndex].value;
    });

    const formInterests = document.getElementById('form-interests');
    formInterests.addEventListener('click', () => {
      this.state.userInfo.interests = formInterests.value;
    });

    const submit = document.getElementById('about-submit');
    submit.addEventListener('click', () => {
      console.log(this.state.userInfo);
      this.handleSubmit();
    })
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
              <option>4 ft. 1 in.</option>
              <option>4 ft. 2 in.</option>
              <option>4 ft. 3 in.</option>
              <option>4 ft. 4 in.</option>
              <option>4 ft. 5 in.</option>
              <option>4 ft. 6 in.</option>
              <option>4 ft. 7 in.</option>
              <option>4 ft. 8 in.</option>
              <option>4 ft. 9 in.</option>
              <option>4 ft. 10 in.</option>
              <option>4 ft. 11 in.</option>
              <option>5 ft. 0 in.</option>
              <option>5 ft. 1 in.</option>
              <option>5 ft. 2 in.</option>
              <option selected="selected">5 ft. 3 in.</option>
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
              <option>6 ft. 6 in.</option>
              <option>6 ft. 7 in.</option>
              <option>6 ft. 8 in.</option>
              <option>6 ft. 9 in.</option>
              <option>6 ft. 10 in.</option>
              <option>6 ft. 11 in.</option>
              <option>7 ft. 0 in.</option>
            </select>
            <div className="input-description">What is your height?</div>

            <div className="input-prompt">OCCUPATION</div>
            <input id="form-occupation" className="form-textarea" type="textarea"></input>
            <div className="input-description">What do you do?</div>

            <div className="form-button-container">
              <div id="form-income-factor-yes" className="button-active">Yes</div>
              <div id="form-income-factor-no" className="button-inactive">No</div>
            </div>
            <div className="form-button-description">Is income a factor in your match preferences?</div>
          </div>

          <div className="form-middle"></div>

          <div className="form-right">

            <div className="input-prompt">YOU ARE SEEKING</div>
            <select id="form-seeking" className="form-select">
              <option>Men</option>
              <option>Women</option>
            </select>
            <div className="input-description">Select the sexual orientation you're seeking.</div>

            <div className="input-prompt">YOUR BIRTHDAY</div>
            <div className="form-birthday-container">
              <input id="month" className="form-birthday-daymonth" type="textarea" placeholder="04"></input>
              <input id="day" className="form-birthday-daymonth" type="textarea" placeholder="30"></input>
              <input id="year" className="form-birthday-year" type="textarea" placeholder="1984"></input>
            </div>

            <div className="form-button-container">
              <div id="form-height-factor-yes" className="button-inactive">Yes</div>
              <div id="form-height-factor-no" className="button-active">No</div>
            </div>
            <div className="form-button-description">Is height a factor in your match preferences?</div>

            <div id="income-prompt" className="input-prompt">INCOME</div>
            <select id="form-income" className="form-select">
              <option>Less than $40,000</option>
              <option>$40,000 - $60,000</option>
              <option>$60,000 - $80,000</option>
              <option>$80,000 - $100,000</option>
              <option selected="selected">$100,000 - $125,000</option>
              <option>$125,000 - $150,000</option>
              <option>$150,000 - $200,000</option>
              <option>$250,000 - $500,000</option>
              <option>$500,000 - $1,000,000</option>
              <option>Rather not say</option>
            </select>
            <div id="income-description" className="input-description">Why? This is one form of an indicator...</div>

            <div className="input-prompt">INTERESTS</div>
            <input id="form-interests" className="form-textarea" type="textarea"></input>
            <div className="input-description">Tell us a little more about yourself and what you like to do. We read everything, so please share!</div>

          </div>
        </div>

        <div id="about-submit" className="submit">SAVE AND CONTINUE</div>
      </div>
    )
  }
}

export default Form;
