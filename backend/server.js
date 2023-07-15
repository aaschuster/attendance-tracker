const bcrypt = require("bcryptjs");
const express = require("express");

const server = express();

server.use(express.json());

const Model = require("./model");
const {validateUserID, validateUser, validateLogin} = require("./middleware");

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
})

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

    const user = req.body;

    user.password = bcrypt.hashSync(user.password, 8);

    Model.insert(user)
        .then( userID => res.json(userID))
        .catch(next);
})

server.post("/login", validateLogin, async (req, res, next) => {
    let { email, password } = req.body;

    Model.getBy({email: email})
        .then( ([user]) => {
            if(bcrypt.compareSync(password, user.password)) return res.json({
                message: "Login successful"
            })
            else next({
                status: 401,
                message: "Invalid credentials"
            })
        })
        .catch(next);
});

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