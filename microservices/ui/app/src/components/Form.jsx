import React, { Component } from 'react';
import axios from 'axios';

// URL for database calls
var url = "https://data.gibber74.hasura-app.io/v1/query";

// This component allows users to enter info and store it to database
class Form extends Component {
  // Define the state to allow for users and collect the user info from the page
  constructor() {
    super();
    window.scroll(0, 0);
    this.state = {
      userInfo: {
        gender: "",
        seeking: "",
        location: "",
        birthday: "",
        height: "",
        occupation: "",
        heightFactor: "No",
        occupation: "",
        income: "",
        incomeFactor: "Yes",
        interests: ""
      },
      users: []
    }
  }

  // Database call to get a list of user ids
  getUsers() {
    axios.post(url,
      {
        "type": "select",
        "args": {
          "table": "user",
          "columns": [
              "id"
          ]
        }
      }).then(res => {
        // Use the response to set the users
        this.setState({
          users: res.data
        });
      });
  }

  // Database call to save user info
  successfulSubmit() {
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
      });
      this.props.history.push("/idealpartner");
  }

  // Checks if all fields are filled and calls successfulSubmit if so
  handleSubmit() {
    let user = this.state.userInfo;
    // Define a boolean to keep track of errors in the form
    let error = false;
    const errors = document.getElementById("errors");
    // Remove all errors to avoid duplicates
    while (errors.firstChild) {
      errors.removeChild(errors.firstChild);
    }

    // Collect all inputs, set them to normal border and change the border to red
    // if there is an error

    const formGender = document.getElementById("form-gender");
    formGender.style.border = "1px solid rgba(100, 100, 100, 0.3)";

    if (user.gender === "") {
      formGender.style.border = "1px solid red";
      let genderError = document.createElement("div");
      genderError.innerHTML = "Please select a gender";
      errors.appendChild(genderError);
      error = true;
    }

    const formLocation = document.getElementById("form-location");
    formLocation.style.border = "1px solid rgba(100, 100, 100, 0.3)";

    if (user.location === "") {
      formLocation.style.border = "1px solid red";
      let locationError = document.createElement("div");
      locationError.innerHTML = "Please enter a location";
      errors.appendChild(locationError);
      error = true;
    }

    const formHeight = document.getElementById("form-height");
    formHeight.style.border = "1px solid rgba(100, 100, 100, 0.3)";

    if (user.height === "") {
      formHeight.style.border = "1px solid red";
      let heightError = document.createElement("div");
      heightError.innerHTML = "Please select a height";
      errors.appendChild(heightError);
      error = true;
    }

    const formOccupation = document.getElementById("form-occupation");
    formOccupation.style.border = "1px solid rgba(100, 100, 100, 0.3)";

    if (user.occupation === "") {
      formOccupation.style.border = "1px solid red";
      let occupationError = document.createElement("div");
      occupationError.innerHTML = "Please enter an occupation";
      errors.appendChild(occupationError);
      error = true;
    }

    const formSeeking = document.getElementById("form-seeking");
    formSeeking.style.border = "1px solid rgba(100, 100, 100, 0.3)";

    if (user.seeking === "") {
      formSeeking.style.border = "1px solid red";
      let seekingError = document.createElement("div");
      seekingError.innerHTML = "Please select the gender you are seeking";
      errors.appendChild(seekingError);
      error = true;
    }

    // Birthday checks for day, month and year
    const day  = document.getElementById("day");
    day.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (day.value.length !== 2) day.style.border = "1px solid red";
    const month = document.getElementById("month");
    month.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (month.value.length !== 2) month.style.border = "1px solid red";
    const year = document.getElementById("year");
    year.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (year.value.length !== 2) year.style.border = "1px solid red";
    let birthday = user.birthday.split("/");
    if (birthday.length !== 3 ||
        (birthday[0] && birthday[0].length !== 2) ||
        (birthday[1] && birthday[1].length !== 2) ||
        (birthday[2] && birthday[2].length !== 4)) {
      let birthdayError = document.createElement("div");
      birthdayError.innerHTML = "Please enter your birthday";
      errors.appendChild(birthdayError);
      error = true;
    }

    const formIncome = document.getElementById("form-income");
    formIncome.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (user.income === "") {
      formIncome.style.border = "1px solid red";
      let incomeError = document.createElement("div");
      incomeError.innerHTML = "Please select an income";
      errors.appendChild(incomeError);
      error = true;
    }

    const formInterests = document.getElementById("form-interests");
    formInterests.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (user.interests === "") {
      formInterests.style.border = "1px solid red";
      let interestsError = document.createElement("div");
      interestsError.innerHTML = "Please select an interest";
      errors.appendChild(interestsError);
      error = true;
    }

    // Call successfulSubmit if there are no errors
    if (!error) {
      this.successfulSubmit();
    }
  }

  componentDidMount() {
    this.getUsers();

    // Add event listeners to every component to change state
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


    // Buttons have to toggle classes to change css
    // Only change state and toggle classes if it changes state
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

    // Birthday requires processing month, day and year
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

    // Buttons have to toggle classes to change css
    // Only change state and toggle classes if it changes state
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
    formIncome.addEventListener('change', () => {
      this.state.userInfo.income = formIncome.options[formIncome.selectedIndex].value;
    });

    const formInterests = document.getElementById('form-interests');
    formInterests.addEventListener('change', () => {
      this.state.userInfo.interests = formInterests.value;
    });

    // Submit calls handleSubmit
    const submit = document.getElementById('about-submit');
    submit.addEventListener('click', () => {
      this.handleSubmit();
    })
  }

  // Render progress tracker then form
  render() {
    return (
      <div>
        <div className="progress-tracker">
          <div className="progress-img"></div>
          <div className="progress-names">
            <div className="about">ABOUT YOURSELF</div>
            <div className="ideal">IDEAL PARTNER</div>
            <div className="add">ADD PHOTOS</div>
          </div>
        </div>
        <div id="form" className="form">
          <div className="form-prompt">
            Tell us a bit about yourself.
          </div>
          <div className="form-prompt-info">
            Tell us a bit about yourself and who you’d like to meet. The more we know, the better. Be candid--this info is for our eyes only. Tawkify profiles and photos will forever be 100% confidential.
          </div>

          <div className="form-container">
            <div className="form-left">

              <div id="gender-prompt" className="input-prompt">YOUR GENDER</div>
              <select id="form-gender" className="form-select">
                <option></option>
                <option>Female</option>
                <option>Male</option>
              </select>
              <div id="gender-desc" className="input-description">Select your gender.</div>

              <div id="location-prompt" className="input-prompt">LOCATION</div>
              <input id="form-location" className="form-input" type="text" placeholder="Enter ZIP code"></input>
              <div id="location-desc" className="input-description">Where are you located.</div>

              <div id="height-prompt" className="input-prompt">YOUR HEIGHT</div>
              <select id="form-height" className="form-select">
                <option></option>
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
                <option>6 ft. 6 in.</option>
                <option>6 ft. 7 in.</option>
                <option>6 ft. 8 in.</option>
                <option>6 ft. 9 in.</option>
                <option>6 ft. 10 in.</option>
                <option>6 ft. 11 in.</option>
                <option>7 ft. 0 in.</option>
              </select>
              <div id="height-desc" className="input-description">What is your height?</div>

              <div id="occupation-prompt" className="input-prompt">OCCUPATION</div>
              <input id="form-occupation" className="form-textarea" type="textarea"></input>
              <div id="occupation-desc" className="input-description">What do you do?</div>

              <div className="form-button-container">
                <div id="form-income-factor-yes" className="button-active">Yes</div>
                <div id="form-income-factor-no" className="button-inactive">No</div>
              </div>
              <div className="form-button-description">Is income a factor in your match preferences?</div>
            </div>

            <div className="form-middle"></div>

            <div className="form-right">

              <div id="seeking-prompt" className="input-prompt">YOU ARE SEEKING</div>
              <select id="form-seeking" className="form-select">
                <option></option>
                <option>Men</option>
                <option>Women</option>
              </select>
              <div id="seeking-desc" className="input-description">Select the sexual orientation you're seeking.</div>

              <div id="birthday-prompt" className="input-prompt">YOUR BIRTHDAY</div>
              <div className="form-birthday-container">
                <input id="month" className="form-birthday-daymonth" type="textarea" placeholder="MM"></input>
                <input id="day" className="form-birthday-daymonth" type="textarea" placeholder="DD"></input>
                <input id="year" className="form-birthday-year" type="textarea" placeholder="YYYY"></input>
              </div>

              <div className="form-button-container">
                <div id="form-height-factor-yes" className="button-inactive">Yes</div>
                <div id="form-height-factor-no" className="button-active">No</div>
              </div>
              <div className="form-button-description">Is height a factor in your match preferences?</div>

              <div id="income-prompt" className="input-prompt">INCOME</div>
              <select id="form-income" className="form-select">
                <option></option>
                <option>Less than $40,000</option>
                <option>$40,000 - $60,000</option>
                <option>$60,000 - $80,000</option>
                <option>$80,000 - $100,000</option>
                <option>$100,000 - $125,000</option>
                <option>$125,000 - $150,000</option>
                <option>$150,000 - $200,000</option>
                <option>$250,000 - $500,000</option>
                <option>$500,000 - $1,000,000</option>
                <option>Rather not say</option>
              </select>
              <div id="income-description" className="input-description">Why? This is one form of an indicator...</div>

              <div id="interests-prompt" className="input-prompt">INTERESTS</div>
              <input id="form-interests" className="form-textarea" type="textarea"></input>
              <div className="input-description">Tell us a little more about yourself and what you like to do. We read everything, so please share!</div>

            </div>
          </div>

          <div id="about-submit" className="submit">SAVE AND CONTINUE</div>
          <div id="errors" className="errors"></div>
        </div>
      </div>
    )
  }
}

export default Form;
