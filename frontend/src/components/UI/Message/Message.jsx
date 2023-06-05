import React, { useState } from "react";
import cl from './Message.module.css';

export const Message = (props) => {

    const [classes, setClasses] = useState([cl.message_hidden])

    setTimeout(() => {
        setClasses([cl.message_hidden, cl.message])
    }, 500)

    return (
        <div className={classes.join(' ')} >
            {props.children}
        </div>
    )
}