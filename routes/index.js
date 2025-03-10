var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).send("HELLO WORLD"); // Use 200 for successful retrieval, not 500

});

module.exports = router;
