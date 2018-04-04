import React, { Component } from 'react';
import axios from 'axios';

// URL for database calls
var url = "https://data.gibber74.hasura-app.io/v1/query";

class PartnerForm extends Component {
  constructor() {
    super();
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

  componentDidMount() {

    const qualities = document.getElementById("qualities");
    const qualitiesButton = document.getElementById("qualities-button");
    qualitiesButton.addEventListener('click', () => {
      this.state.userInfo.qualities.push(qualities.value);
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
    hangupsButton.addEventListener('click', () => {
        this.state.userInfo.hangups.push(hangups.value)
    });

    const moreHangups = document.getElementById("more-hangups");
    moreHangups.addEventListener('change', () => {
      this.state.userInfo.moreHangups = moreQualities.value;
    });

    const traits = document.getElementById("traits");
    const traitsButton = document.getElementById("traits-button");
    traitsButton.addEventListener('click', () => {
        this.state.userInfo.traits.push(traits.value)
    });

    const moreTraits = document.getElementById("more-traits");
    moreTraits.addEventListener('change', () => {
      this.state.userInfo.moreTraits = moreQualities.value;
    });


    const submit = document.getElementById("partner-submit");
    submit.addEventListener('click', () => {
      console.log(this.state.userInfo);
      this.props.history.push("/addphotos");
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

      <div className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
      <input id="more-qualities" className="form-more" type="text"></input>
      <div id="location-desc" className="input-description">Feel free to elaborate on your top qualities in a match.</div>

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

      <div className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
      <input id="more-hangups" className="form-more" type="text"></input>
      <div className="input-description">Why are these hangups important to you?</div>

      <div className="input-prompt">YOUR STANDOUT TRAITS</div>
      <div id="traits-input-container" className="qualities-input-container">
        <input id="traits" className="form-input-item" type="text" placeholder="e.g. established career"></input>
        <div id="traits-button" className="qualities-button"><i className="fa fa-plus"></i><div>ADD</div></div>
      </div>

      <div className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
      <input id="more-traits" className="form-more" type="text"></input>
      <div className="input-description">Tell us some traits that would make you think twice before committing to a relationship. C'mon! Let's be realistic here.</div>

      <div id="partner-submit" className="submit">
      SAVE AND CONTINUE
      </div>
      <div id="photo-errors" className="errors"></div>
      </div>
      </div>
    )
  }
}

export default PartnerForm;
