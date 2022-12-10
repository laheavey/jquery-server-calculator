$(document).ready(onReady);

const calculatorEntry = {};

function onReady () {
    $('#equalsButton').on('click', postToServer);
    $('.operatorButton').on('click', objectifyOperator);
    getFromServer();
}

function objectifyInput() {
    // console.log('hi!');
    calculatorEntry.valueOne = $('#valueOne').val();
    calculatorEntry.valueTwo = $('#valueTwo').val();
    console.log(calculatorEntry);
    console.log(calculatorEntry.valueOne);
    console.log(calculatorEntry.valueTwo);
    console.log(calculatorEntry.operator);
    $('#valueOne').val('');
    $('#valueTwo').val('');
}

function objectifyOperator() {
    calculatorEntry.operator = $(this).html();
    // console.log(calculatorEntry);
    // console.log(calculatorEntry.operator);
}

function postToServer () {
    objectifyInput();

    $.ajax({
        url: '/calculatorEntry',
        method: 'POST',
        data: calculatorEntry
    }).then((response) => {
        console.log('POST /calculatorEntry sent:', response)
    })

}

function getFromServer(){
    $.ajax({
        url:'/calculatorHistory',
        method: 'GET',
    }).then((calculatorHistory) => {
        console.log('Server sent: ', calculatorHistory)

    })
}