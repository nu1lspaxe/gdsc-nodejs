const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {

        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ message: 'Username and email are required' });
        }

        // Check for duplicate username
        const userWithSameUsername = await User.findOne({ username });
        if (userWithSameUsername) {
            return res.status(400).json({ message: 'Failed! Username is already in use!' });
        }

        // Check for duplicate email
        const userWithSameEmail = await User.findOne({ email });
        if (userWithSameEmail) {
            return res.status(400).json({ message: 'Failed! Email is already in use!' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;