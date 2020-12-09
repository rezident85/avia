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
           <h4 className={s.filtersTitle}>Количество пересадок</h4>
           {initFilters.map((filter, index) => 
                <div key={index}  className={cn({ [s.filter] : true,
                                                    [s.active] : filters.includes(filter.value), 
                                                })
                                            }>
                    <label className={cn({ [s.filterLabel] : true,
                                            [s.active] : filters.includes(filter.value), 
                                        })}>
                        {filter.label}
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z" fill="#2196F3"/>
                        </svg>
                        <input type="checkbox"
                                className={s.filterInput}
                                onChange={() => changeFilters(filter.value)} 
                                checked={filters.includes(filter.value)} />
                    </label>
                </div>
            )}
        </div>
    );
};

export default Filters;