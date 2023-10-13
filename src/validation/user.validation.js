const Joi = require("joi")



const validation = (data) =>{
   
   const schema = Joi.object({
    ism : Joi.string().alphanum().min(2).required(),
    familiya : Joi.string().alphanum().min(1).required(),
    yoshi : Joi.string().min(1).max(3).required(),
    tel : Joi.string().min(9).required()
}) 
const {error} = schema.validate(data)
return error ? error.message : false
}


module.exports = {validation}