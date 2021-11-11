const mongoose = require("mongoose") 
const playerSchema = mongoose.Schema({ 
    Player_name: String, 
    Batting_style: String, 
    Purchased_cost: Number 
}); 
module.exports = mongoose.model("player", playerSchema)