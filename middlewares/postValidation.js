const joi = require('joi');


const postValidationSchema = joi.object({
    title: joi.string()
    .regex(/[a-zA-Z0-9!?._\s]$/i)
    .trim()
    .max(80)
    .required(),
    content: joi.string().required(),
})
  

const CreatePostValidation = async (req, res, next) => {
    const { error } = postValidationSchema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    }
}

// export const EditPostValidationSchema = Joi.object().keys({
//   content: Joi.string().required(),
// });




module.exports = {
   CreatePostValidation 
}