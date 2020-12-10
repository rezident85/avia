import React, { useState, useEffect } from 'react';
import s from './App.module.scss';
import logo from './logo.svg';
import cn from "classnames"
import SortTabs from './components/SortTabs/SortTabs';
import Filters from './components/Filters/Filters';
import Ticket from './components/Ticket/Ticket';

const fetchTickets = async () => {
  let finalTickets;
  const searchIdResponse = await fetch("https://front-test.beta.aviasales.ru/search");
  const searchId = (await searchIdResponse.json())['searchId'];

  while (true) {
    const ticketResponse = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    if (ticketResponse.ok) {
      const tickets = await ticketResponse.json();
      if (tickets.stop) {
        finalTickets = tickets
        break;
      }
    }
  }
  return finalTickets;
}

const filterTickets = (filters: FiltersType, tickets: TicketType[]): TicketType[] => {
  let filteredTickets: TicketType[] = tickets;
  if (!filters.includes('all')) {
    filteredTickets = tickets.filter(ticket => {
      return filters.includes(ticket.segments[0].stops.length) && filters.includes(ticket.segments[1].stops.length);
    })
  } else {
    filteredTickets = tickets;
  }
  return filteredTickets;
};

const sortTickets = (currentSort: 'fast' | 'cheap', tickets: TicketType[]): TicketType[] => {
  let sortedTickets: TicketType[] = tickets;
  if (currentSort === "cheap") {
    sortedTickets = [...sortedTickets].sort((a, b) => {
      return a.price - b.price;
    })
  } else {
    sortedTickets = [...sortedTickets].sort((a, b) => {
      return (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration)
    })
  };
  return sortedTickets;
}


function App() {

  const [ticketsResponse, setTicketsResponse] = useState<{
    tickets: TicketType[];
    stop: boolean;
  }>({ tickets: [], stop: false });

  useEffect(() => {
    fetchTickets().then(tickets => {
      setTicketsResponse(tickets);
    })
  }, [])

  const isLoaded: boolean = ticketsResponse.stop;

  const [tickets, setTickets] = useState<TicketType[]>(ticketsResponse.tickets);
  const [filters, setFilters] = useState<FiltersType>(['all']);
  const [currentSort, setSort] = useState<'fast' | 'cheap'>('cheap');

  useEffect(() => {
    const filteredSortedTickets: TicketType[] = filterTickets(filters, sortTickets(currentSort, ticketsResponse.tickets));

    setTickets(filteredSortedTickets);
  }, [currentSort, filters, ticketsResponse])


  return (
    <div className={s.App}>
      <div className={cn({
        [s.row]: true,
        [s.disabled]: !isLoaded,
      })}>
        <Filters handleChange={(filters) => setFilters(filters)} filters={filters} />
        <div className={s.col}>
          <SortTabs handleChange={(sort) => setSort(sort)} currentSort={currentSort} />
          {!isLoaded 
            ? <img src={logo} className={s.Applogo} alt="logo" />
            : (tickets.map((ticket, index) =>
                <Ticket ticket={ticket} key={index} />
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
