import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './Logout/Logout.React';

const User = props => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!props.user ? (
        <>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {' '}
        </>
      ) : (
        <li>
            <Logout />
          </li>
      )}
    </ul>
  </nav>
);

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(User);
