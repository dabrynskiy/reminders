import React from "react";
import { ButtonOtions } from "./UI/ButtonOptions/ButtonOptions";

export const ReminderItem = (props) => {
    return (
        <li
            className="remindersItem"
        >
            <div
                className="reminderItemHeader"
            >
                <h2>Lorem, ipsum dolor.</h2>
                <ButtonOtions />
            </div>
            <div
                className="reminderItemContent"
            >
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, assumenda!</span>
            </div>
            <div
                className="additionalInfo"
            >
                <span>31.12.2023 23:59:59</span>
                <div>
                    <input
                        type="checkbox"
                        name="done"
                        id="done"
                    />
                    <label htmlFor="done">Done</label>
                </div>
            </div>
        </li>
    )
}