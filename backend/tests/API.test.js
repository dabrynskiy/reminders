const CORRECT_DATE = '2054-12-31T21:00:00.000Z';
const axios = require('axios').default;
const API_REMINDERS = 'http://localhost:3001/api/reminders/';

describe('Тест API общие проверки', () => {

    // для https проверить что не работает по http

    it('должен приводить к ошибке вызов по неполному пути', () => {
        const routes = ['http://localhost:3001/', 'http://localhost:3001/api']
        let result;

        routes.forEach(route => {
            result = axios.options(route)
                .then(response => expect(1).toBe(2))
                .catch(error => expect(error.message).toMatch(/failed with status code 404/));
        })
        return result;
    })

    it('должны быть реализованы только определенные методы', () => {
        return axios.options(API_REMINDERS)
            .then(response => expect(response.data).toBe('POST,GET,HEAD'))
            .catch(error => expect(1).toBe(2));
    });
});

describe('проверки API /api/reminders method POST', () => {

    it('должно приводить к ошибке с некорректным body', () => {
        const bodies = [
            {},
            {timestamp: CORRECT_DATE},
            {text: "", timestamp: CORRECT_DATE},
            {text: {}, timestamp: CORRECT_DATE},
            {text: [], timestamp: CORRECT_DATE},
            {text: null, timestamp: CORRECT_DATE},
            {text: undefined, timestamp: CORRECT_DATE},
            {text: 11, timestamp: CORRECT_DATE},
            {text: 11n, timestamp: CORRECT_DATE},
            {text: true, timestamp: CORRECT_DATE},
            {text: "test"},
            {text: "test", timestamp: ""},
            {text: "test", timestamp: {}},
            {text: "test", timestamp: []},
            {text: "test", timestamp: null},
            {text: "test", timestamp: undefined},
            {text: "test", timestamp: 0},
            {text: "test", timestamp: 11n},
            {text: "test", timestamp: false},
            {text: "test", timestamp: "2024-12-31"},
            {text: "test", timestamp: "2024-12-31T21:00:00.000"}
        ];

        let result;

        bodies.forEach(body => {
            result = axios.post(API_REMINDERS, {})
                .then(response => expect(1).toBe(2))
                .catch(error => expect(error.message).toMatch(/failed with status code 500/));
        });

        return result;
    });
    // TODO запомнить id созданного напоминания чтобы использовать его в дальнейших тестах
    // в том числе удалить данные созданные в результате теста
    it('должно создавать корректное напоминание', () => {
        const body = {text: "test", timestamp: CORRECT_DATE}

        return axios.post(API_REMINDERS, body)
            .then(response => {
                expect(response.data.result).toBe('success');

                expect(typeof response.data.reminder.id).toBe('number');

                expect(response.data.reminder.text).toBe('test');

                expect(response.data.reminder.datetime).toBe(CORRECT_DATE);

                expect(response.data.reminder.person_id).toBe(1);

                expect(response.data.reminder.completed).toBe(false);

            })
            .catch(error => expect(1).toBe(2));
    });
});