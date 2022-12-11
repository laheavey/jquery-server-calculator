# Weekend Challenge: Server Side Calculator

1. ✅ Create a user interface where the user can input two values (2 input elements) and then select the type of mathematical operation. 
    `Input fields & button fields`

2. ✅ When the submit (`=` button) is clicked, capture the input.
    `Click handler to grab inputs based on button, add new key/value pair to id operation`

3. ✅ Bundle the input up in an object
4. ✅ Send this object to the server via a POST.
5. ✅ Create a 'C' button that will clear the user input fields.
    `<button id="clear">C</button>`
    `$(#clear).empty();`

6. ✅ On the server, compute the numbers.
    * ✅ Keep a historical record of all math operations and solutions on the server. 
    `Click handler for each button.`
    `Evaluate latest object by array.length-1?`
    `Push to new array for history`
    `function doAddition`

7. ✅ Have the server send back the OK.
8. ✅ Do a GET request after the POST to get the actual calculation.
    * ✅ Display a list of all previous calculations on the page when it loads using a GET request. 
    * ✅ Update the list when a new calculation is made.


## Stretch Goals

- ✅ Convert the interface to look and behave like a calculator as shown below.
    `CSS Grid, inside float box?`

- ✅ Only allow the POST call to happen if all necessary input is ready.
    `add required to input tags? and/or alert()`

- Allow a user to clear the history by clicking on a button. Technically this shouldn't be a GET or a POST. Look into making a DELETE request!

- Allow a user to click on an entry in the History list to re-run that calculation. This should display the answer on the calculator interface like a normal calculation.
    `click handler; Make previous answers into buttons? $(this)?`