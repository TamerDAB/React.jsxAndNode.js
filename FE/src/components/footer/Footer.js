import React from 'react';
import classes from './footer.module.css';
function Footer(props) {
  const { aaa, bbb } = classes;
  return (
    <footer className={classes.footer}>
      <h3>Hello {props.user} &copy; {new Date().getFullYear()} {props.classRoom}</h3>
    </footer>
  );
}

export default Footer;
