var express = require('express');
const player_controlers= require('../controllers/player');
var router = express.Router();
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  }  
/* GET player */

router.get('/', player_controlers.player_view_all_Page );


// GET request for one player. 
router.get('/player/:id', player_controlers.player_detail); 

//GET detail player page */ 
router.get('/detail', secured, player_controlers.player_view_one_Page); 
/* GET create player page */ 
router.get('/create', player_controlers.player_create_Page);
/* GET create update page */ 
router.get('/update', secured, player_controlers.player_update_Page); 
/* GET create player page */ 
router.get('/delete', secured, player_controlers.player_delete_Page); 

module.exports = router;