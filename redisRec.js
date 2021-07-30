var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()


function redisrec() 
{
        var osec1=[];
        var osec2=[];
        var osec3=[];
        var osec4=[];

redisClient.subscribe('message'); 

redisClient.on("message",function(channel,data)
    {
     console.log(" get message ",data);
        var data=JSON.parse(data,function(key,value)
        {   
         
            if(key=='EntranceInterchange')
            {
            switch(value)
            {
                case 1:
                    console.log("pri!!!!!!!!!!")
                    osec1.push(JSON.parse(data));
                    console.log(JSON.stringify(osec1));
                    break;
                case 2:
                    osec2.push(JSON.parse(data));
                    break;
                case 3:
                    osec3.push(JSON.parse(data));
                    break;
                case 4:
                    osec4.push(JSON.parse(data));
                    break; 
         
                default:    
            }
        }
        
            });



    });
    console.log("in function");

    return [osec1,osec2,osec3,osec4];
}



app.use(function (req, res, next)
{
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});



module.exports = { redisrec };