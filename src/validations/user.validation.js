"user strict";
import joi from 'joi';

const domainEmailValidator = (value, helper) =>{
    if(!value.endsWith("@gmail.cl")){
        return helper.message(
            "el email deber del dominio @gmail.cl"
        )
    }
    return  value;
}



export const userBodyValidation = joi.object({
    nombreCompleto: joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp("^[a-zA-Z\\s]+$"))
        .required()
        .messages({
            "string.empty": "el nombre completo no puede estar vacio.",
            "any.requierd": "el nombre comleto es obligatorio.",
            "string.base": "el nombre completo debe de ser de tipo string.",
            "string.min": "el nombre completo debe tener como minimo 3 caracteres.",
            "string.max": "el nombre completo debe tener como maximo 30 caracteres.",
            "string.pattern.base": "el nombre completo permite solo letras de la a-z."
        }),
    rut:joi.string()
        .min(9)
        .max(12)
        .pattern(/^[1-2]\d{6,7}-[\dKk]$/)
        .required()
        .messages({
            "string.empty": "el rut no puede estar vacio.",
            "any.requierd": "el rut es obligatorio.",
            "string.base": "el rut debe de ser de tipo string.",
            "string.min": "el rut debe tener como minimo 9 caracteres.",
            "string.max": "el rut debe tener como maximo 12 caracteres.",
            "string.pattern.base": "el rut debe ser con el formato xx.xxx.xxx-x o xxxxxxxx-x o talvez este agregando uno no exixtente recuerde que solo puede inicial en 1 o 2"
        }),
    email: joi.string()
        .min(15)
        .max(30)
        .required()
        .email()
        .messages({
            "string.empty": "el email no puede estar vacio.",
            "any.requierd": "el email es obligatorio.",
            "string.base": "el email debe tener formato con dominio apropiado.",
            "string.min": "el email debe tener como minimo 15 caracteres.",
            "string.max": "el email debe tener como maximo 30 caracteres.",
        })
        .custom(domainEmailValidator, "Validacion dominio email"),        
});