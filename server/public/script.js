$(document).ready(onReady);

const calcEntry = {};

function onReady () {
    $('.numberButtons').addClass("valueOne");

    $('.calculatorInput').on('click', '.valueOne', findValueOne);
    $('.operatorButtons').on('click', findOperator);
    $('.calculatorInput').on('click', '.valueTwo', findValueTwo);
    $('#equalsButton').on('click', evaluateEntry);

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

    $(this).css("background-color", "yellow");

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

    if (calcEntry.valueOne && calcEntry.valueTwo && calcEntry.operator) {
        postToServer();
        clearInputFields();
    } else {
        alert('Invalid Calculation');
        clearInputFields();
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
        $('#answer').empty();
        $('#answer').append(`${response[response.length-1].answer}`)
        
        // Appends history of calculcations
        $('ul').empty();
        for (let objects of response){
            $('ul').append(`
            <li class="calcHistory">${objects.valueOne} ${objects.operator} ${objects.valueTwo} = ${objects.answer}</li>
            `)
        }
    })
}

function clearInputFields() {
    $('#valueOne').empty();
    $('#operatorValue').empty();
    $('#valueTwo').empty();

    $('.numberButtons').removeClass("valueTwo");
    $('.numberButtons').addClass("valueOne");

    $('.operatorButtons').css("background-color", "");
}

function clearServerHistory() {
    $('#answer').empty();
    clearInputFields();

    $.ajax({
        url:'/calcErase',
        method: 'DELETE',
    })
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

