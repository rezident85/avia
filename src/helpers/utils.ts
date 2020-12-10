export const formatDate = (date: any) => {

    let hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    let mm = date.getMinutes();
    if (mm < 10) mm = '0' + mm;

    return hh + ':' + mm;
};


export const getArrivalTime = (date: Date, minutes: number) => {
    const arrivalTime = new Date(date);
    arrivalTime.setTime(date.getTime() + (minutes * 60 * 1000));
    return arrivalTime;
}


export const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    return `${hours}ч ${minutes}м`;
}