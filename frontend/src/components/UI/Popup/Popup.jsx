import React, { useState } from "react";
import cl from './Popup.module.css'
import { ButtonCancel } from "../ButtonCancel/ButtonCancel";

export const Popup = (props) => {
    /*const [classes, setClasses] = useState([cl.popup_wrapper]);*/

    /*if(props.openPopup) {
        setClasses([cl.popup_wrapper, cl.flex])
    }*/

    const classes = [cl.popup_wrapper];

    if(props.openPopup) {
        classes.push(cl.flex)
    }

    return (
        <div
            className={classes.join(' ')}
            onClick={(event) => props.setPopup(false)}
        >
            <div
                className={cl.popup}
                onClick={(event) => event.stopPropagation()}
            >
                <ButtonCancel handler={props.setPopup} />
            </div>
        </div>
    )
};