import React, { useState } from "react";

export const FiltersList = () => {

    const [filters] = useState(['today', 'tomorrow', 'overtime', 'all'])

    return (
        <ul
            className="filters"
        >
            {
                filters.map(value => {
                    return (
                        <li>
                            <label
                                for={value}
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
    )
}