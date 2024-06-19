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
exports.BookingServices = void 0;
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = require("./booking.model");
const slot_model_1 = require("../Slot/slot.model");
const createBookingIntoDB = (payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userEmail }, { _id: 1 });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User is not exist!');
    }
    payload.customer = userData === null || userData === void 0 ? void 0 : userData._id;
    const slotIsBooked = yield slot_model_1.Slot.findById(payload === null || payload === void 0 ? void 0 : payload.slotId, { isBooked: 1 });
    if ((slotIsBooked === null || slotIsBooked === void 0 ? void 0 : slotIsBooked.isBooked) === 'booked') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Slot is already booked!');
    }
    const updateSlot = yield slot_model_1.Slot.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.slotId, { isBooked: 'booked' }, { new: true });
    const result = yield (yield (yield (yield booking_model_1.Booking.create(payload)).populate('customer')).populate('serviceId')).populate('slotId');
    return result;
});
const getUserBookingsFromDB = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userEmail }, { _id: 1 });
    const bookings = yield booking_model_1.Booking.find({ customer: user === null || user === void 0 ? void 0 : user._id }, { customer: 0 })
        .populate('serviceId')
        .populate('slotId');
    return bookings;
});
exports.BookingServices = {
    createBookingIntoDB,
    getUserBookingsFromDB,
};
