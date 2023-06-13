import React from "react";
import { ButtonOtions } from "./UI/ButtonOptions/ButtonOptions";

export const ReminderItem = ({reminder, delReminder}, ...props) => {
    //console.log(`пропсы из позиции: ${JSON.stringify(props)}`)
    const deleteReminder = async () => {
        const response = await fetch(
            `api/reminders/${reminder.id}`,
            {method: 'DELETE'}
        );

        const JSONresponse = await response.json();

        if(JSONresponse.result === 'success') {
            console.log(props)
            delReminder(reminder.id);
        }
    }

    return (
        <li
            className="remindersItem"
        >
            <div
                className="reminderItemHeader"
            >
                <h2>{reminder.title}</h2>
                <ButtonOtions handleClick={deleteReminder} />
            </div>
            <div
                className="reminderItemContent"
            >
                <span>{reminder.text}</span>
            </div>
            <div
                className="additionalInfo"
            >
                <span>{new Date(reminder.timestamp).toLocaleString()}</span>
                <div>
                    <input
                        type="checkbox"
                        name="done"
                        id="done"
                        checked={reminder.completed}
                        readOnly
                    />
                    <label htmlFor="done">Done</label>
                </div>
            </div>
        </li>
    )
}