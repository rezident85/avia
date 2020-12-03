import React from "react";
import cn from "classnames";
import s from "./Filters.module.scss";
import {FiltersType} from "../../App"


const initFilters = [
    {label: 'Все', value: 'all'}, 
    {label: 'Без пересадок', value: 0}, 
    {label: '1 пересадка', value: 1}, 
    {label: '2 пересадки', value: 2},
    {label: '3 пересадки', value: 3}
];

export interface Props {
    filters: FiltersType;
    handleChange: (filters: FiltersType) => void;
}

const Filters = ({filters, handleChange}: Props) => {

    const changeFilters = (filter: (number | string)) => {
        let newFilters = filters;

        if (filters.includes(filter)) {
            newFilters = filters.filter(item => item !== filter);
        } else {
            if (filter === "all") {
                newFilters = ['all'];
            } else {
                newFilters = filters.filter(item => item !== 'all');
                newFilters.push(filter);
            }
        }

        if (!newFilters.length) {
            newFilters = ['all'];
        }

        handleChange(newFilters);
    }

    return (
        <div className={s.filters}>
           <h4>Количество пересадок</h4>
           {initFilters.map((filter, index) => 
                <div key={index}>
                    <label>
                        {filter.label}
                        <input type="checkbox" onChange={() => changeFilters(filter.value)} checked={filters.includes(filter.value)} />
                    </label>
                </div>
            )}
        </div>
    );
};

export default Filters;