var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hello QSC')
})

app.listen(3000,()=>{
    console.log('来不及做了呜呜');
});