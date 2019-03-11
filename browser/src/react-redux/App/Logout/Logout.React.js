import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { resetUserAction } from '../User/User.actions';

class Logout extends Component {
  static propTypes = {
    resetUser: PropTypes.func.isRequired,
  };

  handleLogout = (e) => {
    e.preventDefault();

    // destroy user session
    axios.get('/api/auth/logout').then((res) => {
      if (res.status === 200) {
        const { resetUser } = this.props;
        // clear user from redux store
        resetUser();
      }
    });
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetUser: () => {
    dispatch(resetUserAction());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
