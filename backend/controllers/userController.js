const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { registrationValidation, loginValidation } = require('../controllers/registrationValidation');
dotenv.config();

const getUserPhotos = (req, res) => {};
const registerUser = async (req, res) => {
    const { error } = registrationValidation(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

        const { name, email } = req.body;

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = user.save();

        const tokenisedUser = { email: savedUser.email };
        const accessToken = await jwt.sign(tokenisedUser, process.env.SECRET_KEY_TO_ACCESS);
        return res.status(201).send({ accessToken: accessToken });
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
};
const loginUser = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error);
    }
    try {
        const { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Email not found');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        const tokenisedUser = { email: user.email };
        const accessToken = await jwt.sign(tokenisedUser, process.env.SECRET_KEY_TO_ACCESS);
        return res.status(201).send({ accessToken: accessToken });
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
};
module.exports = { getUserPhotos, registerUser, loginUser };
