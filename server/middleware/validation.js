import { body, validationResult } from 'express-validator';

function userRegisterValidatorRules() {
    return [
        body("username", "Username is Required").notEmpty().isLength({ min: 2 }),
        body("email", "Email is Required").isEmail(),
        body("password", "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character")
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
    ]
}

function userLoginValidatorRules() {
    return [
        body("password", "Password is Required").notEmpty(),
        body("email", "Email is Required").isEmail(),
    ]
}

function userBlogValidatorRules() {
    return [
        body("title", "Title is Required").notEmpty(),
        body("descrpition", "description is Required").notEmpty(),
        body("category", "category is Required").notEmpty(),
    ]
}

function errorMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
}

export {
    userRegisterValidatorRules,
    userLoginValidatorRules,
    userBlogValidatorRules,
    errorMiddleware,
}