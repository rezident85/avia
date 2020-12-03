import React, { useState, useEffect }  from 'react';
import './App.scss';
import SortTabs from './components/SortTabs/SortTabs';
import Filters from './components/Filters/Filters';

 type Ticket = {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета туда
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    },
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета обратно
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    }
  ]
};

export type FiltersType = (number | string)[];

function App() {
  const [ticketsResponse, setTicketsResponse] = useState<{
    tickets: Ticket[];
    stop: boolean;
  }>({tickets: [], stop: false});

  async function fetchTickets() {
    const searchIdResponse = await fetch("https://front-test.beta.aviasales.ru/search");
    const searchId = (await searchIdResponse.json())['searchId'];
  
    while (true) {
      const ticketResponse = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
      if (ticketResponse.ok) {
        const tickets = await ticketResponse.json();
        if (tickets.stop) {
          setTicketsResponse(tickets);
          break;
        }
      }
    }
  }

  useEffect(() => {
      fetchTickets();
  }, [])

  const [tickets, setTickets] = useState<Ticket[]>(ticketsResponse.tickets);
  const [filters, setFilters] = useState<FiltersType>(['all']);
  const [currentSort, setSort] = useState<'fast' | 'cheap'>('cheap');

  useEffect(() => {
    let newTickets: Ticket[] = [];

    if (!filters.includes('all')) {
      newTickets = ticketsResponse.tickets.filter(ticket => {
        return filters.includes(ticket.segments[0].stops.length) && filters.includes(ticket.segments[1].stops.length);
      })
    } else {
      newTickets = ticketsResponse.tickets;
    }
    
    if (currentSort === "cheap") {
      newTickets = [...newTickets].sort((a, b) => {
        return a.price - b.price;
      })
    } else {
      newTickets = [...newTickets].sort((a, b) => {
        return (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration)
      })
    };

    setTickets(newTickets);
  }, [currentSort, filters, ticketsResponse])


  return (
    <div className="App">
      {ticketsResponse.stop &&
        <h3>
          <SortTabs handleChange={(sort) => setSort(sort)} currentSort={currentSort} />
          <Filters handleChange={(filters) => setFilters(filters)} filters={filters}/>
          {tickets.map((ticket, index) => 
            <div key={index}>
              <div>цена - {ticket.price}</div>
              <div>время - {ticket.segments[0].duration + ticket.segments[1].duration}</div>
              <div>
                Пересадки Туда- {ticket.segments[0].stops.toString()}
                <br/>
                Пересадки Обратно - {ticket.segments[1].stops.toString()}
              </div>
              <br/>
              <br/>
            </div>
          )}
        </h3>
      }
      {!ticketsResponse.stop &&
       <div>ЗАГРУЗКА....</div>
      }
    </div>
  );
}

export default App;
