import React from "react";
import cl from './ButtonAdd.module.css';

export const ButtonAdd = (props) => {
    return (
        <button
            className={cl.buttonAdd}
            onClick={(event) => props.handler(true)}
        >
            <svg
                height="35px"
                width="35px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 125.167 125.167"
            >
            <g>
                <path
                    fill="#b3bcc5"
                    d="M0.003,0v125.167h81.686l43.475-43.469V0.012H0.003V0z M67.303,87.2h-9.44V67.306H37.97v-9.446
                    h19.894V37.967h9.44v19.894h19.894v9.446H67.303V87.2z M80.484,122.255V80.487h41.768L80.484,122.255z"
                />
            </g>
            </svg>
        </button>
    )
}