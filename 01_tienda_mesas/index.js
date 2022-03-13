const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

let db;

MongoClient.connect("mongodb://localhost:27017", function (err, client){
  if (err !== null) {
    console.log(err);
  } else {
    db=client.db("mesasdb");
  }
});


app.get("/api/mesas", function (req, res){
    db.collection("mesas").find().toArray(function (err, datos){
        if(err !== null){
          res.send(err);
        }else{
          res.send(datos);
        }
      });
  });



app.post("/api/anyadir", function (req, res){
    let mesa = {
      tamanyo: req.body.tamanyo,
      color: req.body.color,
      material: req.body.material,
      patas: parseInt(req.body.patas),
    };
  
    db.collection("mesas").insertOne(mesa, function (err, datos){
      if (err !== null) {
        res.send(err);
      }else{
        db.collection("mesas").find().toArray(function (err, data){
            if(err !== null){
              res.send(err);
            }else{
              res.send(data);
            }
          });
      }
    });
  });




  app.put("/api/modificar/:color", function (req, res) {
    const color = req.params.color;
  
    db.collection("mesas").updateMany({color: color},{$set: {color: "Granate"}},function (err, datos){
        if (err !== null){
          res.send(err);
        }else{
          res.send(datos);
        }
      }
    );
  });




  app.delete("/api/borrar/:patas", function(req, res){
    const patas=parseInt(req.params.patas);

    db.collection("mesas").deleteMany({patas:patas}, function(err, datos){
        if(err!==null){
            res.send(err);
        }else{
            res.send(datos);
        }
    });
  });




app.listen(3000);