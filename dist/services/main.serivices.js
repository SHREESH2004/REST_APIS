"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.findManyRecords = exports.findOneRecord = exports.createRecord = void 0;
const db_1 = __importDefault(require("../config/db"));
const getModel = (model) => {
    // @ts-ignore
    return db_1.default.model;
};
const createRecord = async (model, data) => {
    return getModel(model).create({ data });
};
exports.createRecord = createRecord;
const findOneRecord = async (model, where) => {
    return getModel(model).findUnique({ where });
};
exports.findOneRecord = findOneRecord;
const findManyRecords = async (model, where) => {
    return getModel(model).findMany({ where });
};
exports.findManyRecords = findManyRecords;
const deleteRecord = async (model, where) => {
    return getModel(model).delete({ where });
};
exports.deleteRecord = deleteRecord;
//# sourceMappingURL=main.serivices.js.map