var express = require('express');
var router = express.Router();

/* GET home page. */
function routerFactory(db){
  var tasks = require('../models/tasks.js')(db);

  router.get('/', function(req, res, next) {
    renderIndex(req, res, next);
  });

  router.post('/addtask', function(req,res,next){
    var task = req.body.task;
    tasks.newTask(task, function(err, task){
      if(err) throw(err);
      renderIndex(req, res, next);
    });
  });

  router.post('/addcomment/:id', function(req,res,next){
    var taskID = req.params.id;
    var taskComment = req.body.comment;

    tasks.addTaskComment(taskID,taskComment, function(err, task){
      if(err) throw(err);
      renderIndex(req, res, next);
    });
  });

  router.get('/likecomment/:id/:index', function(req,res,next){
    var taskID = req.params.id;
    var taskIndex = req.params.index;

    tasks.likeComment(taskID,taskIndex, function(err, task){
      if(err) throw(err);
      renderIndex(req, res, next);
    });
  });

  function renderIndex(req, res, next){
    tasks.getTasks(function(Err, taskList){
      res.render('index', { title: 'Simple Tasks Manager', "taskList": taskList });
    });
  }
  return router;
}
module.exports = routerFactory;
