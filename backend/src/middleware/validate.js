const Joi = require('joi');
const { error } = require('../utils/apiResponse');

/**
 * Express middleware factory for Joi schema validation.
 *
 * Usage:
 *   router.post('/endpoint', validate(mySchema), controller.handler);
 *
 * The schema is validated against `req.body` by default.
 * Pass `source` as 'query' or 'params' to validate other parts.
 */
const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error: validationError, value } = schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
        });

        if (validationError) {
            const messages = validationError.details.map((d) => d.message);
            return error(res, 'Validation failed', 400, messages);
        }

        req[source] = value; // replace with sanitised value
        next();
    };
};

module.exports = { validate };
