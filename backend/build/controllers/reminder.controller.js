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
const checks_1 = require("../checks/checks");
const SUCCESS = "success";
const FAILURE = "failure";
const USER = 1;
class ReminderController {
    static create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, text, timestamp } = request.body;
            try {
                (0, checks_1.checkBeforeCreate)(text, timestamp, title);
                const dbResult = yield db_settings_1.default.query('INSERT INTO reminders (text, timestamp, completed, person_id, title) values ($1, $2, $3, $4, $5) RETURNING *', [text, timestamp, false, USER, title]);
                response.json({ result: SUCCESS, reminder: dbResult.rows[0] });
            }
            catch (error) {
                response.status(500).json({ result: FAILURE, error: error });
            }
        });
    }
    ;
    static get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = Number(request.query.limit);
                if (Number.isNaN(limit) || limit <= 0) {
                    throw 'incorrect query parameter \'limit\'';
                }
                if (limit > 100) {
                    throw 'limit too large';
                }
                const page = Number(request.query.page);
                if (Number.isNaN(page) || page < 1) {
                    throw 'incorrect query parameter \'page\'';
                }
                const offset = limit * (page - 1);
                const reminders = yield db_settings_1.default.query('SELECT * FROM reminders WHERE person_id = $1 ORDER BY id ASC LIMIT $2 OFFSET $3', [USER, limit, offset]);
                if (reminders.rows.length === 0) {
                    response.json({
                        result: SUCCESS,
                        reminders: reminders.rows,
                        hasNext: false
                    });
                }
                else {
                    const hasNext = yield db_settings_1.default.query('SELECT COUNT(id) FROM reminders WHERE id > $1 AND person_id = $2', [reminders.rows[reminders.rows.length - 1].id, USER]);
                    response.json({
                        result: SUCCESS,
                        reminders: reminders.rows,
                        hasNext: Boolean(+hasNext.rows[0].count)
                    });
                }
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
                (0, checks_1.checkID)(request.params.id);
                const reminder = yield db_settings_1.default.query('SELECT * FROM reminders WHERE id = $1 AND person_id = $2', [request.params.id, USER]);
                if (reminder.rows.length === 0) {
                    throw `Not found with id ${request.params.id}`;
                }
                response.json({ result: SUCCESS, reminder: reminder.rows[0] });
            }
            catch (error) {
                response.status(500).json({ result: FAILURE, error: error });
            }
        });
    }
    ;
    static updateById(request, response) {
        const { title, text, timestamp, completed } = request.body;
        const id = request.params.id;
        try {
            (0, checks_1.checkBeforeUpdate)(text, timestamp, completed, id);
        }
        catch (error) {
            response.status(500).json({ result: FAILURE, error: error });
            return;
        }
        const updatedReminder = db_settings_1.default.query('UPDATE reminders SET text = $1, timestamp = $2, completed = $3, title = $6 WHERE id = $4 AND person_id = $5 RETURNING *', [text, timestamp, completed, id, USER, title]);
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
