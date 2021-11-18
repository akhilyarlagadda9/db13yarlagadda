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
exports.player_delete = async function(req, res) { debugger
    console.log("delete "  + req.params.id) 
    try { 
        result = await Player.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 
// Handle Player update form on PUT. 
exports.player_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await Player.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.Player_name)  
               toUpdate.Player_name = req.body.Player_name; 
        if(req.body.Batting_style) toUpdate.Batting_style = req.body.Batting_style; 
        if(req.body.Purchased_cost) toUpdate.Purchased_cost = req.body.Purchased_cost; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
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

// for a specific Player. 
exports.player_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await Player.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 

exports.player_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await Player.findById( req.query.id) 
        res.render('playerdetail', { title: 'Player Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

 
 // Handle building the view for creating a player. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.player_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('playercreate', { title: 'Player Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 