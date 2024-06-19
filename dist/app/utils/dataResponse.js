"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataResponse = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("./sendResponse"));
const dataResponse = (data, message, res) => {
    if ((data === null || data === void 0 ? void 0 : data.length) > 0 || (data === null || data === void 0 ? void 0 : data._id)) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: message,
            data: data,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'No Data Found',
            data: [],
        });
    }
};
exports.dataResponse = dataResponse;
