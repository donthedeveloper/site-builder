import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  )
}

export default User;