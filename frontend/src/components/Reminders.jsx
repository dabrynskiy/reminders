import React, { forwardRef, useEffect, useRef } from "react";
import { ReminderItem } from "./RemindersItem";
import { Loader } from "./UI/Loader/Loader";
import { Message } from "./UI/Message/Message";

export const Reminders = forwardRef((props, ref) => {

    return (
        <main>
            <ul className="reminders" >
                {
                    props.reminders.map(reminder =>
                        <ReminderItem reminder={reminder} key={reminder.id} />
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