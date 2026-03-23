import * as Joi from "joi"


const PostSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    slug: Joi.string().required(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()).sort().required(),
    image: Joi.any()
        .custom((value, helpers) => {
            if (!value || value.length === 0) return value;

            const file = value[0];

            // Validate type
            const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!allowedTypes.includes(file.type)) {
                return helpers.error("file.invalidType");
            }

            // Validate size (e.g. 2MB)
            if (file.size > 2 * 1024 * 1024) {
                return helpers.error("file.tooLarge");
            }

            return value;
        })
        .messages({
            "file.invalidType": "Only JPG, PNG, WEBP allowed",
            "file.tooLarge": "File must be less than 2MB"
        }),
    author: Joi.string().required()
})



export default PostSchema