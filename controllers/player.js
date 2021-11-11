var Player = require('../models/player'); 
 
// List of all Players 
exports.player_list = function(req, res) { 
    res.send('NOT IMPLEMENTED: Player list'); 
}; 
 
// for a specific Player. 
exports.player_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: Player detail: ' + req.params.id); 
}; 
 
// Handle Player create on POST. 
exports.player_create_post =async function(req, res) { 
    console.log(req.body)
    let document = new Player();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Player_name":"regular", "quantity":13, "cost":43.56}
    document.Player_name = req.body.Player_name;
    document.Batting_style = req.body.Batting_style;
    document.Purchased_cost = req.body.Purchased_cost;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
}; 
 
// Handle Player delete form on DELETE. 
exports.player_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: Player delete DELETE ' + req.params.id); 
}; 
 
// Handle Player update form on PUT. 
exports.player_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: Player update PUT' + req.params.id); 
}; 

// List of all Players
exports.player_list = async function (req, res) {
    try {
        thePlayer = await Player.find();
        res.send(thePlayer);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// VIEWS
// Handle a show all view
exports.player_view_all_Page = async function (req, res) {
    try {
        thePlayer = await Player.find();
        res.render('players', {
            title: 'Player Search Results',
            results: thePlayer
        });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};