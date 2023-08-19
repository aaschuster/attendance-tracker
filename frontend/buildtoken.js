const jwt = require("jsonwebtoken");
const Buffer = require("buffer");

module.exports.buildToken = email => {
    const token = jwt.sign(
        {email: email},
        process.env.JWT_KEY,
        {expiresIn: '1h'}
    )

    return token;
}