const jwt = require('jsonwebtoken');

module.exports.routeMiddleWares = async (req, res, next) => {
    const bearerHeader = req.headers['x-access-token'] || req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        return jwt.verify(token, process.env.JWT_KEY, async (err, userData) => {
            if (err) {
                res.sendForbidden(err.toString());
            }
            else {
                req.user = userData;
                next();
            }
        })
    }
    else {
        res.sendUnAuthorized("token missing")
    }
}
