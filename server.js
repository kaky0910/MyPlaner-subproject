const express = require('express');
const challenge = require('./database/dailystatic');

var app = express();

app.get('/api/statics',(req,res) => {
    challenge.addDailyStatics();
});

app.listen('3000');