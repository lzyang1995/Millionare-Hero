const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.get('/baiwandati/api/getQuestions', async (req, res) => {
    res.append('Access-Control-Allow-Origin', '*');
    
    const file = path.join(__dirname, 'quizzesinseret.json');

    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            console.log('error' + err);
        } else {
            res.send(data);
        }
    })
});

app.listen(8080, () => {
    console.log("server start");
    console.log("http://localhost:8080/baiwandati/api/getQuestions")
})