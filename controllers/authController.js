const bcrypt = require("bcrypt");
const {User} = require('../models');

class AuthController {
    signUp = async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: "user" // By default, the role is "user. Admin can change it later
        };

        await User.create(user);

        res.status(201).json('Utilisateur créé');
    }

    async signIn(req, res) {
        // Code à implémenter
    }
}

module.exports = new AuthController();