import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { FiltersList } from './components/FiltersList';
import { Reminders } from './components/Reminders';

function App() {

  const [reminders, setReminders] = useState([]);

  const createReminder = () => {
    const counter = reminders.length ? reminders[reminders.length - 1] + 60 : 10;
    setReminders([...reminders, counter])
  }

  return (
    <>
    <div className="external-wrapper">
      <div class="internal-wrapper">
        <Header createReminder={createReminder}/>
        <div
          className='nav-and-main'
        >
          <nav>
            <FiltersList />
          </nav>
          <main>
            <Reminders reminders={reminders} />
          </main>
        </div>
      </div>
    </div>
    <div className='popup-wrapper'>
      <div className='popup'>
      </div>
    </div>
    </>
  );
}

export default App;
