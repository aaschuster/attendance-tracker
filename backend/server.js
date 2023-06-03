const express = require("express");

const server = express();

server.use(express.json());

const Users = require("./model");

server.get("/", (req, res, next) => {
    Users.get()
        .then( users => res.json(users))
        .catch(next);
})

server.get("/:id", (req, res, next) => {
    Users.get(req.params.id)
        .then( user => res.json(user))
        .catch(next);
})

server.post("/", (req, res, next) => {
    Users.insert(req.body)
})

server.put("/:id", (req, res, next) => {
    Users.update(req.body, req.params.id)
        .then( numOfRecs => res.json(numOfRecs))
        .catch(next);
})

server.delete("/:id", (req, res, next) => {
    Users.del(req.params.id)
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