const validator = require('validator');

const registrationValidation = (data) => {
    if (!validator.default.isEmail(data.email)) {
        return { error: 'Enter a valid email address.' };
    }
    if (!validator.default.isAlpha(data.name)) {
        return { error: 'Name should contain only alphabets. Remove any spaces if present.' };
    }
    if (!validator.default.isLength(data.password, { min: 7, max: undefined })) {
        return { error: 'Password should have atleast 7 characters.' };
    }

    return {};
};

module.exports = { registrationValidation };
