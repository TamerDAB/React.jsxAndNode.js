import React, { useState } from 'react';
import classes from './login.module.css';

function Login({ handleLogin }) {
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [usernameErrorLogin, setUsernameErrorLogin] = useState('');
  const [passwordErrorLogin, setPasswordErrorLogin] = useState('');
  const [usernameErrorRegister, setUsernameErrorRegister] = useState('');
  const [passwordErrorRegister, setPasswordErrorRegister] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userName = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    const validUsername = /^[a-zA-Z]{2,}$/.test(userName);
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,8}$/.test(password);

    // Check if username and password are valid
    if (validUsername && validPassword) {
      const data = { userName, password };

      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          // Login success
          if (res.length > 0) {
            const user = res[0];
            console.log("theID", user.userID);
            handleLogin(user);
          } else {
            setLoginError('User name / Password is wrong');
          }
        })
        .catch((error) => {
          console.error(error);
          setMessage('An error occurred during login: ' + error.message);
        });
    } else {
      // Show error messages for invalid username or password during login
      setUsernameErrorLogin(validUsername ? '' : 'Invalid username (at least 2 letters)');
      setPasswordErrorLogin(validPassword ? '' : 'Invalid password (at least 8 characters, letters, and digits)');
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const userName = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    // Check if username and password are valid for registration
    const validUsername = /^[a-zA-Z]{2,}$/.test(userName);
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,8}$/.test(password);

    if (!validUsername || !validPassword) {
      // Show error messages for invalid username or password during registration
      setUsernameErrorRegister(validUsername ? '' : 'Invalid username (at least 2 letters)');
      setPasswordErrorRegister(validPassword ? '' : 'Invalid password (at least 8 characters, letters, and digits)');
      return;
    }

    const data = { firstName, lastName, userName, password };

    fetch('http://localhost:3001/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Registration failed: ' + res.statusText);
        }
      })
      .then((res) => {
        // Registration success
        if (res.userID) {
          const user = res;
          console.log("theID", user.userID);
          handleLogin(user);
        } else if (res.error) {
          setRegistrationError(res.error);
        } else {
          if (res === 0) {
            throw new Error('User already exists');
          } else {
            throw new Error('Registration failed: Unknown error');
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setRegistrationError(error.message);
      });
  };

  return (
    <div className={classes.login}>
      <section className="login">
        <div className="head">
          <h1 className="title" id="unselectable">
            LOGIN
          </h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" name="username" className="text" required /><br />
            {usernameErrorLogin && <p className="error-message">{usernameErrorLogin}</p>}
            <input type="password" placeholder="Password" name="password" className="password" required /><br />
            {passwordErrorLogin && <p className="error-message">{passwordErrorLogin}</p>}
            <input className="btn-login" type="submit" value="Login" />
          </form>
          <p className="message">{loginError}</p>
        </div>
      </section>
      <section className="register">
        <div className="head">
          <h1 className="title" id="unselectable">
            REGISTER
          </h1>
        </div>
        <div className="form">
          <form onSubmit={handleRegistration}>
            <input type="text" placeholder="First Name" name="firstName" className="text" required /><br />
            <input type="text" placeholder="Last Name" name="lastName" className="text" required /><br />
            <input type="text" placeholder="Username" name="username" className="text" required /><br />
            {usernameErrorRegister && <p className="error-message">{usernameErrorRegister}</p>} {/* Display username error here */}
            <input type="password" placeholder="Password" name="password" className="password" required /><br />
            {passwordErrorRegister && <p className="error-message">{passwordErrorRegister}</p>} {/* Display password error here */}
            <input className="btn-login" type="submit" value="Register" />
          </form>
          {registrationError && (
            <p className="error-message">{registrationError}</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Login;
