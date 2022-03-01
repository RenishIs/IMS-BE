const user = require('../models/user');
const bcrypt = require("bcrypt");
const token = require("../common/generate_token");
const mongoose = require("mongoose");
const role = require('../models/user-roles');

module.exports.signup = async (req, res) => {
    const { body } = req;
    try {
        const emailExist = await user.findOne({
            email: body.email
        });
        if (emailExist) {
            res.sendBadRequest("Email already exist.")
        } else {
            bcrypt.hash(body.password, 10, async (err, hash) => {
                if (err) {
                    res.sendError("something went wrong")
                } else {
                    const createUser = new user({
                        _id: new mongoose.Types.ObjectId(), 
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: hash,
                        role: body.role,
                        technology: body.technology,
                    });

                    const modelStatus = await createUser.save();
                    if (modelStatus) {
                        res.sendSuccess({}, "User create successfully.")
                    } else {
                        res.sendError("Something went wrong")
                    }
                }
            });
        }
    } catch (error) {
        res.sendError(error.message)
    }

}

module.exports.login = async (req, res) => {
    const { body } = req;
    try {
        let findStatus = await user.findOne({ email: body.email });
        if (findStatus) {
            findStatus = { ...findStatus }._doc;
            bcrypt.compare(body.password, findStatus.password, async (err, result) => {
                if (err) {
                    res.sendError(err.message);
                }
                if (!result) {
                    res.sendBadRequest("Email id or password is not valid.");
                }
                else {
                    /* remove pssword property */
                    delete findStatus['password'];
                    /* remove pssword property */

                    const data = (!!findStatus.role) ? await role.findOne({ "_id": findStatus.role }) : {}
                    findStatus.role = data?.role

                    findStatus['token'] = await token.generateJWTToken(findStatus);;
                    res.sendSuccess(findStatus, "Login successfully");
                }
            });
        }
        else {
            res.sendBadRequest("Email id or password is not valid.")
        }
    } catch (error) {
        res.sendError(error.message);
    }
}
