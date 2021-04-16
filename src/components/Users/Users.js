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
