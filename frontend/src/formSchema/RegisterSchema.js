import * as Joi from "joi"



const RegisterSchema = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .alphanum()
        .min(8)
        .required(),

})


export default RegisterSchema