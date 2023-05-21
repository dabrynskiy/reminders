const { checkBeforeCreate } = require('../build/checks/checks');

const CORRECT_DATE = '2054-12-31T21:00:00.000Z';

describe('Проверка работы функции checkBeforeCreate', () => {
    it('должна приводить к ошибке при вызове без параметров', () => {
        expect( () => checkBeforeCreate() ).toThrow();
    });

    it('не должна приводить к ошибке с корректными параметрами', () => {
        expect( () => checkBeforeCreate('test', CORRECT_DATE) ).not.toThrow();
    });

    it('должна приводить к ошибке если тип поля некорректный', () => {
        const incorrectValues = [true, 15, [], {}, null, undefined, 0];

        incorrectValues.forEach(value => {
            expect( () => checkBeforeCreate(value, CORRECT_DATE) ).toThrow();

            expect( () => checkBeforeCreate('test', value) ).toThrow();
        });
    });

    it('должна приводить к ошибке если поле текст пустое', () => {
        expect( () => checkBeforeCreate('', CORRECT_DATE) ).toThrow();
    });

    it('должна приводить к ошибке если формат даты некорректный', () => {
        const incorrectValues = ['', 'test' ,'2054-12-31T21:00:00.000', '2054', '2054-12-31', '2054-12-31T21:00:00'];

        incorrectValues.forEach(value => {
            expect( () => checkBeforeCreate('test', value) ).toThrow();
        });
    });

    it('должна приводить к ошибке если дата меньше текущей', () => {
        expect( () => checkBeforeCreate('test', '2021-12-31T21:00:00.000Z') ).toThrow();
    });
});