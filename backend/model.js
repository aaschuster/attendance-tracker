const db = require("./data/dbconfig");

module.exports.insert = user => {
    return db("users").insert(user);
}

module.exports.get = id => {
    if(id) {
        return db("users").where("user_id", id).first();
    }
    return db("users");
}

module.exports.update = (user, id) => {
    return db("users").where("user_id", id).update(user);
}

module.exports.del = id => {
    return db("users").where("user_id", id).del();
}