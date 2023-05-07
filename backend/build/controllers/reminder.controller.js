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
const db_settings_1 = __importDefault(require("../db-settings"));
const SUCCESS = "success";
const FAILURE = "failure";
class ReminderController {
    static create(request, response) {
        const { text, dateTime, completed } = request.body;
        const createdReminder = db_settings_1.default.query('INSERT INTO reminders (text, datetime, completed, person_id) values ($1, $2, $3, $4) RETURNING *', [text, dateTime, completed, 1]);
        createdReminder
            .then((result) => {
            response.json({ result: SUCCESS, reminder: result.rows[0] });
        })
            .catch((reason) => {
            response.status(500).json({ result: FAILURE, error: reason });
        });
    }
    ;
    static getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reminders = yield db_settings_1.default.query('SELECT * FROM reminders');
                response.json({ result: SUCCESS, reminders: reminders.rows });
            }
            catch (error) {
                response.status(500).json({ result: FAILURE, error: error });
            }
        });
    }
    ;
    static getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reminder = yield db_settings_1.default.query('SELECT * FROM reminders WHERE id = $1', [request.params.id]);
                response.json({ result: SUCCESS, reminder: reminder.rows[0] });
            }
            catch (error) {
                response.status(500).json({ result: FAILURE, error: error });
            }
        });
    }
    ;
    static updateById(request, response) {
        const { text, dateTime, completed } = request.body;
        const id = request.params.id;
        const updatedReminder = db_settings_1.default.query('UPDATE reminders SET text = $1, datetime = $2, completed = $3 WHERE id = $4 RETURNING *', [text, dateTime, completed, id]);
        updatedReminder
            .then((result) => {
            response.json({ result: SUCCESS, reminder: result.rows[0] });
        })
            .catch((reason) => {
            response.status(500).json({ result: FAILURE, error: reason });
        });
    }
    ;
    static delete(request, response) {
        const id = +request.params.id;
        const deletedReminder = db_settings_1.default.query('DELETE from reminders where id = $1 RETURNING *', [id]);
        deletedReminder
            .then((result) => {
            response.json({ result: SUCCESS, reminder: result.rows[0] });
        })
            .catch((reason) => {
            response.status(500).json({ result: FAILURE, error: reason });
        });
    }
    ;
}
exports.default = ReminderController;
;
