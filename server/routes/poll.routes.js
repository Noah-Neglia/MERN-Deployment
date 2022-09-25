const PollController = require("../controllers/poll.controller");

module.exports = app => {
  app.get("/api/polls", PollController.findAllPolls);
  app.get("/api/poll/:id", PollController.findPoll);
  app.put("/api/poll/update/:id", PollController.updatePoll);
  app.post("/api/poll/new", PollController.createPoll);
  app.delete("/api/poll/delete/:id", PollController.deletePoll);
};