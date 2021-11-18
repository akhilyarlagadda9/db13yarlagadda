var express = require('express');
const player_controlers= require('../controllers/player');
var router = express.Router();

/* GET player */

router.get('/', player_controlers.player_view_all_Page );


// GET request for one player. 
router.get('/player/:id', player_controlers.player_detail); 

//GET detail player page */ 
router.get('/detail', player_controlers.player_view_one_Page); 

module.exports = router;