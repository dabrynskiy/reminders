import React from "react";
import { InputSearch } from "./UI/InputSearch/InputSearch";
import { ButtonAdd } from "./UI/ButtonAdd/ButtonAdd";

export const Header = (props) => {
    return (
        <header className="header">
            <h1>
                Reminders
            </h1>
            <InputSearch />
            <ButtonAdd handler={props.setPopup} />
        </header>
    )
}