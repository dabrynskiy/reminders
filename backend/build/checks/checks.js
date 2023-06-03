"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBeforeUpdate = exports.checkID = exports.checkBeforeCreate = void 0;
const process_1 = require("process");
const message_1 = require("../messages/message");
function checkText(text) {
    if (typeof text !== 'string') {
        throw message_1.Message.not_defined('text');
    }
    ;
    if (!text.length) {
        throw message_1.Message.not_empty('text');
    }
    ;
}
;
function checkTimestamp(timestamp) {
    const regExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
    if (!regExp.test(timestamp)) {
        throw message_1.Message.not_defined('timestamp');
    }
    ;
}
;
function checkTimestampNotInPast(timestamp) {
    if (Date.now() > Date.parse(timestamp)) {
        throw message_1.Message.date_in_the_past(timestamp);
    }
    ;
}
;
function checkBoolean(value) {
    if (typeof value !== 'boolean') {
        throw 'incorrect type for completed';
    }
}
function checkBeforeCreate(text, timestamp, title) {
    checkText(text);
    checkText(title);
    checkTimestamp(timestamp);
    checkTimestampNotInPast(timestamp);
}
exports.checkBeforeCreate = checkBeforeCreate;
;
function checkID(id_param) {
    const id = Number(id_param);
    if (Number.isNaN(id) || id < 1) {
        throw 'incorrect reminder id';
    }
    ;
}
exports.checkID = checkID;
;
function checkBeforeUpdate(text, timestamp, completed, id) {
    checkText(text);
    checkText(process_1.title);
    checkTimestamp(timestamp);
    checkID(id);
    checkBoolean(completed);
}
exports.checkBeforeUpdate = checkBeforeUpdate;
;
