import React, { useState, useEffect } from 'react';
import classes from './updatecharacter.module.css';

function UpdateCharacter(props) {
  const [character, setCharacter] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [strength, setStrength] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/characters/${props.characterID}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setStrength(data.strength);
      })
      .catch((error) => console.error(error));
  }, [props.characterID]);

  const handleUpdateCharacter = (e) => {
    e.preventDefault();

    const updatedCharacter = {
      characterID: props.characterID,
      firstName: firstName,
      lastName: lastName,
      strength: strength,
    };

    fetch('http://localhost:3001/characters/update-character', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCharacter),
    })
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setStrength(data.strength);
        props.onUpdateSuccess(); // Invoke the onUpdateSuccess callback
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={classes.updatecharacter}>
      <form onSubmit={handleUpdateCharacter}>
        <h1 className={classes.title}>Update Character</h1>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className={classes.text}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className={classes.text}
        />
        <input
          type="number"
          placeholder="Strength"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          required
          className={classes.password}
        />
        <button type="submit" className={classes.btnUpdate}>
          Update Character
        </button>
      </form>
    </div>
  );
}

export default UpdateCharacter;
