const xss = require('xss-clean');

/**
 * XSS sanitization middleware.
 *
 * Recursively sanitizes req.body, req.query, and req.params to strip
 * embedded HTML / script tags. Prevents stored XSS attacks.
 *
 * NOTE: xss-clean is a simple solution. For more granular control,
 * consider DOMPurify or a custom sanitizer per-field.
 */
module.exports = { sanitize: xss() };
