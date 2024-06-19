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
exports.ServicesService = void 0;
const service_model_1 = require("./service.model");
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.create(payload);
    const response = result.toObject({ versionKey: false });
    return response;
});
const getServicesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findById(id);
    return result;
});
const updateServiceIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.ServicesService = {
    createServiceIntoDB,
    getServicesFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB,
};
