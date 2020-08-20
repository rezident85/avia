import React, { useState, useEffect }  from 'react';
import './App.scss';

function App() {
  const [ticketss, setTickets] = useState({tickets: [], stop: false});

  async function fetchSearchId() {
    const searchIdResponse = await fetch("https://front-test.beta.aviasales.ru/search");
    return (await searchIdResponse.json())['searchId'];
  }


  async function fetchTickets(searchId: string) {
    const ticketsResponse = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
    const tickets = await ticketsResponse.json();
    setTickets(tickets)
    console.log(ticketss)
  }

  useEffect(() => {
    fetchSearchId().then(searchId => {
      fetchTickets(searchId);
    })
  }, [])


  return (
    <div className="App">
      {ticketss.stop}
    </div>
  );
}

export default App;
