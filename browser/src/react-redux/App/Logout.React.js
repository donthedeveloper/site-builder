import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { resetUser } from './User/User.actions';

class Logout extends Component {
  onLogout = (e) => {
    e.preventDefault();
    const { setUser } = this.props;

    // clear user from redux store
    setUser();

    // destroy session
    axios.get('/api/auth/logout').then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <a onClick={this.onLogout}>Logout</a>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: () => {
    dispatch(resetUser(null));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
