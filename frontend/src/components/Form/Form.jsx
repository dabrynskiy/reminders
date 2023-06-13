import React from "react";
import { useForm } from 'react-hook-form';
import cl from './Form.module.css';

export const Form = (props) => {
    // пикеры для даты и времени
    // вывод ошибки если валидация не успешна
    const {register, handleSubmit} = useForm();

    const onSubmit = (formData) => {
        // 1. провалидировать форму
        // 2. подготовить данные для бэка
        const reminder = {...formData};

        const timestamp = new Date(`${reminder.date}T${reminder.time}`);

        Object.defineProperty(reminder, 'timestamp', {value: timestamp.toISOString(), enumerable: true});

        delete reminder.date
        delete reminder.time

        //console.log(reminder);
        /*
        3. добавить новую карточку
        4. отправить данные на бэк и потом обновить карточку либо удалить ее
        5. закрыть попап
        6. Очистить форму
        */
        //const index = props.addReminder(reminder);

        fetch('/api/reminders/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reminder)
        })
            .then(response => response.json())
            .then(response => {
                if(response.result === 'success') {
                    //props.changeReminder(index, response.reminder);
                    props.addReminder(response.reminder);
                }
            })
            .catch(error => console.log(error.message))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <input
                type="text"
                placeholder="Enter title"
                required
                className={cl.formControl}
                maxLength="10"
                {...register("title")}
            />
            <textarea
                cols="58"
                rows="10"
                placeholder="Enter description"
                required
                className={cl.formControl}
                {...register("text")}
            />
            <input
                type="date"
                required
                className={cl.formControl}
                {...register("date")}
            />
            <input
                type="time"
                required
                className={cl.formControl}
                {...register("time")}
            />
            <button
                className={`${cl.formControl} ${cl.formButton}`}
                type="submit"
            >
                Tamam
            </button>
        </form>
    )
};