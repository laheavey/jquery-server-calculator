$(document).ready(onReady);

const calcEntry = {};

function onReady () {
    $('#equalsButton').on('click', postToServer);
    $('.operatorButton').on('click', addOperator);
    // getFromServer();
    $('#clearButton').on('click', clearInputFields);
}

function addValues() {
    // console.log('hi!');
    calcEntry.valueOne = $('#valueOne').val();
    calcEntry.valueTwo = $('#valueTwo').val();

    // console.log(calculatorEntry);
    // console.log(calculatorEntry.valueOne);
    // console.log(calculatorEntry.valueTwo);
    // console.log(calculatorEntry.operator);
}

function addOperator() {
    calcEntry.operator = $(this).text();
    // console.log(calculatorEntry);
    // console.log(calculatorEntry.operator);
}

function postToServer () {
    addValues();

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
        console.log('Server sent: ', response)
        $('span').empty();
        $('span').append(`${response[response.length-1].answer}`)

        $('ul').empty();
        for (let objects of response){

            $('ul').append(`
            <li>${objects.valueOne} ${objects.operator} ${objects.valueTwo} = ${objects.answer}</li>
            `)
        }
    })
}

function clearInputFields() {
    $('#valueOne').val('');
    $('#valueTwo').val('');
}

