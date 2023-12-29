import React, { useState, useEffect } from 'react';
import classes from './mycharacters.module.css';

function Mycharacters(props) {
  const [userCharacters, setUserCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.userID) {
      fetch(`http://localhost:3001/characters/get-followed-characters/${props.userID}`)
        .then((res) => res.json())
        .then((data) => {
          setUserCharacters(data);
        })
        .catch((error) => console.error(error));
    }
  }, [props.userID]);

  useEffect(() => {
    fetch(`http://localhost:3001/characters`)
      .then((res) => res.json())
      .then((data) => {
        setAllCharacters(data);
        setIsLoading(false); // Set isLoading to false after fetching all characters
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteCharacter = (characterID) => {
    fetch(`http://localhost:3001/characters/delete/${props.userID}/${characterID}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 204) {
          // Character deleted successfully
          setUserCharacters((prevUserCharacters) =>
            prevUserCharacters.filter((userCharacter) => userCharacter.characterID !== characterID)
          );
        } else {
          console.error('Failed to delete character.');
        }
      })
      .catch((error) => console.error(error));
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or indicator while waiting for data
  }

  const filteredCharacters = allCharacters.filter((character) =>
    userCharacters.some((userCharacter) => userCharacter.characterID === character.characterID)
  );

  return (
    <div className={classes.mycharacters}>
      {/* <h1>My Characters</h1> */}
      <table>
        <thead>
          <tr>
            <th>Character ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Strength</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCharacters.sort((a, b) => a.firstName.localeCompare(b.firstName)).map((character) => (
            <tr key={character.characterID}>
              <td>{character.characterID}</td>
              <td>{character.firstName}</td>
              <td>{character.lastName}</td>
              <td>{character.strength}</td>
              <td>
                <button onClick={() => handleDeleteCharacter(character.characterID)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mycharacters;
