/*
Таблица с данными пользователя (на будущее)
- id пользователя (ключ)
- имя пользователя
- фамилия пользователя
*/
create TABLE persons(
    id SERIAL PRIMARY KEY,
    username VARCHAR(10)
)
/*
Таблица с данными напоминания
- id напоминания
- текст напоминания
- признак завершено напоминание или нет
- дата и время напоминания
- id пользователя
*/
create TABLE reminders(
    id SERIAL PRIMARY KEY,
    text VARCHAR,
    datetime timestamp,
    person_id integer,
    FOREIGN KEY (person_id) REFERENCES person (id)
)

ALTER TABLE reminders
ADD COLUMN completed boolean;

ALTER TABLE reminders
ALTER COLUMN datetime TYPE timestamptz