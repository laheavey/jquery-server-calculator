const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }));

const calcHistory = [];
let newCalcEntry = {};

app.listen(PORT, () => { 
    console.log('listening on port', PORT) 
});

app.use(express.static('server/public'))

app.post('/calcEntry', (req,res) => {
    console.log('POST /calcEntry')
    newCalcEntry = (req.body);
    evaluateInputs();
    res.sendStatus(201);
})

app.get('/calcHistory', (req,res) => {
	res.send(calcHistory);
})

function evaluateInputs () {
    if (newCalcEntry.operator === '+'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) + parseInt(newCalcEntry.valueTwo);
    } else if (newCalcEntry.operator === '-'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) - parseInt(newCalcEntry.valueTwo);
    } else if (newCalcEntry.operator === '*'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) * parseInt(newCalcEntry.valueTwo);
    } else if (newCalcEntry.operator === '/'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) / parseInt(newCalcEntry.valueTwo);
    } else {
        newCalcEntry.answer = false;
    }

    calcHistory.push(newCalcEntry);
}