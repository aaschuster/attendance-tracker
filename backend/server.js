const express = require("express");

const server = express();

server.use(express.json());

const Model = require("./model");
const {validateUserID, validateUser} = require("./middleware");

server.get("/", (req, res, next) => {
    Model.get()
        .then( users => res.json(users))
        .catch(next);
})

server.get("/:id", validateUserID, (req, res, next) => {
    Model.get(req.params.id)
        .then( user => res.json(user))
        .catch(next);
})

server.post("/", validateUser, (req, res, next) => {
    Model.insert(req.body)
        .then( userID => res.json(userID))
        .catch(next);
})

server.put("/:id", validateUserID, validateUser, (req, res, next) => {
    Model.update(req.body, req.params.id)
        .then( numOfRecs => res.json(numOfRecs))
        .catch(next);
})

server.delete("/:id", validateUserID, (req, res, next) => {
    Model.del(req.params.id)
        .then( numOfRecs => res.json(numOfRecs))
        .catch(next);
})

server.use((req, res) => {
    res.status(404).json( {
        message: "Nothing found here..."
    })
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "There was an issue with the server.",
        message: err.message
    })
})

module.exports = server;