import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [reminders, setReminders] = useState({});

  useEffect(() => {
    fetch('/api/reminders')
      .then(response => response.json())
      .then(response => setReminders(response.reminders[0]))
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {`${reminders.id}: ${reminders.text} ${reminders.datetime}`}
        </p>
      </header>
    </div>
  );
}

export default App;
