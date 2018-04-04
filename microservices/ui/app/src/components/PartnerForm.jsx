import React, { Component } from 'react';
import axios from 'axios';

// URL for database calls
var url = "https://data.gibber74.hasura-app.io/v1/query";

class PartnerForm extends Component {
  constructor() {
    super();
    window.scroll(0, 0);
    this.state = {
      userInfo: {
        qualities: [],
        moreQualities: "",
        goal: "",
        moreGoals: "",
        hangups: [],
        moreHangups: "",
        traits: [],
        moreTraits: "",

      },
      users: []
    }
  }

  removeArrayElement(array, string) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === string) {
        array = array.splice(0, i - 1) + array.splice(i, array.length);
      }
    }
  }

  // Database call to get users
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
        this.setState({
          users: res.data
        });
      });
  }

  successfulSubmit() {
    let qualities = this.state.userInfo.qualities.join('*');
    let hangups = this.state.userInfo.hangups.join('*');
    let traits = this.state.userInfo.traits.join('*');
    axios.post(url,
      {
        "type": "update",
        "args": {
          "table": "user",
          "where": {
            "id": {
              "$eq": `${this.state.users.length}`
            }
          },
          "$set": {
            "qualities": `${qualities}`,
            "more_qualities": `${this.state.userInfo.moreQualities}`,
            "goal": `${this.state.userInfo.goal}`,
            "more_goals": `${this.state.userInfo.moreGoals}`,
            "hangups": `${hangups}`,
            "more_hangups": `${this.state.userInfo.moreHangups}`,
            "traits": `${hangups}`,
            "more_traits": `${this.state.userInfo.moreTraits}`
          }
        }
      }).then(res => {
        this.props.history.push("/addphotos")
      });
  }

  addIdealPartner() {
    let error = false;
    const errors = document.getElementById("partner-errors");
    while (errors.firstChild) {
      errors.removeChild(errors.firstChild);
    }

    let qualities = this.state.userInfo.qualities.join('*');
    const formQualities = document.getElementById("qualities-input-container");
    formQualities.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (qualities.length === 0){
      formQualities.style.border = "1px solid red";
      let qualitiesError = document.createElement("div");
      qualitiesError.innerHTML = "Please select a top quality";
      errors.appendChild(qualitiesError);
      error = true;
    }

    const formGoal = document.getElementById("goal");
    formGoal.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (this.state.userInfo.goal === "") {
      formGoal.style.border = "1px solid red";
      let goalError = document.createElement("div");
      goalError.innerHTML = "Please select a relationship goal";
      errors.appendChild(goalError);
      error = true;
    }

    let hangups = this.state.userInfo.hangups.join('*');
    const formHangups = document.getElementById("hangups-input-container");
    formHangups.style.border = "1px solid rgba(100, 100, 100, 0.3)";
    if (hangups.length === 0) {
      formHangups.style.border = "1px solid red";
      let hangupsError = document.createElement("div");
      hangupsError.innerHTML = "Please select a relationship hangup";
      errors.appendChild(hangupsError);
      error = true;
    }

    let traits = this.state.userInfo.traits.join('*');
    const formTraits = document.getElementById("traits-input-container");
    if (traits.length === 0) {
      formTraits.style.border = "1px solid red";
      let traitsError = document.createElement("div");
      traitsError.innerHTML = "Please select a standout trait";
      errors.appendChild(traitsError);
      error = true;
    }

    if (!error) {
      this.successfulSubmit();
    }
  }


  componentDidMount() {
    this.getUsers();

    const qualities = document.getElementById("qualities");
    const qualitiesButton = document.getElementById("qualities-button");
    const qualitiesList = document.getElementById("qualities-list");
    qualitiesButton.addEventListener('click', () => {
      this.state.userInfo.qualities.push(qualities.value);
      let quality = document.createElement("div");
      quality.classList.add("list-item");
      let qualityItem = document.createElement("div");
      qualityItem.innerHTML = qualities.value;
      qualities.value = "";
      quality.appendChild(qualityItem);
      let deleter = document.createElement("div");
      let trashCan = document.createElement("i");
      trashCan.classList.add("fa");
      trashCan.classList.add("fa-trash");
      deleter.appendChild(trashCan);
      deleter.addEventListener('click', () => {
        this.removeArrayElement(this.state.userInfo.qualities, qualities.value);
        qualitiesList.removeChild(quality);
        console.log('here');
      });
      quality.appendChild(deleter);
      qualitiesList.appendChild(quality);
    });

    const moreQualities = document.getElementById("more-qualities");
    moreQualities.addEventListener('change', () => {
      this.state.userInfo.moreQualities = moreQualities.value;
    });

    const goal = document.getElementById("goal");
    goal.addEventListener('change', () => {
      this.state.userInfo.goal = goal.options[goal.selectedIndex].value;
    });

    const moreGoals = document.getElementById("more-goals");
    moreGoals.addEventListener('change', () => {
      this.state.userInfo.moreGoals = moreGoals.value;
    });

    const hangups = document.getElementById("hangups");
    const hangupsButton = document.getElementById("hangups-button");
    const hangupsList = document.getElementById("hangups-list");
    hangupsButton.addEventListener('click', () => {
        this.state.userInfo.hangups.push(hangups.value);
        let hangup = document.createElement("div");
        hangup.classList.add("list-item");
        let hangupItem = document.createElement("div");
        hangupItem.innerHTML = hangups.value;
        hangups.value = "";
        hangup.appendChild(hangupItem);
        let deleter = document.createElement("div");
        let trashCan = document.createElement("i");
        trashCan.classList.add("fa");
        trashCan.classList.add("fa-trash");
        deleter.appendChild(trashCan);
        deleter.addEventListener('click', () => {
          this.removeArrayElement(this.state.userInfo.hangups, hangups.value);
          hangupsList.removeChild(hangup);
        });
        hangup.appendChild(deleter);
        hangupsList.appendChild(hangup);
    });

    const moreHangups = document.getElementById("more-hangups");
    moreHangups.addEventListener('change', () => {
      this.state.userInfo.moreHangups = moreQualities.value;
    });

    const traits = document.getElementById("traits");
    const traitsButton = document.getElementById("traits-button");
    const traitsList = document.getElementById("traits-list");
    traitsButton.addEventListener('click', () => {
        this.state.userInfo.traits.push(traits.value);
        let trait = document.createElement("div");
        trait.classList.add("list-item");
        let traitItem = document.createElement("div");
        traitItem.innerHTML = traits.value;
        traits.value = "";
        trait.appendChild(traitItem);
        let deleter = document.createElement("div");
        let trashCan = document.createElement("i");
        trashCan.classList.add("fa");
        trashCan.classList.add("fa-trash");
        deleter.appendChild(trashCan);
        deleter.addEventListener('click', () => {
          this.removeArrayElement(this.state.userInfo.traits, traits.value);
          traitsList.removeChild(trait);
        });
        trait.appendChild(deleter);
        traitsList.appendChild(trait);
    });

    const moreTraits = document.getElementById("more-traits");
    moreTraits.addEventListener('change', () => {
      this.state.userInfo.moreTraits = moreQualities.value;
    });


    const submit = document.getElementById("partner-submit");
    submit.addEventListener('click', () => {
      this.addIdealPartner();
    });
  }

  render() {
    return(
      <div>
        <div className="progress-tracker">
          <div className="progress-img-2"></div>
          <div className="progress-names">
            <div className="about-2">ABOUT YOURSELF</div>
            <div className="ideal-2">IDEAL PARTNER</div>
            <div className="add-2">ADD PHOTOS</div>
          </div>
        </div>
        <div className="form">
          <div className="form-prompt">
          Tell us about your ideal match
          </div>
          <div className="form-prompt-info">
          Who would you like to meet? The more we know the better we work.
          </div>

          <div id="hangups-prompt" className="input-prompt">TOP QUALITIES IN A MATCH</div>
          <div id="qualities-input-container" className="qualities-input-container">
            <input id="qualities" className="form-input-item" type="text" placeholder="e.g. a good sense of humor"></input>
            <div id="qualities-button" className="qualities-button"><i className="fa fa-plus"></i><div>ADD</div></div>
          </div>
          <div className="input-description">Tell us the qualities you prioritize in an ideal match.</div>
          <div id="qualities-list" className="list"></div>

          <div className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
          <input id="more-qualities" className="form-more" type="text"></input>
          <div className="input-description">Feel free to elaborate on your top qualities in a match.</div>

          <div className="input-prompt">YOUR RELATIONSHIP GOAL</div>
          <select id="goal" className="ideal-select">
            <option></option>
            <option>I'm still figuring it all out...</option>
            <option>I don't know what I'm looking for</option>
            <option>I'm ready to get married...</option>
            <option>I'm ready to start a family...</option>
            <option>I'm searching for my life partner...</option>
          </select>

          <div className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
          <input id="more-goals" className="form-more" type="text"></input>
          <div className="input-description">Let's work together on your goals.</div>

          <div className="input-prompt">RELATIONSHIP HANGUPS</div>
          <div id="hangups-input-container" className="qualities-input-container">
            <input id="hangups" className="form-input-item" type="text" placeholder="e.g. long distance"></input>
            <div id="hangups-button" className="qualities-button"><i className="fa fa-plus"></i><div>ADD</div></div>
          </div>
          <div className="input-description">Tell us some traits that would make you think twice before committing to a relationship. C'mon! Let's be realistic here.</div>
          <div id="hangups-list" className="list"></div>

          <div className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
          <input id="more-hangups" className="form-more" type="text"></input>
          <div className="input-description">Why are these hangups important to you?</div>

          <div className="input-prompt">YOUR STANDOUT TRAITS</div>
          <div id="traits-input-container" className="qualities-input-container">
            <input id="traits" className="form-input-item" type="text" placeholder="e.g. established career"></input>
            <div id="traits-button" className="qualities-button"><i className="fa fa-plus"></i><div>ADD</div></div>
          </div>
          <div className="input-description">What do you bring to the table that you are most confident about?</div>
          <div id="traits-list" className="list"></div>

          <div className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
          <input id="more-traits" className="form-more" type="text"></input>
          <div className="input-description">Tell us some traits that would make you think twice before committing to a relationship. C'mon! Let's be realistic here.</div>

          <div id="partner-submit" className="submit">
          SAVE AND CONTINUE
          </div>
          <div id="partner-errors" className="errors"></div>
        </div>
      </div>
    )
  }
}

export default PartnerForm;
