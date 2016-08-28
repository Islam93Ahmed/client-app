var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Client = mongoose.model('Client');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET clients names */
router.get('/clients/:clientLimit', function(req, res, next){
    //console.log(req.params);
    Client.find({}, '_id name').limit(Number(req.params.clientLimit)).exec( function(err, clients){
        if(err){return next(err);}
        res.json(clients);
    });
});

/*POST new client */
router.post('/clients', function(req, res, next) {
  var client = new Client(req.body);

  client.save(function(err, post){
    if(err){ return next(err); }

    res.json(client);
  });
});


router.param('client', function(req, res, next, id){
    var query = Client.findById(id);
    query.exec(function(err, client){
        if(err){return next(err);}
        if(!client){return Error('can\'t find client');}
        req.client = client;
        return next();
    });
});

/* GET client data */
router.get('/client/:client', function(req, res){
    res.json(req.client);
});

/* POST update a client */
router.post('/edit', function(req, res,next){
  var client = req.body;
  //console.log(client);
  Client.update({ _id: client.id},
   { $set: { name:client.name,
    email:client.email,
    address:client.address,
    phone:client.phone}},{},
    function(err, raw){
      if(err) return next(err);
      res.send(raw);
    }
  );
});

router.post('/remove', function(req,res,next){

  //console.log(req.body.id);
  Client.remove({ _id: req.body.id }, function (err) {
    if (err) return next(err);
    res.send("Removed");
  });
});

router.post('/search', function(req,res,next){
  console.log("From post => " +req.body.name);
  var name = req.body.name;
  Client.find({name:{$regex: ".*" + name + ".*", $options: 'i'}}, function(err, client){
    if(err) return next(err);
    res.json(client);
  });
});

module.exports = router;
