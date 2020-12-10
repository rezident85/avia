export const INIT_FILTERS = [
    { label: 'Все', value: 'all' },
    { label: 'Без пересадок', value: 0 },
    { label: '1 пересадка', value: 1 },
    { label: '2 пересадки', value: 2 },
    { label: '3 пересадки', value: 3 }
];

export const STOPS_TEXT: {[key:number]: string} = {
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки',
}