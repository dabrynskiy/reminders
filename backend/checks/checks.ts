import { Message } from "../messages/message";

function checkText(text: any) {
    if(typeof text !== 'string') {
        throw Message.not_defined('text');
    };

    if(!text.length) {
        throw Message.not_empty('text');
    };
};

function checkTimestamp(timestamp: string) {
    const regExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

    if( !regExp.test(timestamp) ) {
        throw Message.not_defined('timestamp');
    };
};

function checkTimestampNotInPast(timestamp: string) {
    if( Date.now() > Date.parse(timestamp) ) {
        throw Message.date_in_the_past(timestamp);
    };
};

function checkBoolean(value: any) {
    if(typeof value !== 'boolean') {
        throw 'incorrect type for completed'
    }
}

export function checkBeforeCreate(text: any, timestamp: string) {
    checkText(text);
    checkTimestamp(timestamp);
    checkTimestampNotInPast(timestamp)
};

export function checkID(id_param: string) {
    const id = Number(id_param);
    if( Number.isNaN(id) || id < 1 ) {
        throw 'incorrect reminder id';
    };
};

export function checkBeforeUpdate(text: any, timestamp: string, completed: any, id: string, ) {
    checkText(text);
    checkTimestamp(timestamp);
    checkID(id);
    checkBoolean(completed);
};