import React from "react";
import cn from "classnames"
import s from "./SortTabs.module.scss";

export interface Props {
    currentSort: 'fast' | 'cheap';
    handleChange: (sort: 'fast' | 'cheap') => void;
}

const SortTabs = ({handleChange, currentSort}: Props) => {

    return (
        <div className={s.tabs}>
            <div className={cn({ [s.tab] : true,
                                [s.active] : currentSort === 'cheap', 
                                })}
                 onClick={() => handleChange('cheap')}
            >
                Самый дешевый
            </div>
            <div className={cn({ [s.tab] : true,
                                [s.active] : currentSort === 'fast', 
                                })}
                  onClick={() => handleChange('fast')}
            >
                Самый быстрый
            </div>
        </div>
    );
};

export default SortTabs;