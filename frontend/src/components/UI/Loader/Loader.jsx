import React from "react";
import cl from './Loader.module.css';

export const Loader = () => {
    return (
        <p className={cl.loading_text} >
            <span className={cl.letter} >L</span>
            <span className={cl.letter} >o</span>
            <span className={cl.letter} >a</span>
            <span className={cl.letter} >d</span>
            <span className={cl.letter} >i</span>
            <span className={cl.letter} >n</span>
            <span className={cl.letter} >g</span>
            <span className={cl.letter} >.</span>
            <span className={cl.letter} >.</span>
            <span className={cl.letter} >.</span>
        </p>
    )
}