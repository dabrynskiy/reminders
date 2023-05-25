import React from "react";
import cl from './InputSearch.module.css';

export const InputSearch = () => {
    return (
        <input 
            type="search"
            placeholder="Find reminders"
            className={cl.searchInput}
        />
    )
};