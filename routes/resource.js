var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var player_controller = require('../controllers/player');
/// API ROUTE ///
// GET resources base.
router.get('/resource', api_controller.api);
/// player ROUTES ///
// POST request for creating a player.
router.post('/resource/player', player_controller.player_create_post);
// DELETE request to delete player.
router.delete('/resource/player/:id', player_controller.player_delete);
// PUT request to update player.
router.put('/resource/player/:id', player_controller.player_update_put);
// GET request for one player.
router.get('/resource/player/:id', player_controller.player_detail);
// GET request for list of all player items.
router.get('/resource/player', player_controller.player_list);
module.exports = router;