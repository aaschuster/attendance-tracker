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
    const { firstname, lastname, role_id } = req.body;

    let message = "";

    if(!(firstname.trim())) message = "Please provide a first name.";
    if(!(lastname.trim())) message = "Please provide a last name.";
    if(!role_id) message = "Please provide a valid role id.";

    if(!message) {
        const role = await Model.getRole(role_id);
        if(role) return next();
        message = "Please provide a valid role id.";
    }

    if(message) return next({
        message: message,
        status: 422
    })

    next();
}