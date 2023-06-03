import React from "react";
import cl from './Loader.module.css';

export const Loader = () => {
    return (
        <p class={cl.loading_text} >
            <span class={cl.letter} >L</span>
            <span class={cl.letter} >o</span>
            <span class={cl.letter} >a</span>
            <span class={cl.letter} >d</span>
            <span class={cl.letter} >i</span>
            <span class={cl.letter} >n</span>
            <span class={cl.letter} >g</span>
            <span class={cl.letter} >.</span>
            <span class={cl.letter} >.</span>
            <span class={cl.letter} >.</span>
        </p>
    )
}