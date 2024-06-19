"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseForToken = exports.sendUnauthorizedResponse = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        message: data === null || data === void 0 ? void 0 : data.message,
        data: data === null || data === void 0 ? void 0 : data.data,
    });
};
const sendUnauthorizedResponse = (res) => {
    res.status(401).json({
        success: false,
        statusCode: http_status_1.default.UNAUTHORIZED,
        message: 'You have no access to this route.',
    });
};
exports.sendUnauthorizedResponse = sendUnauthorizedResponse;
const sendResponseForToken = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        token: data === null || data === void 0 ? void 0 : data.token,
        message: data === null || data === void 0 ? void 0 : data.message,
        data: data === null || data === void 0 ? void 0 : data.data,
    });
};
exports.sendResponseForToken = sendResponseForToken;
exports.default = sendResponse;
