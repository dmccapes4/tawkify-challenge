import React, { Component } from 'react';
import axios from 'axios';

var url = "https://data.gibber74.hasura-app.io/v1/query";

class Users extends Component {
  constructor() {
    super();
    this.state = { users: [] };
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
      });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="users">
        <div>
        {
          this.state.users.map(user => {
            // let reader = new FileReader();
            // reader.onload = () => {
            //   let userImages = document.getElementById("user-images");
            //   let img = document.createElement("img");
            //   img.src= reader.result;
            //   userImages.appendChild(img);
            // }
            // reader.readAsDataURL(user.image);
            return (
              <div className="user-info" key={`${user.id}`}>
                <img src={`${user.image}`} />
                <div>{`gender: ${user.gender}`}</div>
                <div>{`seeking: ${user.seeking}`}</div>
                <div>{`location: ${user.location}`}</div>
                <div>{`height: ${user.height}`}</div>
                <div>{`height factor: ${user.height_factor}`}</div>
                <div>{`income: ${user.income}`}</div>
                <div>{`income factor: ${user.income_factor}`}</div>
                <div>{`interests: ${user.interests}`}</div>
              </div>
            )
          })
        }
        </div>
        <div id="user-images" className="user-images"></div>
      </div>
    )
  }
}

export default Users;
