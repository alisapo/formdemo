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

  handleData(e) {
    const { name } = e.target;
    const value = e.target.value;
    const { form, err } = this.state;
    let obj = {};

    obj = {
      ...form,
      [name]: value
    };

    //save state and check data in fields
    this.setState({ form: obj }, () => {
      let errors = {};
      const isErrors = dataValidation(name, value);
      errors = {
        ...err,
        [name]: isErrors
      };
      this.setState({ err: errors });
    });
  }

  // disabled/enabled submit button
  getButton() {
    const { form } = this.state;

    if (
      form.username
      && form.password
    ) return false;

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, err } = this.state;
    const errorsObj = validateForm(form, err, dataValidation);

    if (Object.keys(errorsObj).length != 0) {
      this.setState({ err: { ...err, ...errorsObj } });
      return false;
    };

    this.setState({ submit: true }, () => {
      const data = {
        username: form.username,
        password: form.password
      };

      fetch(loginUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => {
          if (res.status == 200) {
            return res.json();
          } else {
            this.setState({ err: { enter: 'Error in username or password' } });
          }
        })
        .then(res => {
          this.props.setAuth(res.auth_token);
          this.props.history.push('/users');
        })
        .catch(err => {
          this.setState({
            form: {
              username: '',
              password: ''
            },
            submit: false
          });

          console.log(err);
        });
    });
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
