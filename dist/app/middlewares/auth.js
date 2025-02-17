"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const AuthError_1 = __importDefault(require("../errors/AuthError"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new AuthError_1.default(http_status_1.default === null || http_status_1.default === void 0 ? void 0 : http_status_1.default.UNAUTHORIZED, 'You have no access to this route');
        }
        const decode = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, userEmail, iat } = decode;
        const user = yield user_model_1.User.isUserExistsByEmail(userEmail);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AuthError_1.default(http_status_1.default === null || http_status_1.default === void 0 ? void 0 : http_status_1.default.UNAUTHORIZED, 'You have no access to this route');
        }
        req.user = decode;
        next();
    }));
};
exports.default = auth;
