

const { json } = require('express');
var express = require('express');
const { parse } = require('path');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()
const { v4: uuidv4 } = require('uuid');



let uid = uuidv4();
function addCar(car,counter) {
   // console.log(car);
    let counter1=counter;
    let uid = uuidv4();
    console.log(uid);
    
  redisClient.hmset(uid,"Type",car.Type,"Day",car.Day,"Event",car.Event,"EntranceInterchange",car.EntranceInterchange,"ExitInterchange",car.ExitInterchange,"Time",car.Time,"Hour",car.Hour,"Mins",car.Mins,"count",counter1 ,function (err, object) 
    {
   // console.log(object);
    });

    redisClient.hmset('total',"total Cars",counter,function (err, object) 
    {
    // console.log(object);
    });
    var car1= redisClient.hgetall(uid, function (err, object) 
    {
        var1=object;

      //  console.log(object);
        
    });

    var carSize = redisClient.hgetall('total', function (err, object) 
    {

       console.log(object);
    });
 
    redisClient.publish("message",JSON.stringify(car));
    
}

    


     app.get('/test', function (req, res)
{


     res.send("תקשרתי עם רדיס")

    app.use(function (req, res, next)
     {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    
    
    redisClient.on('connect', function () {
        console.log('Sender connected to Redis');
    });

});


// catch 404 and forward to error handler


server.listen(6062, function () {
    console.log('Sender is running on port 6062');
});

module.exports = { addCar };