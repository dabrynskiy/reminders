import React, { useState } from "react";

export const Navigation = () => {

    const [filters] = useState(['today', 'tomorrow', 'overtime', 'all'])

    return (
        <nav>
            <ul
                className="filters"
            >
                {
                    filters.map((value, index) => {
                        return (
                            <li key={index} >
                                <label
                                    htmlFor={value}
                                    className="filterItem"
                                >
                                    {value}
                                </label>
                                <input
                                    type="radio"
                                    name="filter"
                                    id={value}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}