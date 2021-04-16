import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div>Home page of login demo</div>
      <div><Link to='/login'>Please, click here to login</Link></div>
    </div>
  );
}

export default Home;
