import React, { forwardRef, useEffect, useRef } from "react";
import { ReminderItem } from "./RemindersItem";

export const Reminders = forwardRef((props, ref) => {

    return (
        <main>
            <ul className="reminders" >
                {
                    props.reminders.map(reminder =>
                        <ReminderItem reminder={reminder} key={reminder.id} />
                    )
                }
            </ul>
            <div
                style={{height: '10px'}}
                ref={ref}
            >
            </div>
        </main>
    )
})