import React, { useState, useEffect } from 'react';
import classes from './addcharacter.module.css';

function Addcharacter() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [strength, setStrength] = useState('');

  const handleAddCharacter = (e) => {
    e.preventDefault();

    const newCharacter = {
      firstName: firstName,
      lastName: lastName,
      strength: strength,
    };

    fetch('http://localhost:3001/characters/new-character', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCharacter),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData((prevData) => [...prevData, data]);
        setFirstName('');
        setLastName('');
        setStrength('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={classes.addcharacter}>
      <form onSubmit={handleAddCharacter}>
        <h1 className={classes.title}>Add Character</h1>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className={`${classes.text}`}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className={`${classes.text}`}
        />
        <input
          type="number"
          placeholder="Strength"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          required
          className={`${classes.password}`}
        />
        <button type="submit" className={`${classes.btnLogin}`}>
          Add Character
        </button>
      </form>
    </div>
  );
}

export default Addcharacter;
