import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Reminders } from './components/Reminders';
import { Popup } from './components/UI/Popup/Popup';
import { Form } from './components/Form/Form';

function App() {
  const ref = useRef();
  const [reminders, setReminders] = useState([]);

  const [hasNext, setHasNext] = useState(true);

  const limit = 5; //!!!!!!!!!!!!!!!
  
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [loadingError, setLoadingError] = useState({hasError: false, error: ''});

  const [popup, setPopup] = useState(false);

  function addReminder(reminder) {
    const index = reminders.length + 1;
    setReminders([...reminders, reminder]);
    setPopup(false);
    return index;
  }

  function changeReminder(index, newData) {
    console.log(`Index = ${index}`);
    console.log(`reminders = ${reminders}`)
    const newReminderList = [...reminders];

    newReminderList[index] = newData;

    setReminders(newReminderList);
  }
  
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries, observer) => {
      if(entries[0].isIntersecting && hasNext) {

        setIsLoading(true);

        setTimeout(async () => { // for view loader :-)
          try {
            //if(page === 2) {limit = 1000} // for error
            const response = await fetch(`/api/reminders/?limit=${limit}&page=${page}`);
            const JSONresponse = await response.json();

            if(JSONresponse.result === 'failure') {
              throw new Error(`Ошибка при загрузке данных: ${JSONresponse.error}` );
            };

            setReminders([
              ...reminders,
              ...JSONresponse.reminders
            ]);

            if(JSONresponse.hasNext) {
              setPage(page + 1);
            };

            setHasNext(JSONresponse.hasNext);

            observer.disconnect();

          } catch (error) {
            setIsLoading(false);

            setTimeout(() => {
              setLoadingError({
                hasError: true,
                error: error.message
              });
            });
          };

          setIsLoading(false);

        }, 2000) // for view loader :-)

      };
      
    });

      observer.observe(ref.current);
  }, [page])

  return (
    <>
    <div className="external-wrapper">
      <div className="internal-wrapper">
        <Header setPopup={setPopup} />
        <div className='nav-and-main'>
          <Navigation />
          <Reminders
            setReminders={setReminders}
            reminders={reminders}
            ref={ref} 
            isLoading={isLoading}
            loadingError={loadingError}
          />
        </div>
      </div>
    </div>
    <Popup
      openPopup={popup}
      setPopup={setPopup}
    >
      <Form
        addReminder={addReminder}
        changeReminder={changeReminder}
      />
    </Popup>
    </>
  );
};

export default App;