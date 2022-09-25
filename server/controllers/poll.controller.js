const Poll = require("../models/poll.model");

const opts = { runValidators: true };

module.exports.findAllPolls = (req, res) => {
  Poll.find()
    .then(allPolls => res.json({ polls: allPolls}))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findPoll = (req, res) => {
  Poll.findOne({ _id: req.params.id })
		.then(onePoll => res.json({ results: onePoll }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createPoll = (req, res) => {
  Poll.create(req.body)
    .then(newPoll => res.json({ poll: newPoll }))
    .catch(err => res.status(400).json({ error: err }));
};

module.exports.updatePoll = (req, res) => {
  Poll.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true})
    .then(updatedPoll => res.json({ results: updatedPoll }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deletePoll = (req, res) => {
  Poll.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
