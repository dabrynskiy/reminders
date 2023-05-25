import React from "react";
import { ButtonOtions } from "./UI/ButtonOptions/ButtonOptions";

export const ReminderItem = (props) => {
    return (
        <li
            className="remindersItem"
            style={{top: props.reminder, left: props.reminder, zIndex: props.reminder}}
            data-index={props.index}
        >
            <div
                className="reminderItemHeader"
            >
                <div className="absolute">
                    <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="80.000000pt"
                        height="64.000000pt"
                        viewBox="0 0 1280.000000 640.000000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g
                            transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
                            fill="#5fd1a5"
                            stroke="none"
                        >
                            <path
                                d="M8140 4959 c-89 -10 -224 -48 -305 -84 -138 -61 -290 -186 -375 -310
                                -51 -75 -107 -204 -126 -292 l-17 -81 -46 -13 c-347 -97 -636 -355 -761 -680
                                -191 -497 -17 -1074 430 -1432 41 -33 74 -65 72 -71 -2 -6 -64 -153 -139 -326
                                -74 -173 -138 -322 -140 -330 -3 -8 116 108 264 258 l268 273 92 -30 c321
                                -106 653 -89 939 48 128 61 207 115 301 204 96 91 161 179 222 297 82 160 117
                                290 127 473 5 95 -12 284 -30 328 -5 11 9 26 51 54 82 54 200 177 255 265 94
                                151 134 306 125 489 -11 232 -100 437 -267 615 -235 250 -606 387 -940 345z"/>
                        </g>
                    </svg>
                </div>
                <h2>Lorem, ipsum dolor.</h2>
                <ButtonOtions />
            </div>
            <div
                className="reminderItemContent"
            ><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, assumenda!</span>
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