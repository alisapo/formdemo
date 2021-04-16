import React from 'react';

import UserCard from '../userCard/userCard.js';

import { compareFunc } from '../compareFunc/compareFunc.js';
import { Redirect } from 'react-router';

const
  usersUrl = 'https://agile-garden-50413.herokuapp.com/api/users/',
  logoutUrl = 'https://agile-garden-50413.herokuapp.com/api/token/logout/';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      allUsers: '',
      filterBy: '',
      filteredUsers: '',
      sortBy: 'asc'
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    fetch(usersUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.auth}`
      } 
    })
      .then(res => {
        if (res.status == 200) {
          return res.json();
        } else {
          console.log(res.statusText);
        }
      })
      .then(res => {
        this.setState({
          allUsers: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  logOut = (e) => {
    e.preventDefault();

    fetch(logoutUrl, {
      method: 'POST',
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        if (res.status == 401) {
          this.props.setAuth('');
          this.props.history.push('/');
        } else {
          console.log(res.statusText);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFilter = (e) => {
    this.setState({ filterBy: e.target.value.toLowerCase() });

    const filtered = this.state.allUsers.filter(
      user => user.username.indexOf(this.state.filterBy) >= 0
    );

    this.setState({ filteredUsers: filtered });
  }

  handleSort = () => {
    const { allUsers, sortBy } = this.state;

    if (sortBy === 'asc') {
      this.setState({
        allUsers: allUsers.sort(compareFunc('desc')),
        sortBy: 'desc'
      })
    } else {
      this.setState({
        allUsers: allUsers.sort(compareFunc('asc')),
        sortBy: 'asc'
      })
    }
  }

  render() {
    if (!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div className="control-panel">
          <div className="filter">
            <input
              type="text"
              placeholder="Enter username"
              value={this.filterBy}
              onInput={this.handleFilter}
            ></input>
          </div>
          <div className="buttons">
            <button
              className="sort"
              onClick={this.handleSort}
            >
              Sort {this.state.sortBy}
            </button>
            <button
              className="logout"
              onClick={this.logOut}
            >
              Log Out
          </button>
          </div>
        </div>
        <div className="users">
          <UserCard obj={
            !this.state.filterBy ?
              this.state.allUsers : this.state.filteredUsers
          } />
        </div>
      </div>
    );
  }
}

export default Users;
