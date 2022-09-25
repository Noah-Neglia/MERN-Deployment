const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({



messages: {
	type: Array,
},

});



const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;