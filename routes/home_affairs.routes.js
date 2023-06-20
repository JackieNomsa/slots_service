module.exports = app => {
    const slots = require("../controllers/home_affairs.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", slots.create);
  
    router.get("/", slots.findAll);
  
    router.get("/:id", slots.findOne);
  
    router.put("/:id", slots.update);
  
    router.delete("/:id", slots.delete);
  
    router.delete("/", slots.deleteAll);
  
    app.use('/api/homeaffairs', router);
  };