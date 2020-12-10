import React from "react";
import s from "./Ticket.module.scss";
import { STOPS_TEXT } from "../../helpers/constants";
import { formatDate, getArrivalTime, formatDuration } from "../../helpers/utils";

type Props = {
    ticket: TicketType,
}

const Ticket = ({ ticket }: Props) => (
    <div className={s.ticket}>
        <div className={s.row}>
            <div className={s.price}>
                {`${(ticket.price).toLocaleString('ru')} Р`}
            </div>
            <img className={s.image} src={`//pics.avs.io/99/36/{${ticket.carrier}}.png`} alt="company-logo" />
        </div>

        {ticket.segments.map((segment) =>
            <div className={s.row}>
                <div className={s.col}>
                    <div className={s.subTitle}>MOW – HKT</div>
                    {formatDate(new Date(ticket.segments[0].date))} - {formatDate(getArrivalTime(new Date(ticket.segments[0].date), segment.duration))}
                </div>
                <div className={s.col}>
                    <div className={s.subTitle}>В пути</div>
                    {formatDuration(segment.duration)}
                </div>
                <div className={s.col}>
                    <div className={s.subTitle}>
                        {STOPS_TEXT[segment.stops.length]}
                    </div>
                    {segment.stops.toString()}
                </div>
            </div>
        )}
    </div>
);

export default Ticket;