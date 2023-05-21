import { constants } from "./constants";

export class Message {
    static not_defined(propertyName: string) {
        throw constants.NOT_DEFINED.replace('%', propertyName);
    };

    static not_empty(propertyName: string) {
        throw constants.NOT_EMPTY.replace('%', propertyName);
    };

    static date_in_the_past(timestamp: string) {
        throw constants.DATE_IN_THE_PAST.replace('%', timestamp);
    }
};