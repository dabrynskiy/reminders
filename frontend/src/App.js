import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Reminders } from './components/Reminders';

function App() {
  const ref = useRef();
  const [reminders, setReminders] = useState([]);

  const [hasNext, setHasNext] = useState(true);

  const limit = 5;
  
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [loadingError, setLoadingError] = useState({hasError: false, error: ''});
  
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries, observer) => {
      if(entries[0].isIntersecting && hasNext) {

        setIsLoading(true);

        setTimeout(async () => { // for view loader :-)
          try {
            const response = await fetch(`/api/reminders/?l11imit=${limit}&page=${page}`);
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

            console.log(error.message); // TODO вывести ошибку!!!
            setLoadingError({
              hasError: true,
              error: error.message
            })
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
        <Header />
        <div className='nav-and-main'>
          <Navigation />
          <Reminders
            reminders={reminders}
            ref={ref} 
            isLoading={isLoading}
            loadingError={loadingError}
          />
        </div>
      </div>
    </div>
    <div className='popup-wrapper'>
      <div className='popup'>
      </div>
    </div>
    </>
  );
};

export default App;