const express = require('express');
const app = express();
const PORT = 3000;


// Hoenstly can't remember if this is needed?
// It was in my notes, and everything works, so 
// I left it in!
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }));

let calcHistory = [];
let newCalcEntry = {};

app.listen(PORT, () => { 
    console.log('listening on port', PORT) 
});

app.use(express.static('server/public'))

// Receives calcEntry, runs evaluateInputs, 
// confirms information was received.
app.post('/calcEntry', (req,res) => {
    console.log('POST /calcEntry')
    newCalcEntry = (req.body);
    evaluateInputs();
    res.sendStatus(201);
})

// Sends array calcHistory.
app.get('/calcHistory', (req,res) => {
	res.send(calcHistory);
})

// Erases calcHistory.
app.delete('/calcErase', (req,res) => {
    calcHistory = [];
    console.log('DELETE /calcErase');
})

// Calculator logic. Evalutes values & operators 
// and determines answer. All key/value pairs 
// pushed to calcHistory array.
function evaluateInputs () {
    if (newCalcEntry.operator === '+'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) + parseInt(newCalcEntry.valueTwo);
    } else if (newCalcEntry.operator === '-'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) - parseInt(newCalcEntry.valueTwo);
    } else if (newCalcEntry.operator === '*'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) * parseInt(newCalcEntry.valueTwo);
    } else if (newCalcEntry.operator === '/'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) / parseInt(newCalcEntry.valueTwo);
    } else if (newCalcEntry.operator === '%'){
        newCalcEntry.answer = parseInt(newCalcEntry.valueOne) * 0.01;   
    } else {
        newCalcEntry.answer = false;
    }

    calcHistory.push(newCalcEntry);
}