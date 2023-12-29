import React, { useState, useEffect } from 'react';
import classes from './characters.module.css';
import UpdateCharacter from '../updatecharacter/UpdateCharacter';

function Characters(props) {
  const [data, setData] = useState([]);
  const [selectedCharacterID, setSelectedCharacterID] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  function showList() {
    fetch('http://localhost:3001/characters')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    showList();
  }, []);

  const handleDelete = (characterID) => {
    fetch('http://localhost:3001/characters/delete-character', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        characterID: characterID,
      }),
    })
      .then((res) => {
        if (res.status === 204) {
          // Delete success
          setData((prevData) =>
            prevData.filter((character) => character?.characterID !== characterID)
          );
          setSelectedCharacterID(null); // Reset selected character ID
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (characterID) => {
    setSelectedCharacterID(characterID);
    setIsUpdated(false); // Reset the update status
  };

  const handleUpdateSuccess = (updatedCharacter) => {
    console.log(updatedCharacter);
    setIsUpdated(true); // Set the update status to true

    // Fetch the updated character data from the server
    fetch(`http://localhost:3001/characters/${updatedCharacter.characterID}`)
      .then((res) => res.json())
      .then((data) => {
        setData((prevData) =>
          prevData.map((character) =>
            character?.characterID === updatedCharacter?.characterID ? data : character
          )
        );
      })
      .catch((error) => console.error(error));
  };

  // ... (existing code)

  const handleFollowCharacter = (characterID) => {
    const followData = {
      userID: props.userID, // Get the userID from props
      characterID: characterID,
    };

    fetch('http://localhost:3001/characters/followcharacter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(followData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Assuming the response from the API for success is like: { "success": 1 }
        if (data.success === 1) {
          // Handle the success response as needed
          console.log('Character followed successfully!');
        } else {
          // Handle the failure response if needed
          console.log('Failed to follow character.');
        }
      })
      .catch((error) => console.error(error));
  };

  // ... (existing code)

  return (
    <div className={classes.characters}>
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
          {data.sort((a, b) => a.firstName.localeCompare(b.firstName)).map((character) => (
            <tr key={character?.characterID}>
              <td>{character?.characterID}</td>
              <td>{character?.firstName}</td>
              <td>{character?.lastName}</td>
              <td>{character?.strength}</td>
              <td>
                <button onClick={() => handleDelete(character?.characterID)}>Delete</button>
                <button onClick={() => handleUpdate(character?.characterID)}>Update</button>
                <button onClick={() => handleFollowCharacter(character?.characterID)}>
                  Follow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isUpdated && selectedCharacterID && (
        <UpdateCharacter characterID={selectedCharacterID} onUpdateSuccess={handleUpdateSuccess} />
      )}
    </div>
  );
}

export default Characters;
