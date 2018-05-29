var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false});

var mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@ds229380.mlab.com:29380/tododb');

var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('todo', todoSchema);

module.exports = function(app){

app.get('/todo', function(req,res){
    Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo', {todos: data});
    });
});

app.post('/todo', urlencodedparser, function(req,res){
    var newtodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g, ' ')}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

};