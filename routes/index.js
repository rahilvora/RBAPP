const express = require('express');
const router = express.Router();
const mongoClient = require('../config/mongodbConfig');
const fetch = require('isomorphic-fetch');
var ObjectId = require('mongodb').ObjectId;
let db = null;
mongoClient.connect(function(dbObject){
	db = dbObject;
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET pins page. */
router.get('/pins', function(req, res, next) {
  res.render('pins', { title: 'pins' });
});

/* GET pins page. */
router.get('/getPins', function(req, res, next) {
	fetch('https://api.pinterest.com/v3/pidgets/users/smdmustaffa/pins/',{method:'get'})
		.then(function(response){
			return response.json()
		})
		.then(function(myJson){
			const collection = db.collection('pins');
			console.log(myJson.data.user.id)
			collection.find({_id: myJson.data.user.id}, {$exists: true}).toArray(function(err, doc) //find if a value exists
			{     
			    if(doc) //if it does
			    {
			        console.log(doc); // print out what it sends back
			        res.status(200).send(doc);
			    }
			    else if(!doc) // if it does not 
			    {
		        	collection.insert({_id:myJson.data.user.id,data: myJson.data},function(err, result){
						if(err){
							console.log(err);
							res.status(500).send({});
						}
						else{
							res.status(200).send(myJson);
						}
						//db.close();
					})
			    }
			});
			//res.status(200).send(myJson);
		})
		.catch(function(error){
			console.log(error)
			res.status(500).send({});
		})
});
/* GET home page. */
router.get('/getUsers', function(req, res, next) {
	const collection = db.collection('users');
	collection.find({}).toArray(function(err, docs){
		if(err){
			console.log(err);
			res.status(500).send({});
		}
		else{
			res.status(200).send(docs);
		}
	})
  	//res.status(200).send({});
});

/* POST add user*/

router.post('/addUser', function(req, res, next) {
	const collection = db.collection('users');
	collection.insertMany([req.body],function(err, result){
		if(err){
			console.log(err);
			res.status(500).send({});
		}
		else{
			res.status(200).send({});
		}
		//db.close();
	})
});

/* DELETE user*/
router.delete('/deleteUser', function(req, res, next) {
	const collection = db.collection('users');
	collection.remove({_id:new ObjectId(req.body.id)},function(err, result){
		if(err){
			console.log(err);
			res.status(500).send({});
		}
		else{
			res.status(200).send({});
		}
		//db.close();
	})
});

module.exports = router;
