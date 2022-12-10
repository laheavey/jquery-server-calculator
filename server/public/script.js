$(document).ready(onReady);

const calcEntry = {};

function onReady () {
    $('#equalsButton').on('click', addValues);
    $('.operatorButton').on('click', addOperator);
    // getFromServer();
    $('#clearButton').on('click', clearInputFields);
    $('#clearHistoryButton').on('click', clearServerHistory);
}

function addValues() {
    if ($('#valueOne').val() && $('#valueTwo').val()) {
        calcEntry.valueOne = $('#valueOne').val();
        calcEntry.valueTwo = $('#valueTwo').val();
        postToServer();
        $('.operatorButton').css("background-color", "");
    } else if ($('#valueOne').val() == 0){
        alert('Please enter a number into the Value One box.');
    } else if ($('#valueTwo').val() == 0){
        alert('Please enter a number into the Value Two box.');
    } else {
    };    
}

function addOperator() {
    calcEntry.operator = $(this).text();
    $(this).css("background-color", "yellow");
}

function postToServer () {
    // addValues();

    $.ajax({
        url: '/calcEntry',
        method: 'POST',
        data: calcEntry
    }).then((response) => {
        // console.log('POST /calcEntry:', response)
    })

    getFromServer();
}

function getFromServer(){
    $.ajax({
        url:'/calcHistory',
        method: 'GET',
    }).then((response) => {

        // Appends most recent calculation answer
        $('span').empty();
        $('span').append(`${response[response.length-1].answer}`)
        
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
    $('#valueOne').val('');
    $('#valueTwo').val('');
}

function clearServerHistory() {
    $.ajax({
        url:'/calcErase',
        method: 'DELETE',
    })

    $('.reset').empty();
    $('#valueOne').val('');
    $('#valueTwo').val('');
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

