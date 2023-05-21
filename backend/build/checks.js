"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBeforeCreate = void 0;
const message_1 = require("./messages/message");
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
}
function checkBeforeCreate(text, timestamp) {
    checkText(text);
    checkTimestamp(timestamp);
}
exports.checkBeforeCreate = checkBeforeCreate;
