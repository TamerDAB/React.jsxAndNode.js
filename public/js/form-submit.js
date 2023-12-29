'use strict';

document.querySelector('form').onsubmit = function (e) {
  alert(`
Here in JS you can add additional validation of your form if you want.
Backend will redirect to error page or same page if no error.
Frontend can't handle backend response with this type of data sending.
Why?

Explanation:
When you do form.submit(); the form information is sent to the webserver.

The webserver will do whatever its supposed to do and return a brand new webpage to the client (usually the same page with something changed).

So, there is no way you can "catch" the return of a form.submit() action in Frontend. 
  `);
  //e.preventDefault()
};
