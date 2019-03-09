import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout/Logout.React';

const User = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  </nav>
);

export default User;
