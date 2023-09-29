import React, { useState } from 'react';
import "../styles/Landpage.css";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="backgound-image">
        <img
          className="backgound-image-child"
          alt=""
          src="/rectangle-241@2x.png"
        />
        <div className="backgound-image-item" />
      </div>
      <div>
      <div>
        <Link to="/login" className="log-in login-button">Log in</Link>
      </div>
      </div>
      <div className="no-account-sign-container">
        <span className="no-account">{`No account? `}</span>
        <Link to="/signup" className="sign-up">Sign up</Link>
      </div>
      <div className="watch-your-favorite">Find your favorite movies here</div>
      
      <img className="logo-icon" alt="" src="/logo@2x.png" />
      <div className="enjoy-the-newest">Enjoy the newest movies</div>
      <div className="carousel">
        <div className="component-11">
          <div className="container">
            <img
              className="container-child"
              alt=""
              src="/rectangle-245@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-246@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-247@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-248@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-249@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-250@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-251@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-252@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-253@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-254@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-255@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-256@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-257@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-258@2x.png"
            />
            <img
              className="container-child"
              alt=""
              src="/rectangle-259@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
