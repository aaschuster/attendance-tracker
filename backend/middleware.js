const Model = require("./model");

module.exports.validateUserID = async (req, res, next) => {
    req.user = await Model.get(req.params.id);
    if(req.user) return next();
    next( {
        message: "User ID invalid.",
        status: 404
    } );
}

module.exports.validateUser = async (req, res, next) => {
    const { firstname, lastname, role_id, email } = req.body;

    let message = "";

    if(!(firstname.trim())) message = "Please provide a first name.";
    if(!(lastname.trim())) message = "Please provide a last name.";
    if(!role_id) message = "Please provide a valid role id.";

    if(!message) {
        const role = await Model.getRole(role_id);
        if(!role) message = "Please provide a valid role id.";
    }

    if(!message) {
        const user = await Model.getBy({email: email});
        if(user) message = "That email has already been used";
    }

    if(message) return next({
        message: message,
        status: 422
    })

    next();
}