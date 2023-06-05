import React from "react";
import { ButtonOtions } from "./UI/ButtonOptions/ButtonOptions";

export const ReminderItem = ({reminder}, ...props) => {
    return (
        <li
            className="remindersItem"
        >
            <div
                className="reminderItemHeader"
            >
                <h2>{reminder.title}</h2>
                <ButtonOtions />
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
                    />
                    <label htmlFor="done">Done</label>
                </div>
            </div>
        </li>
    )
}