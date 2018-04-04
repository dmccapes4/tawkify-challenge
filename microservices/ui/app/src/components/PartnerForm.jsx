import React, { Component } from 'react';
import axios from 'axios';

class PartnerForm extends Component {
  componentDidMount() {
    const submit = document.getElementById("partner-submit");
    submit.addEventListener('click', () => {
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

      <div id="qualities-prompt" className="input-prompt">TOP QUALITIES IN A MATCH</div>
      <div id="qualities-input-container" className="qualities-input-container">
        <input id="form-qualities" className="form-input-item" type="text" placeholder="e.g. a good sense of humor"></input>
        <div className="qualities-button"><i class="fa fa-plus"></i><div>ADD</div></div>
      </div>
      <div className="input-description">Tell us the qualities you prioritize in an ideal match.</div>

      <div id="more-qualities" className="input-prompt">IF YOU'D LIKE... TELL US MORE</div>
      <input id="form-location" className="form-more" type="text"></input>
      <div id="location-desc" className="input-description">Feel free to elaborate on your top qualities in a match.</div>

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
