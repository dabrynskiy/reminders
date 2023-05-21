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
exports.db_insert = void 0;
const db_settings_1 = __importDefault(require("./db-settings"));
function db_insert(text, timestamp, completed, person_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbResult = yield db_settings_1.default.query('INSERT INTO reminders (text, datetime, completed, person_id) values ($1, $2, $3, $4) RETURNING *', [text, timestamp, completed, person_id]);
        return dbResult.rows[0];
    });
}
exports.db_insert = db_insert;
