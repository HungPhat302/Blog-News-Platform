const Joi=require("joi")


const PostSchema=Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    slug:Joi.string().required(),
    category:Joi.string(),
    tags:Joi.array().items(Joi.string()).sort(),
    image:Joi.string(),
    author: Joi.string().required()
})



export default PostSchema