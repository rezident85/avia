import React from "react";
import cn from "classnames";
import s from "./Filters.module.scss";
import { INIT_FILTERS } from "../../helpers/constants";

export interface Props {
    filters: FiltersType;
    handleChange: (filters: FiltersType) => void;
}

const changeFilters = (filters: FiltersType, filter: (number | string)) => {
    let newFilters = filters;

    if (filters.includes(filter)) {
        newFilters = filters.filter(item => item !== filter);
    } else {
        if (filter === 'all') {
            newFilters = ['all'];
        } else {
            newFilters = filters.filter(item => item !== 'all');
            newFilters.push(filter);
        }
    }

    if (!newFilters.length) {
        newFilters = ['all'];
    }

    return newFilters;
}

const Filters = ({ filters, handleChange }: Props) => (
    <div className={s.filters}>
        <h4 className={s.filtersTitle}>Количество пересадок</h4>
        {INIT_FILTERS.map((filter, index) =>
            <div key={index} className={cn({
                [s.filter]: true,
                [s.active]: filters.includes(filter.value),
            })
            }>
                <label className={cn({
                    [s.filterLabel]: true,
                    [s.active]: filters.includes(filter.value),
                })}>
                    {filter.label}
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z" fill="#2196F3" />
                    </svg>
                    <input type="checkbox"
                        className={s.filterInput}
                        onChange={() => handleChange(changeFilters(filters, filter.value))}
                        checked={filters.includes(filter.value)} />
                </label>
            </div>
        )}
    </div>
);

export default Filters;