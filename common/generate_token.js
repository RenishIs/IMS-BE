const jwt = require('jsonwebtoken');

module.exports.generateJWTToken = async (payload) => {
    return jwt.sign({ email: payload.email, userId: payload._id, role: payload.role, payload: payload }, process.env.JWT_KEY, { expiresIn: "48h" });
}