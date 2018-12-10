const express = require('express');
const challenge = require('./database/dailystatic');
const moment = require('moment');

var app = express();

app.get('/api/statics',(req,res) => {
    challenge.addDailyStatics();
    if(moment().subtract('days',1).format('DD') === moment().subtract('days',1).daysInMonth()){
        ///habit 추가
    }
});

app.listen('3000');