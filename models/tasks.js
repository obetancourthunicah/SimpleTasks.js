var ObjectID = require('mongodb').ObjectID;

module.exports = function(db){

  this.tasks = db.collection("tasks");

  this.newTask = function(task, handler){
    //Crear un documento json con la estructura de la función getTasks
    // DOCUMENTO JSON data.js
    //que se encuentra mas abajo. Recuerdo que mongodb asigna automaticamente
    //el atributo _id.

    this.tasks.insert([
      {
          task: 'Some Task 1',
          comments: [
          {
             detail:'',
             like: 0
          }
       ]
     },
     {
         task: 'Some Task 2',
         comments: [
         {
            detail:'More Comments PRUEBA',
            like: 2
         }
      ]
    },
    {
        task: 'Some Task 3',
        comments: [
        {
           detail:'More Comments PRUEBA 2',
           like: 3
        },
        {
          detail:"Some Comment 2",
          likes:100}
     ]
    },
    ])

    //Al insertar el documento devolver

    handler(null, true);
    handler(new Error("Not Implemented"), null);
  }
  this.addTaskComment = function(taskId, taskComment, handler){
    var taskID = new ObjectID(taskId);
    //usando el taskID como parte del parametro de la función update
    this.tasks.update(
      { _id: "taskID" },
      { $push: { task: "Some Task 99" } }
    )
    // recuerde que existe el $push

    // al actualizar devolver
    handler(null, true);
    handler(new Error("Not Implemented"), null);
  }
  this.likeComment = function(taskId,commentIndex, handler){
    var taskID = new ObjectID(taskId);
    // aqui se puede usar el find para luego un update
    // o hacer el update directamente usando el indice correcto
    this.task.update(
      { _id: "taskID" },
      { $inc: { detail: "Comentario Modificado", likes: 200 } }
    )
    handler(new Error("Not Implemented"), null);
  }
  this.getTasks = function(handler){
    //se debe actualizar para que esta variable se llene
    // desde la colección de mongodb.
    // Devuelve todas las tareas guardadas
    this.tasks.find(db.collection);
    var data = [{_id:"5538ba34c513e47f0f055764",task:"Some Task 1",comments:[] },
              {_id:"5538ba7378d96e8f0ffb8df2",task:"Some Task 2",comments:[{detail:"Some Comment",likes:1}]},
              {_id:"5538ba7378d96e8f0ffb8df3",task:"Some Task 3",comments:[{detail:"Some Other Comment",likes:1},{detail:"Some Comment 2",likes:100}] }];
    handler(null, data);
  }
  return this;
}
