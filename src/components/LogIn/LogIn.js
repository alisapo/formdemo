import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { dataValidation } from '../dataValidation/dataValidation.js';
import { validateForm } from '../validateForm/validateForm';

const loginUrl = 'https://agile-garden-50413.herokuapp.com/api/token/login/';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: false,

      form: {
        username: '',
        password: '',
      },

      err: {
        username: null,
        password: null,
        enter: null
      }
    };

    this.handleData = this.handleData.bind(this);
    this.getButton = this.getButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  render() {
    const { form, err } = this.state;

    return (
      <div className="container">
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="username">
            <input
              name="username"
              type="text"
              placeholder="Enter name"
              value={form.username}
              onInput={(e) => this.handleData(e)}
            />
            {!err.username ? '' : <div className="err-username">{err.username}</div>}
          </div>
          <div className="password">
            <div>
              <div className="back-img-pass">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19.89" viewBox="0 0 16 19.89">
                  <path className="a"
                    d="M17,8H16V6.11a4,4,0,0,0-8,0V8H7a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V11A3,3,0,0,0,17,8ZM10,6.11a2,2,0,1,1,4,0V8H10ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
                    transform="translate(-4 -2.11)" />
                  <path className="a" d="M12,12a3,3,0,1,0,3,3A3,3,0,0,0,12,12Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,16Z"
                    transform="translate(-4 -2.11)" />
                </svg>
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onInput={(e) => this.handleData(e)}
              />
            </div>
            {!err.password ? '' : <div className="err-password">{err.password}</div>}
          </div>
          <button
            className="login"
            disabled={this.getButton()}
            type="submit"
          >Sign in</button>
          {!err.enter ? '' : <div className="err-login">{err.enter}</div>}
        </form>
      </div>
    );
  }
}

export default withRouter(LogIn);
