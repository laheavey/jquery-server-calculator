$(document).ready(onReady);

const calcEntry = {};

function onReady () {
    $('.numberButtons').addClass("valueOne");
    getFromServer();

    $('.calculatorInput').on('click', '.valueOne', findValueOne);
    $('.operatorButtons').on('click', findOperator);
    $('.calculatorInput').on('click', '.valueTwo', findValueTwo);
    $('#equalsButton').on('click', evaluateEntry);

    $('#negPosButton').on('click', negativePositiveSwap);
    $('#percentButton').on('click', evaluateEntry);

    $('#clearButton').on('click', clearInputFields);
    $('#clearHistoryButton').on('click', clearServerHistory);
}

function findValueOne(){
    let numberButtons = $(this).text();
    $('#valueOne').append(numberButtons)
}

function findOperator() {
    $('#operatorValue').append($(this).text())
    calcEntry.operator = $(this).text();

    $(this).css("background-color", "#F3C0B9"); // CHANGE
    $('.operatorButtons').prop("disabled", true)

    $('.numberButtons').removeClass("valueOne");
    $('.numberButtons').addClass("valueTwo");
}

function findValueTwo(){
    let numberButtons = $(this).text();
    $('#valueTwo').append(numberButtons)
}

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

function postToServer () {
    $.ajax({
        url: '/calcEntry',
        method: 'POST',
        data: calcEntry
    })
    getFromServer();
}

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

function clearInputFields() {
    $('span').empty();

    $('.numberButtons').removeClass("valueTwo");
    $('.numberButtons').addClass("valueOne");

    $('.operatorButtons').prop("disabled", false);
    $('.operatorButtons').css("background-color", "");
}

function clearServerHistory() {
    clearInputFields()
    $('.calcHistory').empty();

    $.ajax({
        url:'/calcErase',
        method: 'DELETE',
    })
}

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

function doAFlip() {
    $('.calculatorInput').addClass('doAFlip');
    $('#valueOne').prepend('(: i')
    $('#clearButton').on('click', undoAFlip);
}

function undoAFlip() {
    $('.calculatorInput').removeClass('doAFlip');
    clearInputFields();
}

// function runAgain(){
//     $('#valueOne').val('$objects.valueOne');
//     $('#valueTwo').val('$objects.ValueTwo');
//     $('span').append(`${response[response.length-1].answer}`)
//     if (objects.operator === '+'){
//         $('#additionButton').css("background-color", "yellow");
//     } else if (objects.operator === '-'){
//         $('#subtractionButton').css("background-color", "yellow");
//     } else if (objects.operator === '*'){
//         $('#multiplicationButton').css("background-color", "yellow");
//     } else if (objects.operator === '/'){
//         $('#divisionButton').css("background-color", "yellow");
//     } else {
//         objects.answer = false;
//     }
// }

