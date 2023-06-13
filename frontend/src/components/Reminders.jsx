import React, { forwardRef, useEffect, useRef } from "react";
import { ReminderItem } from "./RemindersItem";
import { Loader } from "./UI/Loader/Loader";
import { Message } from "./UI/Message/Message";

export const Reminders = forwardRef((props, ref) => {

    function delReminder(id) {
        props.setReminders(props.reminders.filter(value => value.id !== id))
    }

    console.log(`пропсы из reminders: ${JSON.stringify(props)}`)

    return (
        <main>
            <ul className="reminders" >
                {
                    props.reminders.map(reminder =>
                        <ReminderItem
                            reminder={reminder}
                            key={reminder.id}
                            delReminder={delReminder}
                        />
                    )
                }
                {
                    props.isLoading &&
                    <li>
                        <Loader />
                    </li>
                }
                {
                    !props.isLoading && props.loadingError.hasError && <Message>{props.loadingError.error}</Message>
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