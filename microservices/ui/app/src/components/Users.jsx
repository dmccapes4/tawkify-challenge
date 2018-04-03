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
        this.setState({
          users: res.data
        });
      });
  }

  componentDidMount() {
    this.getUsers();

    const goBack = document.getElementById("go-back");
    goBack.addEventListener('click', () => this.props.history.push("/"));
  }

  render() {
    return (
      <div className="users">
        <div id="go-back" className="go-back">Return to start</div>
        <div>
        {
          this.state.users.map(user => {
            return (
              <div className="user-info" key={`${user.id}`}>
                {
                  user.images.split('$').map(image => {
                    return (
                      <img src={image} key={image}/>
                    )
                  })
                }
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
