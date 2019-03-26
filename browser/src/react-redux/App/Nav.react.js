import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './Logout/Logout.React';

const User = (props) => {
  const { user } = props;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user ? (
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
};

User.defaultProps = {
  user: null,
};

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    __v: PropTypes.number,
  }),
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(User);
