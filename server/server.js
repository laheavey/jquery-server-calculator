const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }));

const calcHistory = [
    {
        valueOne: '1',
        valueTwo: '2',
        operator: '+',
        answer: 3
    }
];

let newCalcEntry = {};

app.listen(PORT, () => { 
    console.log('listening on port', PORT) 
});

app.use(express.static('server/public'))

app.post('/calcEntry', (req,res) => {
    console.log('POST /calcEntry')
    newCalcEntry = (req.body);
    // calcHistory.push(req.body);
    evaluateInputs();
    res.sendStatus(201);
})

app.get('/calcHistory', (req,res) => {
    // console.log('sending history!!!'); 
    // console.log(calcHistory);
	res.send(calcHistory);
})

function evaluateInputs () {
    // newCalcEntry.answer;
    if (newCalcEntry.operator === '+'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) + parseInt(newCalcEntry.valueTwo);
    }

    // if (calcHistory[calcHistory.length-1].operator === '+'){
    //     calcHistory.answer = parseInt(calcHistory.valueOne) + parseInt(calcHistory.valueTwo);
    // } else {
    //     calcHistory.answer = false;
    // }
    // for (key of calculatorHistory){
    //     if (key.operator === '+'){
    //         calculatorHistory.answer = Number(key.valueOne) + Number(key.valueTwo);
    //     } else if (key.operator === '-'){
    //         calculatorHistory.answer = Number(key.valueOne) - Number(key.valueTwo);
    //     } else if (key.operator === '*'){
    //         calculatorHistory.answer = Number(key.valueOne) * Number(key.valueTwo);
    //     } else if (key.operator === '/'){
    //         calculatorHistory.answer = Number(key.valueOne) / Number(key.valueTwo);
    //     } else {
    //         calculatorHistory.answer = "ERROR";
    //     }
    // }
    console.log(newCalcEntry);
    calcHistory.push(newCalcEntry);
    return calcHistory;
}