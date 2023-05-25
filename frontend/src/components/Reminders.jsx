import React from "react";
import { ReminderItem } from "./RemindersItem";

export const Reminders = (props) => {
    return (
        <ul
            className="reminders"
        >
            {
                props.reminders.map(reminder => {
                    return (
                        <ReminderItem reminder={reminder} />
                    )
                })
            }
        </ul>
    )
}