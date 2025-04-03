import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";



export const validate = (validations:ValidationChain[])=>{
    return async(req: Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty())
                {
                    break;
                }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json({errors: errors.array()});
    };
};


export const loginValidator = [
    body("username").trim().isLength({min:3}).withMessage("Rollnumber is required to be of length 10 characters"),
    body("password").trim().isLength({min:2}).withMessage("Password should contain atleast 6 charecters"),
];


export const registerValidator = [
    body("username").trim().isLength({min:3}).withMessage("Rollnumber is required to be of length 10 characters"),
    body("password").trim().isLength({min:3}).withMessage("Password should contain atleast 6 charecters"),
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("name").trim().isLength({min:3}).withMessage("Name should contain atleast 3 charecters"),
];