const joi = require('joi');

// const SignUpValidationSchema = async (req, res, next) => {
//     try{
const schema = joi.object({
            username: joi.string().regex(/^[a-zA-Z0-9._-]{3,16}$/i),
            password: joi.string().required(),
            email: joi.string().email().required(),
            phone_number: joi.string().regex(/^[0-9+]{3,16}$/),
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            gender: joi.string().valid('male','female'),
            date_of_birth: joi.string(),
            });
        
const SignUpValidationSchema = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(406).json({
            message: error.message,
            success: false})
    }else {
        next();
    }
}
//          await schema.validate(req.body, schema, { abortEarly: true });

           
// }catch (error) {
//     return res.status(422).json({
//         message: error.message,
//         success: false
//     })
// }  
   
    
   
module.exports = {
    SignUpValidationSchema
}