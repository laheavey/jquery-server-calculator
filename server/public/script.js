$(document).ready(onReady);

// Empty object where all calculator inputs will live.
const calcEntry = {};

function onReady () {
    getFromServer();
    $('.numberButtons').addClass("valueOne");

    $('.calculatorInput').on('click', '.valueOne', findValueOne);
    $('.operatorButtons').on('click', findOperator);
    $('.calculatorInput').on('click', '.valueTwo', findValueTwo);
    $('#equalsButton').on('click', evaluateEntry);

    $('#negPosButton').on('click', negativePositiveSwap);
    $('#percentButton').on('click', evaluateEntry);

    $('#clearButton').on('click', clearInputFields);
    $('#clearHistoryButton').on('click', clearServerHistory);
}

// Evaluates all number buttons pressed and displays them 
// sequentially in the corresponding value span.
function findValueOne(){
    let numberButtons = $(this).text();
    $('#valueOne').append(numberButtons)
}

// Grabs the operator pressed and displays it in the 
// corresponding span. It changes the color of the operator 
// pressed and disables the others. This function also removes
// the class 'valueOne' from the number buttons and adds
// 'valueTwo' to signal a different key/value pair for the
// calcEntry object.
function findOperator() {
    $('#operatorValue').append($(this).text())
    calcEntry.operator = $(this).text();

    $(this).css("background-color", "#F3C0B9"); // CHANGE
    $('.operatorButtons').prop("disabled", true)

    $('.numberButtons').removeClass("valueOne");
    $('.numberButtons').addClass("valueTwo");
}

// Evaluates all number buttons pressed and displays them 
// sequentially in the corresponding value span.
function findValueTwo(){
    let numberButtons = $(this).text();
    $('#valueTwo').append(numberButtons)
}

// Evaluates the text in each value span and adds it as a 
// key/value pair. Depending on what the pairs contain, the
// function will either flip the calculator, post the object
// to the server, turn a number into a percent, or alert if the
// calculation is invalid.
function evaluateEntry() {
    calcEntry.valueOne = $('#valueOne').text();
    calcEntry.valueTwo = $('#valueTwo').text();

    if (calcEntry.valueOne == "01134") {
        doAFlip(); //NEW
    } else if (calcEntry.valueOne && calcEntry.valueTwo && calcEntry.operator) {
        postToServer();
        clearInputFields();
    } else if ($(this).text() === '%' && calcEntry.valueOne){
        calcEntry.operator = $(this).text();
        calcEntry.valueTwo = "";
        postToServer();
        clearInputFields();
        $('.operatorButtons').prop("disabled", true)  
    } else {
        alert('Invalid Calculation');
        clearInputFields()
    }
    // FROM BASE GOALS:
    // if ($('#valueOne').val() && $('#valueTwo').val()) {
    //     calcEntry.valueOne = $('#valueOne').val();
    //     calcEntry.valueTwo = $('#valueTwo').val();
    //     postToServer();
    //     $('.operatorButton').css("background-color", "");
    // } else if ($('#valueOne').val() == 0){
    //     alert('Please enter a number into the Value One box.');
    // } else if ($('#valueTwo').val() == 0){
    //     alert('Please enter a number into the Value Two box.');
    // } else {
    // };    
}

// Posts the calcEntry object to the server.
function postToServer () {
    $.ajax({
        url: '/calcEntry',
        method: 'POST',
        data: calcEntry
    })
    getFromServer();
}

// Receives the calcHistory array from the server, and
// appends the value of each object to the DOM. 
function getFromServer(){
    $.ajax({
        url:'/calcHistory',
        method: 'GET',
    }).then((response) => {

        // Appends most recent calculation answer
        $('#valueOne').append(`${response[response.length-1].answer}`)
        
        // Appends history of calculcations
        $('ul').empty();
        for (let objects of response){
            $('ul').append(`
            <li class ="mathText">${objects.valueOne} ${objects.operator} ${objects.valueTwo} = ${objects.answer}</li>
            `)
        }
    })
}

// Empties all spans, resets valueOne/valueTwo classes for
// number buttons, resets color & enables operator buttons.
function clearInputFields() {
    $('span').empty();

    $('.numberButtons').removeClass("valueTwo");
    $('.numberButtons').addClass("valueOne");

    $('.operatorButtons').prop("disabled", false);
    $('.operatorButtons').css("background-color", "");
}

// Clears server history.
function clearServerHistory() {
    clearInputFields()
    $('.calcHistory').empty();

    $.ajax({
        url:'/calcErase',
        method: 'DELETE',
    })
}

// Turns value from a negative to a positive, and vice-versa.
function negativePositiveSwap() {
    if ($('#valueTwo').text()){
        let newTwo = parseInt($('#valueTwo').text()) * (-1);
        $('#valueTwo').empty();
        $('#valueTwo').append(newTwo);
    } 
    else {
        let newOne = parseInt($('#valueOne').text()) * (-1);
        $('#valueOne').empty();
        $('#valueOne').append(newOne);
    }
}

// Flips the calculator when '01134' is entered as valueOne
// and the equals button is pressed.
function doAFlip() {
    $('.calculatorInput').addClass('doAFlip');
    $('#valueOne').prepend('(: i')
    $('#clearButton').on('click', undoAFlip);
}

// Flips the calculator back.
function undoAFlip() {
    $('.calculatorInput').removeClass('doAFlip');
    clearInputFields();
}

