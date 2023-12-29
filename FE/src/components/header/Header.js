import React, { Component } from 'react';

import classes from './header.module.css';

function Header(props) {
  return (
    <header>
      <h1>{props.heading}</h1>
    </header>
  );
}

export default Header;
