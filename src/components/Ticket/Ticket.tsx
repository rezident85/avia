import React from "react";
import cn from "classnames"
import s from "./Ticket.module.scss";
import { TicketType } from "../../App";

type Props = {
    ticket: TicketType,
}

const Ticket = ({ticket}: Props) => {

    const originDate = new Date(ticket.segments[0].date);

    const formatDate = (date: any) => {

        let hh = date.getHours();
        if (hh < 10) hh = '0' + hh;
      
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        return hh + ':' + mm;
    };

    return (
        <div className={s.ticket}>
            <div className={s.row}>
                <div className={s.price}>
                    {ticket.price}
                </div>
            </div>
            
            <div className={s.row}>
                <div>
                    {ticket.segments[0].origin} - {ticket.segments[0].destination}
                    <br /> 
                    {formatDate(originDate)} 
                    

                </div>
                
            </div>
            <div>время - {ticket.segments[0].duration + ticket.segments[1].duration}</div>
            <div>
                Пересадки Туда- {ticket.segments[0].stops.toString()}
                <br/>
                Пересадки Обратно - {ticket.segments[1].stops.toString()}
            </div>
                <br/>
                <br/>
        </div>
    );
};

export default Ticket;