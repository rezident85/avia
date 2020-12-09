import React from "react";
import s from "./Ticket.module.scss";
import { TicketType } from "../../App";

type Props = {
    ticket: TicketType,
}

const Ticket = ({ ticket }: Props) => {

    const originDate = new Date(ticket.segments[0].date);
    const destinationDate = new Date(ticket.segments[1].date);

    const formatDate = (date: any) => {

        let hh = date.getHours();
        if (hh < 10) hh = '0' + hh;

        let mm = date.getMinutes();
        if (mm < 10) mm = '0' + mm;

        return hh + ':' + mm;
    };

    const formatDuration = (duration: number) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration - hours * 60;
        return `${hours}ч ${minutes}м`
    }

    const getArrivalTime = (date: Date, minutes: number) => {
        const arrivalTime = new Date(date);
        arrivalTime.setTime(date.getTime() + (minutes * 60 * 1000));
        return arrivalTime;
    }

    return (
        <div className={s.ticket}>
            <div className={s.row}>
                <div className={s.price}>
                    {(ticket.price).toLocaleString()} Р
                </div>
                <img className={s.image} src={`//pics.avs.io/99/36/{${ticket.carrier}}.png`} alt="company-logo" />
            </div>

            <div className={s.row}>
                <div className={s.col}>
                    <div className={s.subTitle}>MOW – HKT</div>
                    {formatDate(originDate)} - {formatDate(getArrivalTime(originDate, ticket.segments[0].duration))}
                </div>
                <div className={s.col}>
                    <div className={s.subTitle}>В пути</div>
                    {formatDuration(ticket.segments[0].duration)}
                </div>
                <div className={s.col}>
                    <div className={s.subTitle}>
                        {(ticket.segments[0].stops.length === 0 &&
                            'Без пересадок')
                            || (ticket.segments[0].stops.length === 1 &&
                                '1 пересадка')
                            || (ticket.segments[0].stops.length === 2 &&
                                '2 пересадки')
                            || (ticket.segments[0].stops.length === 3 &&
                                '3 пересадки')
                        }
                    </div>
                    {ticket.segments[0].stops.toString()}
                </div>
            </div>
            <div className={s.row}>
                <div className={s.col}>
                    <div className={s.subTitle}>MOW – HKT</div>
                    {formatDate(destinationDate)} - {formatDate(getArrivalTime(destinationDate, ticket.segments[1].duration))}
                </div>
                <div className={s.col}>
                    <div className={s.subTitle}>В пути</div>
                    {formatDuration(ticket.segments[1].duration)}
                </div>
                <div className={s.col}>
                    <div className={s.subTitle}>
                        {(ticket.segments[1].stops.length === 0 &&
                            'Без пересадок')
                            || (ticket.segments[1].stops.length === 1 &&
                                '1 пересадка')
                            || (ticket.segments[1].stops.length === 2 &&
                                '2 пересадки')
                            || (ticket.segments[1].stops.length === 3 &&
                                '3 пересадки')
                        }
                    </div>
                    {ticket.segments[1].stops.toString()}
                </div>
            </div>
        </div>
    );
};

export default Ticket;