var express = require('express');
var router = express.Router();


const food_controller = require("../controllers/foodController")
const location_controller = require("../controllers/locationController")
const store_controller = require("../controllers/storeController")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food Record' });
});

router.get('/foods',food_controller.food_list);
router.get('/food/:storeName/:foodName/:id',food_controller.food_details);

router.get('/locations',location_controller.locaiton_list);
router.get('/location/:name/:id',location_controller.locaiton_details);


router.get('/stores',store_controller.store_list);
router.get('/store/:name/:id',store_controller.store_details);

module.exports = router;
