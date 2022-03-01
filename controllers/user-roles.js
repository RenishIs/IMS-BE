const userRoles = require('../models/user-roles');

module.exports.get = async (req, res) => {
    try {
        let roles = await userRoles.find();
        if (roles.length > 0) {
            res.sendSuccess(roles, "role detail get successfully");
        } else {
            res.sendError("Something went wrong");
        }

    } catch (error) {
        res.sendError(error.message);
    }
}