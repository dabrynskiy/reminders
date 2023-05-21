"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const constants_1 = require("./constants");
class Message {
    static not_defined(propertyName) {
        throw constants_1.constants.NOT_DEFINED.replace('%', propertyName);
    }
    ;
    static not_empty(propertyName) {
        throw constants_1.constants.NOT_EMPTY.replace('%', propertyName);
    }
    ;
    static date_in_the_past(timestamp) {
        throw constants_1.constants.DATE_IN_THE_PAST.replace('%', timestamp);
    }
}
exports.Message = Message;
;
