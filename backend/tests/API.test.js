const { describe } = require('node:test');

const CORRECT_DATE = '2054-12-31T21:00:00.000Z';
const axios = require('axios').default;
const API_REMINDERS = 'http://localhost:3001/api/reminders/';
let id;

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

    it('должно создавать корректное напоминание', () => {
        const body = {text: "test", timestamp: CORRECT_DATE, title: 'title test'}

        return axios.post(API_REMINDERS, body)
            .then(response => {
                expect(response.data.result).toBe('success');

                expect(typeof response.data.reminder.id).toBe('number');

                expect(response.data.reminder.text).toBe('test');

                expect(response.data.reminder.timestamp).toBe(CORRECT_DATE);

                expect(response.data.reminder.person_id).toBe(1);

                expect(response.data.reminder.completed).toBe(false);

                expect(response.data.reminder.title).toBe('title test');

                id = response.data.reminder.id;
            })
            .catch(error => expect(1).toBe(2));
    });
});

describe('Проверки API /api/reminders method GET', () => {
    it('должна возвращать ошибку при вызове без параметров/ c некорректными параметрами', () => {
        const incorrectLimit = ['', 'test', [], {}, undefined, null, -15, -15n, NaN, true, 101];
        const incorrectPage = ['', 'test', [], {}, undefined, null, -15, -15n, NaN, true];

        let result = axios.get(API_REMINDERS)
                .then(response => expect(1).toBe(2))
                .catch(error => expect(error.message).toMatch(/failed with status code 500/));

        incorrectLimit.forEach(value => {
            const path = API_REMINDERS + `?limit=${value}}&page=1`;
            axios.get(path)
                .then(response => expect(1).toBe(2))
                .catch(error => expect(error.message).toMatch(/failed with status code 500/));
        });

        incorrectPage.forEach(value => {
            axios.get(API_REMINDERS + `?limit=1&page=${value}`)
                .then(response => expect(1).toBe(2))
                .catch(error => expect(error.message).toMatch(/failed with status code 500/));
        });

        return result;
    });

    it('должна возвращать указанное в параметре limit количество', async () => {
        const limits = [1, 2];

        limits.forEach(value => {
            axios.get(API_REMINDERS + `?limit=${value}&page=1`)
                .then(response => {
                    expect(response.data.result).toBe("success");

                    expect(response.data.reminders.length).toBe(value);
                })
                .catch(error => expect(1).toBe(2));
        });
    });
});

describe('Проверки API /api/reminders/:id method GET', () => {
    it('должна возвращать ошибку при некорректном параметре', () => {
        const params = ['test', 0, true, false, NaN, undefined, [], {}, null];

        params.forEach(value => {
            axios.get(`${API_REMINDERS}${value}`)
                .then(response => expect(1).toBe(2))
                .catch(error => expect(error.message).toMatch(/failed with status code 500/));
        });
    });

    it('должна возвращать данные при корректном параметре', () => {
        axios.get(`${API_REMINDERS}${id}`)
            .then(response => {
                expect(response.data.result).toBe('success');
                expect(response.data.reminder.id).toBe(id);
                expect(response.data.reminder.text).toBe('test');
                expect(response.data.reminder.timestamp).toBe(CORRECT_DATE);
                expect(response.data.reminder.person_id).not.toBe(undefined);
                expect(response.data.reminder.completed).toBe(false);
            })
            .catch(error => expect(1).toBe(2));
    });

    it('должна возвращать ошибку при несуществующем параметре', () => {
        axios.get(`${API_REMINDERS}${100000}`)
            .then(response => expect(1).toBe(2))
            .catch(error => expect(error.message).toMatch(/failed with status code 500/))
    });
});

describe('Проверки API /api/reminders/:id method PUT', () => {
    // TODO проверки неполные, дописать
    it('должна успешно обновлять', () => {
        const reminder = {
            text: 'updated text',
            timestamp: CORRECT_DATE,
            completed: false
        };

        axios.put(`${API_REMINDERS}${id}`, reminder)
            .then(response => expect(response.data.reminder.text).toBe(reminder.text))
            .catch(error => expect(1).toBe(2));
    });
});

describe('Проверки API /api/reminders/:id method DELETE', () => {
    // TODO проверки неполные, дописать
    it('должна успешно удалять', () => {

        axios.delete(`${API_REMINDERS}${id}`)
            .then(response => expect(response.data.result).toBe("success"))
            .catch(error => expect(1).toBe(2));
    });
});