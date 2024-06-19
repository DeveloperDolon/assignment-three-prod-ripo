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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotServices = void 0;
const slot_model_1 = require("./slot.model");
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = new Date(`1970-01-01T${payload === null || payload === void 0 ? void 0 : payload.startTime}`);
    const endTime = new Date(`1970-01-01T${payload === null || payload === void 0 ? void 0 : payload.endTime}`);
    let createdDataArray = [];
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endTime - startTime;
    const limit = differenceInMilliseconds / (1000 * 60) / 60;
    for (let i = 0; limit > i; i++) {
        const dataOfSlot = Object.assign({}, payload);
        let startDate;
        let endDate;
        if (i === 0) {
            startDate = startTime;
            endDate = new Date(startTime.getTime() + 1000 * 3600 * 1);
        }
        else {
            startDate = new Date(startTime.getTime() + 1000 * 3600 * i);
            endDate = new Date(startTime.getTime() + 1000 * 3600 * (i + 1));
        }
        const startedFormattedDate = startDate.toLocaleTimeString('en-US', {
            hour12: false,
        });
        const endFormattedDate = endDate.toLocaleTimeString('en-US', {
            hour12: false,
        });
        dataOfSlot.startTime = startedFormattedDate;
        dataOfSlot.endTime = endFormattedDate;
        createdDataArray = [...createdDataArray, dataOfSlot];
        // console.log(createdDataArray);
    }
    const result = yield slot_model_1.Slot.create(createdDataArray);
    return result;
});
const getAvailableSlotsFromDB = (date, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = slot_model_1.Slot.find({
        service: serviceId,
        date,
    }).populate('service');
    return result;
});
exports.SlotServices = {
    createSlotIntoDB,
    getAvailableSlotsFromDB,
};
