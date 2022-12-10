const express = require('express');
const app = express();
const PORT = 3000;

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended:true }));

const calculatorHistory = [
    // {
    // valueOne: '2',
    // valueTwo: '1',
    // operator: '+'
    // }
];

app.listen(PORT, () => { 
    console.log('listening on port', PORT) 
});

app.use(express.static('server/public'))

app.post('/calculatorEntry', (req,res) => {
    console.log('POST /calculatorEntry')
    // console.log(req.body)
    calculatorHistory.push(req.body);
    res.sendStatus(201);
})

app.get('/calculatorHistory', (req,res) => {
    // console.log('sending history!!!'); 
	res.send(calculatorHistory);
})