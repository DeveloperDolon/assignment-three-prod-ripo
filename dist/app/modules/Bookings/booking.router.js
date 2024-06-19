"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingGetRoute = exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), booking_controller_1.BookingController.createBookings);
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.BookingController.getAllBookings);
exports.BookingRoute = router;
const bookingGetRoute = express_1.default.Router();
bookingGetRoute.get('/', (0, auth_1.default)('user'), booking_controller_1.BookingController.getUserBookings);
exports.BookingGetRoute = bookingGetRoute;
