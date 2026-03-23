import * as Joi from "joi"



const RegisterSchema = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net',] } }) // This is validation regarding Top Level Domain of a domain name (com,net,...)
        .required()
        .custom((value, helpers) => {
            const allowedDomains = ["gmail", "yahoo", "company"]; //This is validation regarding the name of the domain name (gmail,yahoo,...)

            const [, domainPart] = value.split("@");
            const domainName = domainPart.split(".")[0];

            if (!allowedDomains.includes(domainName)) {
                return helpers.error("email.domain");
            }

            return value;
        })
        .messages({
            "email.domain": "This email domain is not allowed",
        }),

    password: Joi.string()
        .alphanum()
        .min(8)
        .required(),

    password_confirm: Joi.string()
        .alphanum()
        .min(8)
        .required()
        .custom((value, helpers) => {
            const { password } = helpers.state.ancestors[0];

            if (value !== password) {
                return helpers.error("any.custom", {
                    passwordValue: password,
                });
            }

            return value;
        })
        .messages({
            "any.custom": "Passwords do not match",
        })
})


export default RegisterSchema