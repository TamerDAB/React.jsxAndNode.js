'use strict';

/**
 * Send form by JSON
 * @param {*} e
 */
const form = document.querySelector('.form-ajax');
form.onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  //Create an object from the form data entries
  const formDataObject = Object.fromEntries(formData.entries());
  console.log(formDataObject);
  

  // send by JSON to BE
  fetch('/person-ajax/', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(formDataObject),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      const result = res.result;
      document.querySelector('.message').textContent = result;
      if (result === 'OK') {
        form.reset();
      }
    });
};
