'use strict';

/**
 * Select person by ID The selected person name will be shown below the selection
 * @param {*} e
 */
let person = document.querySelector('#id-select');
person.onchange = function (e) {
  const idSelect = e.target.value;

  // send by JSON to BE
  fetch(`/person/${idSelect}`, {
    method: 'GET',
    // headers: {
    // 'Accept': 'application/json, text/plain, */*',
    // 'Content-Type': 'application/json'
    // },

    // body: JSON.stringify( {} ),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      document.querySelector(
        '.person-selected',
      ).textContent = `${res.firstname} ${res.lastname}`;
    });
};

/**
 * Delete person by ID
 * @param {*} e
 */
person = document.querySelector('#id-delete');
person.onchange = function (e) {
  const idDelete = e.target.value;

  // send by JSON to BE
  fetch(`/person/${idDelete}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      document.querySelector(
        '.person-deleted',
      ).textContent = `${res.firstname} ${res.lastname}`;
    });
};

/**
 * Show all living in the selected city
 * @param {*} e
 */
const city = document.querySelector('#city-select');
city.onchange = function (e) {
  console.log(city.selectedIndex);
  const selectedCity = e.target.options[city.selectedIndex].value;
  console.log(selectedCity);

  fetch(`/person/address/${selectedCity}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);

      document.querySelector('.person-list').innerHTML = res.map(
        el => `<li>${el.FirstName} ${el.LastName}</li>`,
      );
    });
};
