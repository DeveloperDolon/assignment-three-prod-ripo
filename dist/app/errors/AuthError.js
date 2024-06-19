"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AuthError;
