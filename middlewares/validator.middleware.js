import { body, validationResult, matchedData } from 'express-validator';

export const userValidator = [
    body('username')
        .trim()
        .escape()
        .isLength({ min: 3 }).withMessage('Username must contain atleast 3 characters')
        .isLength({max:20}).withMessage('Username cannot exceed 20 characters')
        .not().matches(/\s/).withMessage('Username cannot contain space')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain (a-z), (A-Z), (0-9) and _')
        .exists().withMessage('Username is required'),
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Invalid email format')
        .exists().withMessage('Email is required'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must contain at least 6 characters')
        .isByteLength({ max: 64 }).withMessage("Password is too long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_+=-]).+$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
        .matches(/^[A-Za-z0-9!@#$%^&*_+=-\s]+$/).withMessage('Password can only contain (a-z), (A-Z), (0-9) and some common punctuations')
        .exists().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(error => error.msg) });
        }
        
        const sanitized_data = matchedData(req);
        req.body = sanitized_data;
        next();
    }
];

